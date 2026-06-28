import { Card, CardHeader, Icon } from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';
import './QuizMainPage.css';

function QuizMainPage() {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: 'Take Quiz',
            description: 'Test your knowledge with our comprehensive quiz',
            icon: 'play',
            color: '#667eea',
            path: '/quiz',
            stats: 'Start Learning'
        },
        {
            title: 'Manage Questions',
            description: 'Add, edit, or delete quiz questions',
            icon: 'edit',
            color: '#764ba2',
            path: '/managequestion',
            stats: 'Organize Content'
        },
        {
            title: 'Add New Question',
            description: 'Create new quiz questions quickly',
            icon: 'add',
            color: '#f093fb',
            path: '/addquestion',
            stats: 'Create Content'
        },
        {
            title: 'Bulk Upload',
            description: 'Upload multiple questions using CSV file',
            icon: 'upload',
            color: '#00b894',
            path: '/bulkupload',
            stats: 'Import CSV'
        },
        {
            title: 'Quiz Analytics',
            description: 'View your performance and statistics',
            icon: 'bar-chart',
            color: '#4facfe',
            path: '/quiz',
            stats: 'Coming Soon',
            disabled: true
        }
    ];

    return (
        <div className="quiz-main-container">
            <div className="quiz-main-header">
                <div className="header-content">
                    <h1 className="main-title">
                        <Icon name="education" className="title-icon" />
                        Quiz Management System
                    </h1>
                    <p className="main-subtitle">
                        Create, manage, and take quizzes to enhance your learning experience
                    </p>
                </div>
            </div>

            <div className="quiz-cards-grid">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`quiz-menu-card ${item.disabled ? 'disabled' : ''}`}
                        onClick={() => !item.disabled && navigate(item.path)}
                        style={{ '--card-color': item.color }}
                    >
                        <div className="card-icon-wrapper">
                            <Icon name={item.icon} className="card-icon" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title">{item.title}</h2>
                            <p className="card-description">{item.description}</p>
                            <div className="card-stats">
                                <span className="stats-badge">{item.stats}</span>
                            </div>
                        </div>
                        {!item.disabled && (
                            <div className="card-arrow">
                                <Icon name="navigation-right-arrow" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="quick-stats-section">
                <h2 className="section-title">Quick Overview</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <Icon name="question-mark" className="stat-icon" />
                        <div className="stat-info">
                            <div className="stat-value">--</div>
                            <div className="stat-label">Total Questions</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Icon name="complete" className="stat-icon" />
                        <div className="stat-info">
                            <div className="stat-value">--</div>
                            <div className="stat-label">Quizzes Completed</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Icon name="performance" className="stat-icon" />
                        <div className="stat-info">
                            <div className="stat-value">--%</div>
                            <div className="stat-label">Average Score</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Icon name="time-entry-request" className="stat-icon" />
                        <div className="stat-info">
                            <div className="stat-value">--</div>
                            <div className="stat-label">Time Spent</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <h2 className="section-title">Features</h2>
                <div className="features-grid">
                    <div className="feature-item">
                        <Icon name="accept" className="feature-icon" />
                        <h3>Multiple Question Types</h3>
                        <p>Support for single and multiple choice questions</p>
                    </div>
                    <div className="feature-item">
                        <Icon name="time-overtime" className="feature-icon" />
                        <h3>Timed Quizzes</h3>
                        <p>Challenge yourself with time-limited assessments</p>
                    </div>
                    <div className="feature-item">
                        <Icon name="chart-table-view" className="feature-icon" />
                        <h3>Progress Tracking</h3>
                        <p>Monitor your learning progress over time</p>
                    </div>
                    <div className="feature-item">
                        <Icon name="responsive" className="feature-icon" />
                        <h3>Responsive Design</h3>
                        <p>Works seamlessly on all devices</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizMainPage;

// Made with Bob
