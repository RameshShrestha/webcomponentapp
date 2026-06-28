import { Form, FormItem, FormGroup, Button, Bar, Select, Option, TextArea, Label, CheckBox, Toast, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow, MessageStrip, Icon } from '@ui5/webcomponents-react';
import { useState, useEffect, useRef } from 'react';
import { updateDumpQuestion, getDumpQuestions } from "../api/QuizApi";
import { useNavigate, useLocation } from "react-router-dom";
import './EditViewQuestion.css';

function EditViewQuestion(questionId, currentMode = "Display") {
    const { pathname, state } = useLocation();
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [originalQuestion, setOriginalQuestion] = useState({});
    const [mode, setMode] = useState(currentMode);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    const toast = useRef(null);
    const navigate = useNavigate();

    const showToast = (message) => {
        toast.current.innerHTML = message;
        toast.current.open = true;
    };

    const validateQuestion = () => {
        const newErrors = {};

        if (!currentQuestion.questionText?.trim()) {
            newErrors.questionText = 'Question text is required';
        } else if (currentQuestion.questionText.trim().length < 10) {
            newErrors.questionText = 'Question text must be at least 10 characters';
        }

        const filledAnswers = currentQuestion.answerOptions?.filter(opt => opt.answerText?.trim()) || [];
        if (filledAnswers.length < 2) {
            newErrors.answerOptions = 'At least 2 answer options are required';
        }

        const correctAnswers = currentQuestion.answerOptions?.filter(opt => opt.isCorrect) || [];
        if (correctAnswers.length === 0) {
            newErrors.correctAnswers = 'At least one correct answer must be selected';
        }

        if (currentQuestion.questionType === 'MultiSelect') {
            const expectedCount = parseInt(currentQuestion.correctAnswersCount);
            if (correctAnswers.length !== expectedCount) {
                newErrors.correctAnswers = `Please select exactly ${expectedCount} correct answer(s)`;
            }
        } else {
            if (correctAnswers.length !== 1) {
                newErrors.correctAnswers = 'Please select exactly one correct answer';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveQuestion = async () => {
        if (!validateQuestion()) {
            showToast('⚠ Please fix the validation errors');
            return;
        }

        setIsSaving(true);
        try {
            const result = await updateDumpQuestion(currentQuestion);
            if (result.message === "Updated Successfully") {
                showToast('✓ Question updated successfully!');
                setOriginalQuestion(JSON.parse(JSON.stringify(currentQuestion)));
                setMode("Display");
            } else {
                showToast('✗ Failed to update question');
            }
        } catch (error) {
            showToast('✗ Error updating question');
        } finally {
            setIsSaving(false);
        }
    };

    const cancelAction = async () => {
        setCurrentQuestion(JSON.parse(JSON.stringify(originalQuestion)));
        setErrors({});
        setMode("Display");
        showToast('Changes cancelled');
    };

    const onEditClick = async () => {
        setMode("Edit");
    };

    const valueChange = (oEvent) => {
        const name = oEvent.currentTarget.name;
        const value = oEvent.currentTarget.value;
        setCurrentQuestion({ ...currentQuestion, [name]: value });
        
        if (errors[name]) {
            setErrors({ ...errors, [name]: undefined });
        }

        if (name === 'questionType' && value === 'SingleSelect') {
            setCurrentQuestion(prev => ({ ...prev, [name]: value, correctAnswersCount: "1" }));
        }
    };

    const valueChangeAnswers = (oEvent) => {
        const name = oEvent.currentTarget.name;
        let value = oEvent.currentTarget.value;
        if (oEvent.currentTarget.tagName === "UI5-CHECKBOX") {
            value = oEvent.currentTarget.checked;
        }

        const index = oEvent.currentTarget.dataset.rowindex;
        const newObj = JSON.parse(JSON.stringify(currentQuestion));
        newObj.answerOptions[index][name] = value;
        setCurrentQuestion(newObj);

        if (errors.answerOptions || errors[`answer_${index}`] || errors.correctAnswers) {
            setErrors({ 
                ...errors, 
                answerOptions: undefined, 
                [`answer_${index}`]: undefined,
                correctAnswers: undefined 
            });
        }
    };

    const fetchData = async (questionId) => {
        setIsLoading(true);
        const response = await getDumpQuestions(questionId);
        if (response) {
            setCurrentQuestion(response);
            setOriginalQuestion(JSON.parse(JSON.stringify(response)));
        }
        setIsLoading(false);
    };

    useEffect(() => {
        let questionId = "";
        if (pathname) {
            questionId = pathname.replace("/displayquestion/", "");
        }
        if (state?.questionId) {
            fetchData(state.questionId || questionId);
        }
        if (state?.mode) {
            setMode(state.mode);
        }
    }, []);

    const hasChanges = () => {
        return JSON.stringify(currentQuestion) !== JSON.stringify(originalQuestion);
    };

    const getCorrectAnswersCount = () => {
        return currentQuestion.answerOptions?.filter(opt => opt.isCorrect).length || 0;
    };

    if (isLoading) {
        return (
            <div className="edit-question-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading Question...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-question-container">
            {/* Header */}
            <div className="edit-question-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <Icon name={mode === "Display" ? "show" : "edit"} className="title-icon" />
                        {mode === "Display" ? "View Question" : "Edit Question"}
                    </h1>
                    <p className="page-subtitle">
                        {mode === "Display" 
                            ? "Review question details" 
                            : "Modify question and answer options"}
                    </p>
                </div>
                {mode === "Display" && (
                    <Button
                        design="Emphasized"
                        icon="edit"
                        onClick={onEditClick}
                        className="edit-mode-btn"
                    >
                        Edit Question
                    </Button>
                )}
            </div>

            {/* Mode Indicator */}
            {mode === "Edit" && hasChanges() && (
                <MessageStrip design="Information" className="changes-indicator">
                    <strong>Unsaved Changes:</strong> You have made changes to this question. Don't forget to save!
                </MessageStrip>
            )}

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
                            <Select 
                                value={currentQuestion.category} 
                                onChange={valueChange}  
                                disabled={mode === "Display"} 
                                name="category"
                            >
                                <Option>Fiori</Option>
                                <Option>SAP CAP</Option>
                                <Option>Build</Option>
                                <Option>JavaScript</Option>
                                <Option>React</Option>
                                <Option>General</Option>
                            </Select>
                        </FormItem>

                        <FormItem labelContent={<Label required>Question Type</Label>}>
                            <Select 
                                value={currentQuestion.questionType} 
                                onChange={valueChange}  
                                disabled={mode === "Display"} 
                                name="questionType"
                            >
                                <Option>SingleSelect</Option>
                                <Option>MultiSelect</Option>
                            </Select>
                        </FormItem>

                        {currentQuestion.questionType === 'MultiSelect' && (
                            <FormItem labelContent={<Label required>Correct Answers Count</Label>}>
                                <Select 
                                    value={currentQuestion.correctAnswersCount}   
                                    name="correctAnswersCount" 
                                    disabled={mode === "Display"} 
                                    onChange={valueChange}
                                >
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
                                disabled={mode === "Display"}
                                name="questionText"
                                value={currentQuestion.questionText}
                                onChange={valueChange}
                                placeholder="Enter your question here..."
                                rows={4}
                                valueState={errors.questionText ? "Error" : "None"}
                                valueStateMessage={errors.questionText ? <span>{errors.questionText}</span> : null}
                            />
                        </FormItem>

                        {mode === "Display" && currentQuestion.createdAt && (
                            <FormItem labelContent={<Label>Created At</Label>}>
                                <span className="info-text">
                                    {new Date(currentQuestion.createdAt).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </FormItem>
                        )}
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
                        </TableHeaderRow>
                    }
                >
                    {currentQuestion.answerOptions && currentQuestion.answerOptions.map((answerOption, index) => (
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
                                    disabled={mode === "Display"}
                                    placeholder={`Answer option ${index + 1}`}
                                />
                            </TableCell>
                            <TableCell>
                                <CheckBox  
                                    name="isCorrect" 
                                    checked={answerOption.isCorrect} 
                                    data-rowindex={answerOption.answerIndex} 
                                    onChange={valueChangeAnswers}
                                    disabled={mode === "Display"}
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
                        {mode === "Display" ? (
                            <Button 
                                design="Default" 
                                onClick={() => navigate('/managequestion')}
                            >
                                Back to List
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    design="Transparent" 
                                    icon="decline" 
                                    onClick={cancelAction}
                                    disabled={isSaving}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    design="Emphasized" 
                                    icon="save" 
                                    onClick={saveQuestion}
                                    disabled={isSaving || !hasChanges()}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </>
                        )}
                    </>
                }
            />

            <Toast ref={toast} duration={3000}>Toast</Toast>
        </div>
    );
}

export default EditViewQuestion;

// Made with Bob
