import { useEffect } from "react";
import LoginPage from "../LoginComponents/LoginPage";
import { Text, Title, Card, Icon } from "@ui5/webcomponents-react";
import "./WelcomeScreen.css";

function WelcomeScreen() {
    useEffect(() => {
        // Future: Add server status check if needed
    }, []);

    const features = [
        {
            icon: "task",
            title: "Task Management",
            description: "Organize your daily tasks with our intuitive todo list. Track progress, set priorities, and never miss a deadline."
        },
        {
            icon: "collaborate",
            title: "Real-time Chat",
            description: "Connect with team members instantly. Share ideas, files, and collaborate seamlessly in real-time."
        },
        {
            icon: "world",
            title: "Country Explorer",
            description: "Discover detailed information about countries worldwide. Explore demographics, geography, and cultural insights."
        },
        {
            icon: "learning-assistant",
            title: "Quiz Platform",
            description: "Test your knowledge with interactive quizzes. Perfect for learning and skill assessment."
        },
        {
            icon: "weather-proofing",
            title: "Weather Updates",
            description: "Stay informed with real-time weather forecasts. Plan your day with accurate meteorological data."
        },
        {
            icon: "newspaper",
            title: "News Feed",
            description: "Stay updated with the latest news from around the world. Curated content delivered to your dashboard."
        }
    ];

    return (
        <main className="welcome-screen">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="login-container">
                    <LoginPage />
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Welcome to Your Digital Workspace
                        </h1>
                        <p className="hero-subtitle">
                            This is a hobby project for learning Node.js, React.js, SAP Webcomponents.
                        </p>
                        <div className="tech-stack">
                            <img src="./NodeReactImg.PNG" alt="React and Node.js" className="tech-image" />
                        </div>
                    </div>
                </div>
                <div className="hero-logo">
                    <img src="./JavaScriptLogo.png" alt="JavaScript" className="js-logo" />
                    <img src="./sapwebcomponentreact.png" alt="SAP WebComponent React" className="js-logo" />

                </div>
            </div>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <Title level="H2" className="section-title">
                        ✨ Powerful Features at Your Fingertips
                    </Title>
                    <Text className="section-description">
                        Explore our comprehensive suite of tools designed to enhance your productivity and streamline your workflow.
                    </Text>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <Card key={index} className="feature-card">
                            <div className="feature-icon">
                                <Icon name={feature.icon} />
                            </div>
                            <Title level="H4" className="feature-title">
                                {feature.title}
                            </Title>
                            <Text className="feature-description">
                                {feature.description}
                            </Text>
                        </Card>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="about-content">
                    <Title level="H2" className="about-title">
                        🚀 Built with Modern Technologies
                    </Title>
                    <div className="about-grid">
                        <div className="about-item">
                            <Icon name="developer-settings" className="about-icon" />
                            <Title level="H5">React & UI5 Web Components</Title>
                            <Text>
                                Leveraging the power of React with SAP's UI5 Web Components for a modern,
                                enterprise-grade user interface that's both beautiful and functional.
                            </Text>
                        </div>
                        <div className="about-item">
                            <Icon name="database" className="about-icon" />
                            <Title level="H5">Node.js Backend</Title>
                            <Text>
                                Robust server-side architecture built with Node.js and Express,
                                ensuring fast, scalable, and secure data processing.
                            </Text>
                        </div>
                        <div className="about-item">
                            <Icon name="responsive" className="about-icon" />
                            <Title level="H5">Responsive Design</Title>
                            <Text>
                                Fully responsive interface that adapts seamlessly to any device -
                                desktop, tablet, or mobile. Work anywhere, anytime.
                            </Text>
                        </div>
                        <div className="about-item">
                            <Icon name="shield" className="about-icon" />
                            <Title level="H5">Secure Authentication</Title>
                            <Text>
                                Enterprise-grade security with OAuth integration, JWT tokens,
                                and encrypted data transmission to keep your information safe.
                            </Text>
                        </div>
                    </div>
                </div>
            </section>

            {/* Getting Started Section */}
            <section className="getting-started-section">
                <div className="getting-started-content">
                    <Title level="H2" className="getting-started-title">
                        🎯 Getting Started
                    </Title>
                    <div className="steps-container">
                        <div className="step">
                            <div className="step-number">1</div>
                            <Title level="H5">Sign In</Title>
                            <Text>
                                Log in with your credentials or use social authentication for quick access.
                            </Text>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <Title level="H5">Explore Features</Title>
                            <Text>
                                Navigate through the intuitive interface and discover all available tools.
                            </Text>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <Title level="H5">Customize</Title>
                            <Text>
                                Personalize your workspace with themes, settings, and preferences.
                            </Text>
                        </div>
                        <div className="step">
                            <div className="step-number">4</div>
                            <Title level="H5">Collaborate</Title>
                            <Text>
                                Connect with others, share resources, and work together efficiently.
                            </Text>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="welcome-footer">
                <Text className="footer-text">
                    💡 This application is developed as part of continuous learning in React and Node.js.
                    Built with passion and dedication to modern web development practices.
                </Text>
                <Text className="footer-credits">
                    Special thanks to the open-source community and educational resources that made this possible.
                </Text>
            </footer>
        </main>
    );
}

export default WelcomeScreen;