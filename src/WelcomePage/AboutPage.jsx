import { 
  Title, 
  Text, 
  Link, 
  Card,
  CardHeader,
  Icon,
  FlexBox,
  Label,
  MessageStrip
} from "@ui5/webcomponents-react";
import './AboutPage.css';

function AboutPage() {
  const frontendVersion = "1.1.1";
  const backendVersion = "1.0.0";

  const features = [
    { icon: "discussion", title: "AI Chat", description: "Chat with AI using Ollama (local) or OpenRouter (cloud) services with streaming responses" },
    { icon: "collaborate", title: "Real-time Chat", description: "Socket.io powered real-time messaging with online user tracking" },
    { icon: "map", title: "Interactive Maps", description: "OpenLayers integration for location-based features and weather data" },
    { icon: "weather-proofing", title: "Weather Information", description: "Real-time weather data from OpenWeatherMap API" },
    { icon: "newspaper", title: "News Feed", description: "Latest news from multiple sources via RapidAPI" },
    { icon: "checklist", title: "Todo Management", description: "Create, update, and manage your tasks with MongoDB persistence" },
    { icon: "user-settings", title: "User Profiles", description: "Complete user management with authentication and settings" },
    { icon: "notification-2", title: "Notifications", description: "Real-time notification system for important updates" },
    { icon: "product", title: "Product Catalog", description: "Browse and manage products with detailed information" },
    { icon: "contacts", title: "Contact System", description: "Send messages and feedback through the contact form" }
  ];

  const frontendTech = [
    { name: "React", version: "18.2.0", description: "UI library for building user interfaces" },
    { name: "SAP UI5 Web Components", version: "2.10.0", description: "Enterprise-grade UI components" },
    { name: "Vite", version: "5.4.21", description: "Next-generation frontend build tool" },
    { name: "React Router", version: "6.21.0", description: "Declarative routing for React" },
    { name: "Socket.io Client", version: "4.7.3", description: "Real-time bidirectional communication" },
    { name: "OpenLayers", version: "8.2.0", description: "High-performance mapping library" }
  ];

  const backendTech = [
    { name: "Node.js", description: "JavaScript runtime built on Chrome's V8 engine" },
    { name: "Express", version: "4.18.2", description: "Fast, minimalist web framework" },
    { name: "MongoDB", version: "8.0.3", description: "NoSQL database for flexible data storage" },
    { name: "Socket.io", version: "4.7.3", description: "Real-time event-based communication" },
    { name: "OpenAI SDK", version: "6.45.0", description: "Integration with AI services" },
    { name: "Passport", version: "0.7.0", description: "Authentication middleware" },
    { name: "JWT", version: "9.0.2", description: "JSON Web Token for secure authentication" }
  ];

  const externalAPIs = [
    { name: "OpenWeatherMap", url: "https://openweathermap.org/", purpose: "Weather data and forecasts" },
    { name: "RapidAPI", url: "https://rapidapi.com/hub", purpose: "News and various API integrations" },
    { name: "OpenRouter", url: "https://openrouter.ai/", purpose: "Cloud-based AI model access" },
    { name: "Ollama", url: "https://ollama.com/", purpose: "Local AI model deployment" },
    { name: "DummyJSON", url: "https://dummyjson.com/", purpose: "Mock data for testing" },
    { name: "Picsum Photos", url: "https://picsum.photos/", purpose: "Random placeholder images" },
    { name: "SimpleMaps", url: "https://simplemaps.com/data", purpose: "Geographic data" }
  ];

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <div className="about-hero">
        <FlexBox alignItems="Center" justifyContent="Center" direction="Column">
          <Icon name="globe" className="about-hero-icon" style={{ width: '48px', height: '48px' }}/>
          <Title level="H1" className="about-title">Web Component Application</Title>
          <Text className="about-subtitle">
            A full-stack web application built with modern technologies
          </Text>
          <FlexBox className="version-badges" wrap="Wrap" justifyContent="Center">
            <Label className="version-badge">Frontend v{frontendVersion}</Label>
            <Label className="version-badge">Backend v{backendVersion}</Label>
          </FlexBox>
        </FlexBox>
      </div>

      {/* Disclaimer Section */}
      <MessageStrip design="Information" hideCloseButton className="disclaimer-strip">
        <strong>Development Acknowledgment:</strong>  This application incorporates code patterns and solutions 
        from various <strong>GitHub repositories</strong>. Special thanks to the open-source community for 
        their invaluable contributions and shared knowledge.
        This application was also improved further recently with the help of 
        <strong> IBM watsonx Code Assistant (Bob AI)</strong>
      </MessageStrip>

      {/* Overview Section */}
      <Card className="about-card">
        <CardHeader
          titleText="Application Overview"
          subtitleText="A comprehensive web platform for learning and experimentation"
          avatar={<Icon name="information" />}
        />
        <div className="card-content">
          <Text>
            This web application serves as a practical learning platform, combining modern web technologies 
            to create a feature-rich, full-stack solution. Built with React and SAP UI5 Web Components on 
            the frontend, and powered by Node.js/Express with MongoDB on the backend, it demonstrates 
            real-world application architecture and best practices.
          </Text>
          <br />
          <Text>
            The application is continuously evolving as a learning project. Features are regularly added 
            and improved based on experimentation with new technologies and frameworks. If you encounter 
            any issues or have suggestions, please use the contact page to provide feedback.
          </Text>
        </div>
      </Card>

      {/* Features Section */}
      <Card className="about-card">
        <CardHeader
          titleText="Key Features"
          subtitleText="Explore what this application offers"
          avatar={<Icon name="activities" />}
        />
        <div className="card-content">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <Icon name={feature.icon} className="feature-icon" />
                <div className="feature-content">
                  <Text className="feature-title">{feature.title}</Text>
                  <Text className="feature-description">{feature.description}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Frontend Technologies */}
      <Card className="about-card">
        <CardHeader
          titleText="Frontend Technologies"
          subtitleText="Modern UI framework and libraries"
          avatar={<Icon name="laptop" />}
        />
        <div className="card-content">
          <div className="tech-list">
            {frontendTech.map((tech, index) => (
              <div key={index} className="tech-item">
                <FlexBox alignItems="Center" justifyContent="SpaceBetween">
                  <div>
                    <Text className="tech-name">{tech.name}</Text>
                    <Text className="tech-description">{tech.description}</Text>
                  </div>
                  {tech.version && <Label className="tech-version">v{tech.version}</Label>}
                </FlexBox>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Backend Technologies */}
      <Card className="about-card">
        <CardHeader
          titleText="Backend Technologies"
          subtitleText="Server-side infrastructure and services"
          avatar={<Icon name="database" />}
        />
        <div className="card-content">
          <div className="tech-list">
            {backendTech.map((tech, index) => (
              <div key={index} className="tech-item">
                <FlexBox alignItems="Center" justifyContent="SpaceBetween">
                  <div>
                    <Text className="tech-name">{tech.name}</Text>
                    <Text className="tech-description">{tech.description}</Text>
                  </div>
                  {tech.version && <Label className="tech-version">v{tech.version}</Label>}
                </FlexBox>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* External APIs */}
      <Card className="about-card">
        <CardHeader
          titleText="External APIs & Services"
          subtitleText="Third-party integrations"
          avatar={<Icon name="chain-link" />}
        />
        <div className="card-content">
          <div className="api-list">
            {externalAPIs.map((api, index) => (
              <div key={index} className="api-item">
                <FlexBox direction="Column">
                  <Link href={api.url} target="_blank" className="api-name">
                    {api.name}
                  </Link>
                  <Text className="api-purpose">{api.purpose}</Text>
                </FlexBox>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Architecture Section */}
      <Card className="about-card">
        <CardHeader
          titleText="Architecture & Deployment"
          subtitleText="Technical infrastructure"
          avatar={<Icon name="workflow-tasks" />}
        />
        <div className="card-content">
          <div className="architecture-section">
            <div className="arch-item">
              <Icon name="customer-view" className="arch-icon" />
              <div>
                <Text className="arch-title">Frontend Architecture</Text>
                <Text>Component-based React application with SAP UI5 Web Components, utilizing 
                React Router for navigation and Context API for state management.</Text>
              </div>
            </div>
            <div className="arch-item">
              <Icon name="database" className="arch-icon" />
              <div>
                <Text className="arch-title">Backend Architecture</Text>
                <Text>RESTful API built with Express.js, featuring JWT authentication, 
                Socket.io for real-time features, and MongoDB for data persistence.</Text>
              </div>
            </div>
            <div className="arch-item">
              <Icon name="cloud" className="arch-icon" />
              <div>
                <Text className="arch-title">Deployment</Text>
                <Text>Hosted on Render.com with continuous deployment from GitHub. 
                MongoDB Atlas for cloud database hosting.</Text>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Resources Section */}
      <Card className="about-card">
        <CardHeader
          titleText="Documentation & Resources"
          subtitleText="Learn more about the technologies used"
          avatar={<Icon name="document" />}
        />
        <div className="card-content">
          <div className="resources-grid">
            <Link href="https://sap.github.io/ui5-webcomponents-react/" target="_blank">
              SAP UI5 Web Components Documentation
            </Link>
            <Link href="https://react.dev/reference/react" target="_blank">
              React Documentation
            </Link>
            <Link href="https://www.mongodb.com/docs/" target="_blank">
              MongoDB Documentation
            </Link>
            <Link href="https://nodejs.org/docs/latest/api/" target="_blank">
              Node.js Documentation
            </Link>
            <Link href="https://expressjs.com/" target="_blank">
              Express.js Documentation
            </Link>
            <Link href="https://socket.io/docs/v4/" target="_blank">
              Socket.io Documentation
            </Link>
            <Link href="https://openlayers.org/en/latest/apidoc/" target="_blank">
              OpenLayers Documentation
            </Link>
            <Link href="https://vitejs.dev/" target="_blank">
              Vite Documentation
            </Link>
            <Link href="https://github.com/RameshShrestha" target="_blank">
                My Github
            </Link>
            <Link href="https://github.com/RameshShrestha/DataProvider" target="_blank">
                Backend Source Code
            </Link>
            <Link href="https://github.com/RameshShrestha/webcomponentapp" target="_blank">
               FrontEnd Source Code
            </Link>
                
          </div>
        </div>
      </Card>

      {/* Footer Note */}
      <div className="about-footer">
        <Text className="footer-text">
          This application is a continuous work in progress, developed for learning and experimentation 
          purposes. Your feedback and suggestions are always welcome!
        </Text>
      </div>
    </div>
  );
}

export default AboutPage;

// Made with Bob
