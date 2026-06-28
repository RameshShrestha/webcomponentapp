import { Button, Icon, MessageStrip, Toast, ProgressIndicator } from '@ui5/webcomponents-react';
import { useRef, useState } from 'react';
import { addDumpQuestion } from "../api/QuizApi";
import { useNavigate } from "react-router-dom";
import './BulkUploadQuestions.css';

function BulkUploadQuestions() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [validationErrors, setValidationErrors] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, validating, uploading, success, error
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadResults, setUploadResults] = useState({ success: 0, failed: 0, total: 0 });
    const fileInputRef = useRef(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    const showToast = (message) => {
        toast.current.innerHTML = message;
        toast.current.open = true;
    };

    const validateCSVStructure = (data) => {
        const errors = [];
        const requiredColumns = ['category', 'questionType', 'questionText', 'correctAnswersCount', 'answer1', 'answer2', 'answer3', 'answer4', 'correct1', 'correct2', 'correct3', 'correct4'];

        // Check if data is empty
        if (!data || data.length === 0) {
            errors.push('CSV file is empty');
            return { isValid: false, errors };
        }

        // Check headers
        const headers = Object.keys(data[0]);
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
            errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
        }

        // Validate each row
        data.forEach((row, index) => {
            const rowNum = index + 2; // +2 because index starts at 0 and row 1 is header

            // Validate category
            if (!row.category || row.category.trim() === '') {
                errors.push(`Row ${rowNum}: Category is required`);
            }

            // Validate question type
            if (!['SingleSelect', 'MultiSelect'].includes(row.questionType)) {
                errors.push(`Row ${rowNum}: Question type must be 'SingleSelect' or 'MultiSelect'`);
            }

            // Validate question text
            if (!row.questionText || row.questionText.trim().length < 10) {
                errors.push(`Row ${rowNum}: Question text must be at least 10 characters`);
            }

            // Validate correct answers count
            const correctCount = parseInt(row.correctAnswersCount);
            if (isNaN(correctCount) || correctCount < 1 || correctCount > 4) {
                errors.push(`Row ${rowNum}: Correct answers count must be between 1 and 4`);
            }

            // Validate answers
            const answers = [row.answer1, row.answer2, row.answer3, row.answer4];
            const filledAnswers = answers.filter(a => a && a.trim() !== '');
            
            if (filledAnswers.length < 2) {
                errors.push(`Row ${rowNum}: At least 2 answer options are required`);
            }

            // Validate correct answers
            const correctAnswers = [
                row.correct1?.toLowerCase() === 'true',
                row.correct2?.toLowerCase() === 'true',
                row.correct3?.toLowerCase() === 'true',
                row.correct4?.toLowerCase() === 'true'
            ];
            const correctCount2 = correctAnswers.filter(c => c).length;

            if (correctCount2 === 0) {
                errors.push(`Row ${rowNum}: At least one correct answer must be marked`);
            }

            if (correctCount2 !== correctCount) {
                errors.push(`Row ${rowNum}: Number of correct answers (${correctCount2}) doesn't match correctAnswersCount (${correctCount})`);
            }

            // For SingleSelect, only one correct answer
            if (row.questionType === 'SingleSelect' && correctCount2 !== 1) {
                errors.push(`Row ${rowNum}: SingleSelect questions must have exactly one correct answer`);
            }
        });

        return { isValid: errors.length === 0, errors };
    };

    const parseCSV = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) return [];

        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            data.push(row);
        }

        return data;
    };

    const convertToQuestionFormat = (csvRow) => {
        return {
            category: csvRow.category,
            questionId: new Date().getTime().toString() + Math.random().toString(36).substr(2, 9),
            questionType: csvRow.questionType,
            questionText: csvRow.questionText,
            correctAnswersCount: csvRow.correctAnswersCount,
            answerOptions: [
                {
                    answerIndex: "0",
                    answerText: csvRow.answer1 || '',
                    isCorrect: csvRow.correct1?.toLowerCase() === 'true',
                    selected: false
                },
                {
                    answerIndex: "1",
                    answerText: csvRow.answer2 || '',
                    isCorrect: csvRow.correct2?.toLowerCase() === 'true',
                    selected: false
                },
                {
                    answerIndex: "2",
                    answerText: csvRow.answer3 || '',
                    isCorrect: csvRow.correct3?.toLowerCase() === 'true',
                    selected: false
                },
                {
                    answerIndex: "3",
                    answerText: csvRow.answer4 || '',
                    isCorrect: csvRow.correct4?.toLowerCase() === 'true',
                    selected: false
                }
            ].filter(opt => opt.answerText.trim() !== ''),
            selectedAnswer: ""
        };
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        
        if (!file) {
            return;
        }

        // Validate file type
        if (!file.name.endsWith('.csv')) {
            showToast('⚠ Please select a CSV file only');
            setValidationErrors(['Only CSV files are allowed']);
            return;
        }

        setSelectedFile(file);
        setValidationErrors([]);
        setUploadStatus('idle');
        setUploadResults({ success: 0, failed: 0, total: 0 });
    };

    const handleValidate = async () => {
        if (!selectedFile) {
            showToast('⚠ Please select a file first');
            return;
        }

        setUploadStatus('validating');
        setValidationErrors([]);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const data = parseCSV(text);
                const validation = validateCSVStructure(data);

                if (validation.isValid) {
                    showToast('✓ File validation successful!');
                    setUploadStatus('validated');
                } else {
                    setValidationErrors(validation.errors);
                    setUploadStatus('error');
                    showToast('✗ Validation failed. Please fix the errors.');
                }
            } catch (error) {
                setValidationErrors(['Error parsing CSV file: ' + error.message]);
                setUploadStatus('error');
                showToast('✗ Error parsing CSV file');
            }
        };

        reader.onerror = () => {
            setValidationErrors(['Error reading file']);
            setUploadStatus('error');
            showToast('✗ Error reading file');
        };

        reader.readAsText(selectedFile);
    };

    const handleUpload = async () => {
        if (!selectedFile || uploadStatus !== 'validated') {
            return;
        }

        setUploadStatus('uploading');
        setUploadProgress(0);

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const text = e.target.result;
                const data = parseCSV(text);
                const total = data.length;
                let success = 0;
                let failed = 0;

                for (let i = 0; i < data.length; i++) {
                    try {
                        const question = convertToQuestionFormat(data[i]);
                        const result = await addDumpQuestion(question);
                        
                        if (result.message === "Added Successfully") {
                            success++;
                        } else {
                            failed++;
                        }
                    } catch (error) {
                        failed++;
                    }

                    setUploadProgress(Math.round(((i + 1) / total) * 100));
                }

                setUploadResults({ success, failed, total });
                setUploadStatus('success');
                showToast(`✓ Upload complete! ${success} questions added successfully.`);

                // Navigate after a delay
                setTimeout(() => {
                    navigate('/managequestion');
                }, 2000);

            } catch (error) {
                setUploadStatus('error');
                setValidationErrors(['Error uploading questions: ' + error.message]);
                showToast('✗ Error uploading questions');
            }
        };

        reader.readAsText(selectedFile);
    };

    const handleReset = () => {
        setSelectedFile(null);
        setValidationErrors([]);
        setUploadStatus('idle');
        setUploadProgress(0);
        setUploadResults({ success: 0, failed: 0, total: 0 });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const downloadTemplate = () => {
        const template = `category,questionType,questionText,correctAnswersCount,answer1,answer2,answer3,answer4,correct1,correct2,correct3,correct4
Fiori,SingleSelect,What is SAP Fiori?,1,A design language,A programming language,A database,A server,true,false,false,false
SAP CAP,MultiSelect,Which are SAP CAP features?,2,OData services,Node.js support,Java support,Python support,true,true,false,false`;

        const blob = new Blob([template], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quiz_questions_template.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="bulk-upload-container">
            {/* Header */}
            <div className="bulk-upload-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <Icon name="upload" className="title-icon" />
                        Bulk Upload Questions
                    </h1>
                    <p className="page-subtitle">
                        Upload multiple questions at once using a CSV file
                    </p>
                </div>
            </div>

            {/* Instructions Card */}
            <div className="instructions-card">
                <h2 className="section-title">
                    <Icon name="hint" />
                    Instructions
                </h2>
                <ol className="instructions-list">
                    <li>Download the CSV template to see the required format</li>
                    <li>Fill in your questions following the template structure</li>
                    <li>Save your file as CSV format</li>
                    <li>Upload the file and validate the data</li>
                    <li>If validation passes, click Upload to add questions</li>
                </ol>

                <div className="template-section">
                    <h3>CSV Format Requirements:</h3>
                    <ul className="format-list">
                        <li><strong>category:</strong> Question category (e.g., Fiori, SAP CAP, Build)</li>
                        <li><strong>questionType:</strong> Either "SingleSelect" or "MultiSelect"</li>
                        <li><strong>questionText:</strong> The question (minimum 10 characters)</li>
                        <li><strong>correctAnswersCount:</strong> Number of correct answers (1-4)</li>
                        <li><strong>answer1-4:</strong> Answer options (minimum 2 required)</li>
                        <li><strong>correct1-4:</strong> Mark correct answers as "true" or "false"</li>
                    </ul>
                    <Button icon="download" onClick={downloadTemplate} className="download-btn">
                        Download CSV Template
                    </Button>
                </div>
            </div>

            {/* Upload Card */}
            <div className="upload-card">
                <h2 className="section-title">
                    <Icon name="document" />
                    Upload File
                </h2>

                <div className="file-input-section">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelect}
                        className="file-input"
                        id="csvFileInput"
                    />
                    <label htmlFor="csvFileInput" className="file-input-label">
                        <Icon name="upload-to-cloud" className="upload-icon" />
                        <span className="upload-text">
                            {selectedFile ? selectedFile.name : 'Click to select CSV file'}
                        </span>
                        <span className="upload-hint">Only .csv files are allowed</span>
                    </label>
                </div>

                {selectedFile && (
                    <div className="file-info">
                        <Icon name="document" />
                        <span className="file-name">{selectedFile.name}</span>
                        <span className="file-size">({(selectedFile.size / 1024).toFixed(2)} KB)</span>
                    </div>
                )}

                <div className="action-buttons">
                    <Button
                        icon="validate"
                        design="Emphasized"
                        onClick={handleValidate}
                        disabled={!selectedFile || uploadStatus === 'validating' || uploadStatus === 'uploading'}
                    >
                        {uploadStatus === 'validating' ? 'Validating...' : 'Validate File'}
                    </Button>
                    <Button
                        icon="upload"
                        design="Positive"
                        onClick={handleUpload}
                        disabled={uploadStatus !== 'validated' || uploadStatus === 'uploading'}
                    >
                        {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Questions'}
                    </Button>
                    <Button
                        icon="refresh"
                        design="Transparent"
                        onClick={handleReset}
                        disabled={uploadStatus === 'uploading'}
                    >
                        Reset
                    </Button>
                </div>

                {uploadStatus === 'uploading' && (
                    <div className="progress-section">
                        <ProgressIndicator value={uploadProgress} displayValue={`${uploadProgress}%`} />
                        <p className="progress-text">Uploading questions... Please wait.</p>
                    </div>
                )}
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
                <div className="validation-card">
                    <MessageStrip design="Error">
                        <strong>Validation Errors Found:</strong>
                    </MessageStrip>
                    <ul className="error-list">
                        {validationErrors.map((error, index) => (
                            <li key={index} className="error-item">
                                <Icon name="error" className="error-icon" />
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Success Results */}
            {uploadStatus === 'success' && (
                <div className="results-card">
                    <MessageStrip design="Success">
                        <strong>Upload Complete!</strong>
                    </MessageStrip>
                    <div className="results-stats">
                        <div className="result-item success">
                            <Icon name="accept" />
                            <span className="result-label">Successful:</span>
                            <span className="result-value">{uploadResults.success}</span>
                        </div>
                        <div className="result-item failed">
                            <Icon name="decline" />
                            <span className="result-label">Failed:</span>
                            <span className="result-value">{uploadResults.failed}</span>
                        </div>
                        <div className="result-item total">
                            <Icon name="list" />
                            <span className="result-label">Total:</span>
                            <span className="result-value">{uploadResults.total}</span>
                        </div>
                    </div>
                    <p className="redirect-message">Redirecting to Manage Questions...</p>
                </div>
            )}

            <Toast ref={toast} duration={3000}>Toast</Toast>
        </div>
    );
}

export default BulkUploadQuestions;

// Made with Bob
