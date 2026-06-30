import React, { useState, useEffect, useCallback } from 'react';
import { getDumpQuestions, getTakeQuiz, getCategories } from "../api/QuizApi";
import { Button, MessageStrip, Input, Select, Option } from '@ui5/webcomponents-react';
import { useAuth } from "../Data/ContextHandler/AuthContext";
import './Quiz.css';

function Quiz() {
  const [questionSet, setQuestionSet] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showNavigator, setShowNavigator] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCategorySelection, setShowCategorySelection] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const { contextData } = useAuth();
  const { user } = contextData;

  // Quiz settings
  const QUIZ_TIME_LIMIT = 30 * 60; // 30 minutes in seconds
  const ENABLE_TIMER = false; // Set to true to enable timer

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      const response = await getCategories();
      if (response.categories && response.categories.length > 0) {
        setCategories(response.categories);
      }
      setLoadingCategories(false);
    };
    fetchCategories();
  }, []);

  const startQuiz = async () => {
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    
    setIsLoading(true);
    const response = await getTakeQuiz(user || 'anonymous', selectedCategory);
    if (response.questions && response.questions.length > 0) {
      setQuestionSet(response.questions);
      setQuizStartTime(new Date());
      setShowCategorySelection(false);
      if (ENABLE_TIMER) {
        setTimeRemaining(QUIZ_TIME_LIMIT);
      }
    } else {
      alert('No questions available for this category');
    }
    setIsLoading(false);
  };

  // Timer effect
  useEffect(() => {
    if (ENABLE_TIMER && timeRemaining !== null && timeRemaining > 0 && !showScore) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, showScore]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (!ENABLE_TIMER || timeRemaining === null) return '';
    if (timeRemaining < 60) return 'timer-danger';
    if (timeRemaining < 300) return 'timer-warning';
    return '';
  };

  const handleCheckboxChange = (oEvent) => {
    const deepCopy = JSON.parse(JSON.stringify(questionSet[currentQuestion]));
    deepCopy.answerOptions[oEvent.currentTarget.id].selected = oEvent.currentTarget.checked;
    
    let selectedOptions = "";
    for (let iCount = 0; iCount < deepCopy.answerOptions.length; iCount++) {
      if (deepCopy.answerOptions[iCount].selected) {
        selectedOptions = selectedOptions + deepCopy.answerOptions[iCount].answerIndex + ",";
      }
    }
    deepCopy.selectedAnswer = selectedOptions;

    const newQuestionSet = questionSet.map(question => {
      if (question._id === deepCopy._id) {
        return deepCopy;
      } else {
        return question;
      }
    });
    setQuestionSet(newQuestionSet);
  };

  const handleRadioButtonChange = (oEvent) => {
    const deepCopy = JSON.parse(JSON.stringify(questionSet[currentQuestion]));
    deepCopy.answerOptions.map(answerOption => answerOption.selected = false);
    deepCopy.answerOptions[oEvent.currentTarget.id].selected = oEvent.currentTarget.checked;
    deepCopy.selectedAnswer = oEvent.currentTarget.id;
    
    const newQuestionSet = questionSet.map(question => {
      if (question._id === deepCopy._id) {
        return deepCopy;
      } else {
        return question;
      }
    });
    setQuestionSet(newQuestionSet);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionSet.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handlePrevious = () => {
    let previousQuestion = currentQuestion - 1;
    if (previousQuestion < 0) {
      previousQuestion = 0;
    }
    setCurrentQuestion(previousQuestion);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questionSet.forEach(question => {
      if (question.questionType === "MultiSelect") {
        const correctAnswerIndices = question.answerOptions
          .filter(opt => opt.isCorrect)
          .map(opt => opt.answerIndex)
          .sort()
          .join(',');
        const selectedAnswerIndices = (question.selectedAnswer || "")
          .split(',')
          .filter(x => x)
          .sort()
          .join(',');
        if (correctAnswerIndices === selectedAnswerIndices) {
          correctAnswers++;
        }
      } else {
        const correctAnswerIndex = question.answerOptions.find(opt => opt.isCorrect)?.answerIndex;
        if (correctAnswerIndex === question.selectedAnswer) {
          correctAnswers++;
        }
      }
    });
    return correctAnswers;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowScore(true);
    setQuizEndTime(new Date());
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setShowCategorySelection(true);
    setSelectedCategory('');
    setQuestionSet([]);
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestion(index);
    setShowNavigator(false);
  };

  const getAnsweredCount = () => {
    return questionSet.filter(q => q.selectedAnswer && q.selectedAnswer !== "").length;
  };

  const getProgressPercentage = () => {
    return (getAnsweredCount() / questionSet.length) * 100;
  };

  const getTimeTaken = () => {
    if (!quizStartTime || !quizEndTime) return "N/A";
    const diff = Math.floor((quizEndTime - quizStartTime) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}m ${secs}s`;
  };

  if (showCategorySelection) {
    return (
      <div className="quiz-container">
        <div className="score-section">
          <div className="score-icon">📚</div>
          <h1 className="score-title">Select Quiz Category</h1>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            Choose a category to start your quiz. You'll get 20 random questions.
          </p>
          
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Category:
            </label>
            {loadingCategories ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div className="loading-spinner" style={{ width: '30px', height: '30px', margin: '0 auto' }}></div>
                <p style={{ marginTop: '0.5rem', color: '#666' }}>Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <MessageStrip design="Warning" style={{ marginBottom: '1.5rem' }}>
                No categories available. Please add questions first.
              </MessageStrip>
            ) : (
              <Select
                style={{ width: '100%', marginBottom: '1.5rem' }}
                onChange={(e) => setSelectedCategory(e.detail.selectedOption.textContent)}
              >
                <Option>Select a category</Option>
                {categories.map((cat) => (
                  <Option key={cat} value={cat}>{cat}</Option>
                ))}
              </Select>
            )}
            
            {user && (
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
                Taking quiz as: <strong>{user}</strong>
              </p>
            )}
            
            <button
              className="nav-button primary"
              onClick={startQuiz}
              disabled={!selectedCategory || isLoading}
              style={{ width: '100%' }}
            >
              {isLoading ? '⏳ Loading...' : '🚀 Start Quiz'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading Quiz Questions...</div>
        </div>
      </div>
    );
  }

  if (questionSet.length < 1) {
    return (
      <div className="quiz-container">
        <MessageStrip design="Warning">
          No questions available for this category. Please try another category.
        </MessageStrip>
        <button
          className="nav-button primary"
          onClick={() => setShowCategorySelection(true)}
          style={{ marginTop: '1rem' }}
        >
          ← Back to Category Selection
        </button>
      </div>
    );
  }

  if (showScore) {
    const percentage = ((score / questionSet.length) * 100).toFixed(1);
    const isPassed = percentage >= 60;

    return (
      <div className="quiz-container">
        <div className="score-section">
          <div className="score-icon">{isPassed ? '🎉' : '📚'}</div>
          <h1 className="score-title">
            {isPassed ? 'Congratulations!' : 'Keep Learning!'}
          </h1>
          <div className="score-display">
            {score} / {questionSet.length}
          </div>
          <div className="score-details">
            <div className="score-detail-item">
              <div className="score-detail-label">Percentage</div>
              <div className="score-detail-value">{percentage}%</div>
            </div>
            <div className="score-detail-item">
              <div className="score-detail-label">Correct</div>
              <div className="score-detail-value">{score}</div>
            </div>
            <div className="score-detail-item">
              <div className="score-detail-label">Incorrect</div>
              <div className="score-detail-value">{questionSet.length - score}</div>
            </div>
            <div className="score-detail-item">
              <div className="score-detail-label">Time Taken</div>
              <div className="score-detail-value">{getTimeTaken()}</div>
            </div>
          </div>
          <div className="score-actions">
            <button className="nav-button primary" onClick={handleRestart}>
              🔄 Retake Quiz
            </button>
            <button className="nav-button secondary" onClick={() => window.location.href = '/quizmain'}>
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Quiz Header */}
      <div className="quiz-header">
        <h1 className="quiz-title">Quiz Challenge</h1>
        <div className="quiz-stats">
          <div className="stat-item">
            <div className="stat-label">Progress</div>
            <div className="stat-value">{currentQuestion + 1}/{questionSet.length}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Answered</div>
            <div className="stat-value">{getAnsweredCount()}/{questionSet.length}</div>
          </div>
          {ENABLE_TIMER && timeRemaining !== null && (
            <div className={`stat-item timer-container ${getTimerClass()}`}>
              <div className="stat-label">Time Left</div>
              <div className="stat-value timer-text">{formatTime(timeRemaining)}</div>
            </div>
          )}
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${getProgressPercentage()}%` }}></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="question-card">
        <div className="question-header">
          <span className="question-number">
            Question {currentQuestion + 1} of {questionSet.length}
          </span>
          <span className="question-type-badge">
            {questionSet[currentQuestion].questionType === "MultiSelect" ? "Multiple Choice" : "Single Choice"}
          </span>
        </div>

        <div className="question-text">
          {questionSet[currentQuestion].questionText}
        </div>

        <div className="question-instruction">
          {questionSet[currentQuestion].questionType === "MultiSelect"
            ? `Select ${questionSet[currentQuestion].correctAnswersCount} correct answers`
            : "Select the correct answer"}
        </div>

        <div className="answer-options">
          {questionSet[currentQuestion].answerOptions.map((option, index) => (
            <label
              key={option.answerIndex}
              className={`answer-option ${option.selected ? 'selected' : ''}`}
            >
              {questionSet[currentQuestion].questionType === "MultiSelect" ? (
                <input
                  type="checkbox"
                  id={option.answerIndex}
                  value={option.answerIndex}
                  checked={option.selected || false}
                  onChange={handleCheckboxChange}
                />
              ) : (
                <input
                  type="radio"
                  name={questionSet[currentQuestion]._id}
                  id={option.answerIndex}
                  value={option.answerIndex}
                  checked={option.selected || false}
                  onChange={handleRadioButtonChange}
                />
              )}
              <span className="answer-label">{option.answerText}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="quiz-navigation">
        <button
          className="nav-button secondary"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>
        
        <button
          className="nav-button secondary"
          onClick={() => setShowNavigator(true)}
        >
          📋 Navigator
        </button>

        {currentQuestion < questionSet.length - 1 ? (
          <button className="nav-button primary" onClick={handleNext}>
            Next →
          </button>
        ) : (
          <button className="nav-button success" onClick={handleSubmit}>
            ✓ Submit Quiz
          </button>
        )}
      </div>

      {/* Question Navigator Modal */}
      {showNavigator && (
        <div className="navigator-overlay" onClick={() => setShowNavigator(false)}>
          <div className="navigator-modal" onClick={(e) => e.stopPropagation()}>
            <div className="navigator-header">
              <h2 className="navigator-title">Question Navigator</h2>
              <button className="close-button" onClick={() => setShowNavigator(false)}>
                ×
              </button>
            </div>
            <div className="navigator-grid">
              {questionSet.map((question, index) => (
                <div
                  key={index}
                  className={`navigator-item ${
                    index === currentQuestion
                      ? 'current'
                      : question.selectedAnswer && question.selectedAnswer !== ""
                      ? 'answered'
                      : 'unanswered'
                  }`}
                  onClick={() => navigateToQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="navigator-legend">
              <div className="legend-item">
                <div className="legend-box" style={{ background: '#667eea', borderColor: '#667eea' }}></div>
                <span>Current</span>
              </div>
              <div className="legend-item">
                <div className="legend-box" style={{ background: '#e8f5e9', borderColor: '#4caf50' }}></div>
                <span>Answered</span>
              </div>
              <div className="legend-item">
                <div className="legend-box" style={{ background: 'white', borderColor: '#e0e0e0' }}></div>
                <span>Unanswered</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;

// Made with Bob
