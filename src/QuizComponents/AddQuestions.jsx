import { Form, FormItem, FormGroup, Button, Bar, Select, Option, TextArea, Label, CheckBox, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow, Toast, MessageStrip, Icon } from '@ui5/webcomponents-react';
import { useRef, useState } from 'react';
import { addDumpQuestion } from "../api/QuizApi";
import { useNavigate } from "react-router-dom";
import './AddQuestions.css';

function AddQuestions() {
    const newQuestionTemplate = {
        "category": "Fiori",
        "questionId": "",
        "questionType": "SingleSelect",
        "questionText": '',
        "correctAnswersCount": "1",
        "answerOptions": [
            { "answerIndex": "0", "answerText": '', "isCorrect": false, "selected": false },
            { "answerIndex": "1", "answerText": '', "isCorrect": false, "selected": false },
            { "answerIndex": "2", "answerText": '', "isCorrect": false, "selected": false },
            { "answerIndex": "3", "answerText": '', "isCorrect": false, "selected": false },
        ],
        selectedAnswer: ""
    };

    const [newQuestion, setNewQuestion] = useState(newQuestionTemplate);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    const showToast = (message, type = 'success') => {
        toast.current.innerHTML = message;
        toast.current.open = true;
    };

    const validateQuestion = () => {
        const newErrors = {};

        // Validate question text
        if (!newQuestion.questionText.trim()) {
            newErrors.questionText = 'Question text is required';
        } else if (newQuestion.questionText.trim().length < 10) {
            newErrors.questionText = 'Question text must be at least 10 characters';
        }

        // Validate answer options
        const filledAnswers = newQuestion.answerOptions.filter(opt => opt.answerText.trim());
        if (filledAnswers.length < 2) {
            newErrors.answerOptions = 'At least 2 answer options are required';
        }

        // Check if all filled answers have text
        newQuestion.answerOptions.forEach((opt, index) => {
            if (opt.answerText.trim() && opt.answerText.trim().length < 2) {
                newErrors[`answer_${index}`] = 'Answer must be at least 2 characters';
            }
        });

        // Validate correct answers
        const correctAnswers = newQuestion.answerOptions.filter(opt => opt.isCorrect);
        if (correctAnswers.length === 0) {
            newErrors.correctAnswers = 'At least one correct answer must be selected';
        }

        // Validate correct answers count matches
        if (newQuestion.questionType === 'MultiSelect') {
            const expectedCount = parseInt(newQuestion.correctAnswersCount);
            if (correctAnswers.length !== expectedCount) {
                newErrors.correctAnswers = `Please select exactly ${expectedCount} correct answer(s)`;
            }
        } else {
            if (correctAnswers.length !== 1) {
                newErrors.correctAnswers = 'Please select exactly one correct answer for single select';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveQuestion = async () => {
        if (!validateQuestion()) {
            showToast('⚠ Please fix the validation errors', 'error');
            return;
        }

        setIsSaving(true);
        try {
            const result = await addDumpQuestion(newQuestion);
            if (result.message === "Added Successfully") {
                showToast('✓ Question added successfully!');
                setNewQuestion(newQuestionTemplate);
                setErrors({});
                // Optional: Navigate back after a delay
                setTimeout(() => {
                    navigate('/managequestion');
                }, 1500);
            } else {
                showToast('✗ Failed to add question', 'error');
            }
        } catch (error) {
            showToast('✗ Error adding question', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const valueChange = (oEvent) => {
        const name = oEvent.currentTarget.name;
        const value = oEvent.currentTarget.value;
        setNewQuestion({ ...newQuestion, [name]: value });
        
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: undefined });
        }

        // Auto-adjust correct answers count for single select
        if (name === 'questionType' && value === 'SingleSelect') {
            setNewQuestion(prev => ({ ...prev, [name]: value, correctAnswersCount: "1" }));
        }
    };

    const valueChangeAnswers = (oEvent) => {
        const name = oEvent.currentTarget.name;
        let value = oEvent.currentTarget.value;
        if (oEvent.currentTarget.tagName === "UI5-CHECKBOX") {
            value = oEvent.currentTarget.checked;
        }

        const index = oEvent.currentTarget.dataset.rowindex;
        const newObj = JSON.parse(JSON.stringify(newQuestion));
        newObj.answerOptions[index][name] = value;
        setNewQuestion(newObj);

        // Clear related errors
        if (errors.answerOptions || errors[`answer_${index}`] || errors.correctAnswers) {
            setErrors({ 
                ...errors, 
                answerOptions: undefined, 
                [`answer_${index}`]: undefined,
                correctAnswers: undefined 
            });
        }
    };

    const addAnswerOption = () => {
        const newIndex = newQuestion.answerOptions.length.toString();
        const newObj = JSON.parse(JSON.stringify(newQuestion));
        newObj.answerOptions.push({
            "answerIndex": newIndex,
            "answerText": '',
            "isCorrect": false,
            "selected": false
        });
        setNewQuestion(newObj);
    };

    const removeAnswerOption = (index) => {
        if (newQuestion.answerOptions.length <= 2) {
            showToast('⚠ At least 2 answer options are required', 'warning');
            return;
        }
        const newObj = JSON.parse(JSON.stringify(newQuestion));
        newObj.answerOptions.splice(index, 1);
        // Re-index
        newObj.answerOptions.forEach((opt, idx) => {
            opt.answerIndex = idx.toString();
        });
        setNewQuestion(newObj);
    };

    const resetForm = () => {
        setNewQuestion(newQuestionTemplate);
        setErrors({});
    };

    const getCorrectAnswersCount = () => {
        return newQuestion.answerOptions.filter(opt => opt.isCorrect).length;
    };

    return (
        <div className="add-question-container">
            {/* Header */}
            <div className="add-question-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <Icon name="add-document" className="title-icon" />
                        Add New Question
                    </h1>
                    <p className="page-subtitle">
                        Create a new quiz question with multiple answer options
                    </p>
                </div>
            </div>

            {/* Validation Summary */}
            {Object.keys(errors).length > 0 && (
                <MessageStrip design="Warning" className="validation-summary">
                    <strong>Please fix the following errors:</strong>
                    <ul>
                        {Object.values(errors).filter(Boolean).map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </MessageStrip>
            )}

            {/* Form */}
            <div className="form-card">
                <Form
                    headerText="Question Details"
                    labelSpan="S12 M4 L3 XL3"
                    emptySpan='S0 M0 L1 XL1'
                    layout="S1 M1 L1 XL1"
                >
                    <FormGroup>
                        <FormItem labelContent={<Label required>Question Category</Label>}>
                            <Select name="category" value={newQuestion.category} onChange={valueChange}>
                                <Option>Fiori</Option>
                                <Option>SAP CAP</Option>
                                <Option>Build</Option>
                                <Option>JavaScript</Option>
                                <Option>React</Option>
                                <Option>General</Option>
                            </Select>
                        </FormItem>

                        <FormItem labelContent={<Label required>Question Type</Label>}>
                            <Select name="questionType" onChange={valueChange} value={newQuestion.questionType}>
                                <Option>SingleSelect</Option>
                                <Option>MultiSelect</Option>
                            </Select>
                        </FormItem>

                        {newQuestion.questionType === 'MultiSelect' && (
                            <FormItem labelContent={<Label required>Correct Answers Count</Label>}>
                                <Select name="correctAnswersCount" onChange={valueChange} value={newQuestion.correctAnswersCount}>
                                    <Option>1</Option>
                                    <Option>2</Option>
                                    <Option>3</Option>
                                    <Option>4</Option>
                                </Select>
                            </FormItem>
                        )}

                        <FormItem
                            className="formAlignLabelStart"
                            labelContent={<Label required>Question Text</Label>}
                        >
                            <TextArea
                                value={newQuestion.questionText}
                                name="questionText"
                                onChange={valueChange}
                                placeholder="Enter your question here (minimum 10 characters)..."
                                rows={4}
                                valueState={errors.questionText ? "Error" : "None"}
                                valueStateMessage={errors.questionText ? <span>{errors.questionText}</span> : null}
                            />
                        </FormItem>
                    </FormGroup>
                </Form>
            </div>

            {/* Answer Options */}
            <div className="answers-card">
                <div className="answers-header">
                    <h2 className="section-title">
                        Answer Options
                        <span className="correct-count">
                            ({getCorrectAnswersCount()} correct selected)
                        </span>
                    </h2>
                    <Button
                        icon="add"
                        design="Transparent"
                        onClick={addAnswerOption}
                        disabled={newQuestion.answerOptions.length >= 6}
                    >
                        Add Option
                    </Button>
                </div>

                {errors.answerOptions && (
                    <MessageStrip design="Error" className="error-strip">
                        {errors.answerOptions}
                    </MessageStrip>
                )}

                {errors.correctAnswers && (
                    <MessageStrip design="Error" className="error-strip">
                        {errors.correctAnswers}
                    </MessageStrip>
                )}

                <Table
                    className="answers-table"
                    headerRow={
                        <TableHeaderRow sticky>
                            <TableHeaderCell width="60px">
                                <span className="header-text">#</span>
                            </TableHeaderCell>
                            <TableHeaderCell minWidth="400px">
                                <span className="header-text">Answer Text</span>
                            </TableHeaderCell>
                            <TableHeaderCell width="150px">
                                <span className="header-text">Correct Answer</span>
                            </TableHeaderCell>
                            <TableHeaderCell width="100px">
                                <span className="header-text">Actions</span>
                            </TableHeaderCell>
                        </TableHeaderRow>
                    }
                >
                    {newQuestion.answerOptions.map((answerOption, index) => (
                        <TableRow key={answerOption.answerIndex} className="answer-row">
                            <TableCell>
                                <span className="row-number">{index + 1}</span>
                            </TableCell>
                            <TableCell>
                                <TextArea
                                    name="answerText"
                                    value={answerOption.answerText}
                                    data-rowindex={answerOption.answerIndex}
                                    rows={2}
                                    onChange={valueChangeAnswers}
                                    placeholder={`Enter answer option ${index + 1}...`}
                                    valueState={errors[`answer_${index}`] ? "Error" : "None"}
                                />
                            </TableCell>
                            <TableCell>
                                <CheckBox
                                    name="isCorrect"
                                    checked={answerOption.isCorrect}
                                    data-rowindex={answerOption.answerIndex}
                                    onChange={valueChangeAnswers}
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    icon="delete"
                                    design="Transparent"
                                    onClick={() => removeAnswerOption(index)}
                                    disabled={newQuestion.answerOptions.length <= 2}
                                    className="delete-option-btn"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>

            {/* Action Bar */}
            <Bar
                design="Footer"
                className="action-bar"
                endContent={
                    <>
                        <Button
                            design="Transparent"
                            onClick={resetForm}
                            disabled={isSaving}
                        >
                            Reset
                        </Button>
                        <Button
                            design="Default"
                            onClick={() => navigate('/managequestion')}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                        <Button
                            design="Emphasized"
                            icon="save"
                            onClick={saveQuestion}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Question'}
                        </Button>
                    </>
                }
            />

            <Toast ref={toast} duration={3000}>Toast</Toast>
        </div>
    );
}

export default AddQuestions;

// Made with Bob
