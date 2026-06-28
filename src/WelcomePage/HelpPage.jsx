import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Title,
  Text,
  Card,
  CardHeader,
  FlexBox,
  Icon,
  TabContainer,
  Tab,
  MessageStrip,
  List,
  ListItemStandard,
  Panel,
  Button
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";

function HelpPage() {
      const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: 'begin',
      content: [
        {
          subtitle: 'Welcome to WebComponentApp',
          description: 'A comprehensive enterprise application built with React and SAP UI5 Web Components.',
          items: [
            'Create an account by clicking "Register" on the welcome page',
            'Login with your credentials to access all features',
            'Explore the dashboard to see available modules',
            'Customize your experience in Settings'
          ]
        },
        {
          subtitle: 'System Requirements',
          description: 'For the best experience, ensure you have:',
          items: [
            'Modern web browser (Chrome, Firefox, Safari, Edge)',
            'Stable internet connection',
            'JavaScript enabled',
            'Cookies enabled for authentication'
          ]
        }
      ]
    },
    {
      id: 'authentication',
      title: 'Authentication & Security',
      icon: 'locked',
      content: [
        {
          subtitle: 'User Registration',
          description: 'Create your account to access all features:',
          items: [
            'Click "Register" on the welcome page',
            'Fill in your details (name, email, password)',
            'Verify your email address',
            'Login with your credentials'
          ]
        },
        {
          subtitle: 'Login & Logout',
          description: 'Secure access to your account:',
          items: [
            'Enter your email and password on the login page',
            'Use "Remember Me" for convenience',
            'Click your profile icon and select "Logout" to sign out',
            'Sessions expire after inactivity for security'
          ]
        },
        {
          subtitle: 'Password Reset',
          description: 'Forgot your password? No problem:',
          items: [
            'Click "Forgot Password" on the login page',
            'Enter your registered email address',
            'Check your email for reset instructions',
            'Create a new secure password'
          ]
        }
      ]
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: 'group',
      content: [
        {
          subtitle: 'User Directory',
          description: 'Browse and connect with other users:',
          items: [
            'Navigate to "Users" from the main menu',
            'Scroll through the user list (infinite scroll)',
            'Use search to find specific users',
            'Click on a user card to view their profile'
          ]
        },
        {
          subtitle: 'User Profiles',
          description: 'View and manage user information:',
          items: [
            'View user details including name, email, and bio',
            'See user activity and contributions',
            'Edit your own profile from "My Profile"',
            'Update profile picture and personal information'
          ]
        }
      ]
    },
    {
      id: 'chat',
      title: 'Real-Time Chat',
      icon: 'discussion',
      content: [
        {
          subtitle: 'Messaging Features',
          description: 'Communicate with other users in real-time:',
          items: [
            'Click the chat icon to open the chat panel',
            'See who is currently online (green indicator)',
            'Select a user to start a conversation',
            'Type your message and press Enter to send'
          ]
        },
        {
          subtitle: 'Chat Features',
          description: 'Enhanced messaging capabilities:',
          items: [
            'Real-time message delivery via Socket.IO',
            'Message history is preserved',
            'Online/offline status indicators',
            'Typing indicators (when available)'
          ]
        }
      ]
    },
    {
      id: 'products',
      title: 'Product Management',
      icon: 'product',
      content: [
        {
          subtitle: 'Browse Products',
          description: 'Explore the product catalog:',
          items: [
            'Navigate to "Products" from the menu',
            'View products in grid or list view',
            'Click on a product for detailed information',
            'Use filters to narrow down results'
          ]
        },
        {
          subtitle: 'Add Products',
          description: 'Create new product entries:',
          items: [
            'Click "Add Product" button',
            'Fill in product details (name, description, price)',
            'Upload product images',
            'Save to add to the catalog'
          ]
        },
        {
          subtitle: 'Edit Products',
          description: 'Modify existing products:',
          items: [
            'Select products from the list',
            'Click "Edit" button',
            'Update product information',
            'Save changes or cancel'
          ]
        }
      ]
    },
    {
      id: 'todo',
      title: 'To-Do List',
      icon: 'task',
      content: [
        {
          subtitle: 'Task Management',
          description: 'Organize your tasks efficiently:',
          items: [
            'Navigate to "To-Do List" from the menu',
            'Click "Add Task" to create a new task',
            'Set task title, description, and priority',
            'Mark tasks as complete when done'
          ]
        },
        {
          subtitle: 'Task Features',
          description: 'Advanced task management:',
          items: [
            'View task activity timeline',
            'Edit existing tasks',
            'Delete completed tasks',
            'Filter tasks by status (pending/completed)'
          ]
        }
      ]
    },
    {
      id: 'links',
      title: 'Useful Links',
      icon: 'chain-link',
      content: [
        {
          subtitle: 'Link Management',
          description: 'Save and organize useful links:',
          items: [
            'Navigate to "Useful Links" from the menu',
            'View "My Links" for personal bookmarks',
            'Browse "All Links" for community links',
            'Click "Add Link" to save a new bookmark'
          ]
        },
        {
          subtitle: 'Link Features',
          description: 'Organize your bookmarks:',
          items: [
            'Add title, URL, and description',
            'Categorize links for easy finding',
            'Edit or delete your links',
            'Share links with the community'
          ]
        }
      ]
    },
    {
      id: 'weather',
      title: 'Weather Information',
      icon: 'weather-proofing',
      content: [
        {
          subtitle: 'Weather Features',
          description: 'Get real-time weather information:',
          items: [
            'Navigate to "Weather" from the menu',
            'Allow location access for local weather',
            'View current temperature and conditions',
            'See weather forecast for upcoming days'
          ]
        },
        {
          subtitle: 'Weather Details',
          description: 'Comprehensive weather data:',
          items: [
            'Temperature (current, high, low)',
            'Humidity and wind speed',
            'Weather conditions (sunny, cloudy, rainy)',
            'Location-based automatic updates'
          ]
        }
      ]
    },
    {
      id: 'news',
      title: 'News & Articles',
      icon: 'newspaper',
      content: [
        {
          subtitle: 'Latest News',
          description: 'Stay updated with current events:',
          items: [
            'Navigate to "News" from the menu',
            'Browse latest articles from various sources',
            'Click on an article to read more',
            'Articles are updated regularly'
          ]
        },
        {
          subtitle: 'News Features',
          description: 'Enhanced news reading:',
          items: [
            'Multiple news categories',
            'Article summaries and images',
            'External links to full articles',
            'Powered by RapidAPI'
          ]
        }
      ]
    },
    {
      id: 'countries',
      title: 'Countries Information',
      icon: 'world',
      content: [
        {
          subtitle: 'Country Directory',
          description: 'Explore world countries:',
          items: [
            'Navigate to "Countries" from the menu',
            'Browse the list of countries',
            'Use search to find specific countries',
            'Click on a country for detailed information'
          ]
        },
        {
          subtitle: 'Country Details',
          description: 'Comprehensive country information:',
          items: [
            'Population and capital city',
            'Languages and currencies',
            'Geographic information',
            'Flags and other details'
          ]
        }
      ]
    },
    {
      id: 'images',
      title: 'Image Gallery',
      icon: 'picture',
      content: [
        {
          subtitle: 'Image Management',
          description: 'Upload and manage images:',
          items: [
            'Navigate to "Images" from the menu',
            'Click "Upload" to add new images',
            'View images in gallery or slider mode',
            'Delete or organize your images'
          ]
        },
        {
          subtitle: 'Gallery Features',
          description: 'Enhanced image viewing:',
          items: [
            'Grid and list view options',
            'Image slider for presentations',
            'Full-screen image viewing',
            'Image metadata and details'
          ]
        }
      ]
    },
    {
      id: 'quiz',
      title: 'Quiz System',
      icon: 'learning-assistant',
      content: [
        {
          subtitle: 'Take Quizzes',
          description: 'Test your knowledge:',
          items: [
            'Navigate to "Quiz" from the menu',
            'Select a quiz to start',
            'Answer questions one by one',
            'View your score at the end'
          ]
        },
        {
          subtitle: 'Manage Questions',
          description: 'Create and edit quiz questions:',
          items: [
            'Click "Add Question" to create new questions',
            'Set question text and multiple choice answers',
            'Mark the correct answer',
            'Edit or delete existing questions'
          ]
        }
      ]
    },
    {
      id: 'admin',
      title: 'Admin Features',
      icon: 'manager',
      content: [
        {
          subtitle: 'Admin Dashboard',
          description: 'Administrative controls (Admin users only):',
          items: [
            'Access admin panel from the menu',
            'View system logs and activity',
            'Manage user accounts',
            'Send system-wide notifications'
          ]
        },
        {
          subtitle: 'Admin Tools',
          description: 'Administrative capabilities:',
          items: [
            'Message Box - Send messages to users',
            'System Logs - Monitor application activity',
            'User Management - Control user access',
            'Notification Sender - Broadcast announcements'
          ]
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings & Preferences',
      icon: 'action-settings',
      content: [
        {
          subtitle: 'User Settings',
          description: 'Customize your experience:',
          items: [
            'Navigate to "Settings" from the menu',
            'Update your profile information',
            'Change password',
            'Configure notification preferences'
          ]
        },
        {
          subtitle: 'Theme Settings',
          description: 'Personalize the interface:',
          items: [
            'Choose between light and dark themes',
            'Current theme: SAP Horizon Dark',
            'Theme changes apply immediately',
            'Settings are saved automatically'
          ]
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: 'wrench',
      content: [
        {
          subtitle: 'Common Issues',
          description: 'Solutions to frequent problems:',
          items: [
            'Application not loading: Clear browser cache and refresh',
            'Login issues: Check credentials and internet connection',
            'Features not working: Ensure JavaScript is enabled',
            'Slow performance: Close unnecessary browser tabs'
          ]
        },
        {
          subtitle: 'Free Tier Notice',
          description: 'Important information about deployment:',
          items: [
            'Application deployed on free tier hosting',
            'May enter inactive state after prolonged inactivity',
            'First load after inactivity may take 30-60 seconds',
            'Please wait and try again if initial load fails'
          ]
        },
        {
          subtitle: 'Browser Compatibility',
          description: 'Supported browsers:',
          items: [
            'Google Chrome (recommended)',
            'Mozilla Firefox',
            'Safari (macOS/iOS)',
            'Microsoft Edge'
          ]
        }
      ]
    }
  ];

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    tabContainer: {
      marginBottom: '20px'
    },
    contentArea: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    sectionCard: {
      marginBottom: '20px'
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px'
    },
    listItem: {
      padding: '8px 0'
    },
    messageStrip: {
      marginBottom: '20px'
    },
    quickLinks: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '15px',
      marginTop: '20px'
    },
    quickLinkCard: {
      cursor: 'pointer',
      transition: 'transform 0.2s',
      ':hover': {
        transform: 'translateY(-2px)'
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <FlexBox alignItems="Center" justifyContent="Center" direction="Column">
          <Icon name="sys-help" style={{ fontSize: '48px', marginBottom: '10px', color: '#0854a0' }} />
          <Title level="H1">Help & Documentation</Title>
          <Text style={{ marginTop: '10px', color: '#666' }}>
            Everything you need to know about using WebComponentApp
          </Text>
        </FlexBox>
      </div>

      {/* Important Notice */}
      <MessageStrip
        design="Information"
        hideCloseButton
        style={styles.messageStrip}
      >
        <strong>Free Tier Notice:</strong> This application is deployed on free tier hosting. 
        If the application is not loading properly, please wait 30-60 seconds and try again. 
        The application may enter an inactive state after prolonged inactivity.
      </MessageStrip>

      {/* Quick Access Cards */}
      <div style={styles.quickLinks}>
        {helpSections.slice(0, 6).map((section, index) => (
          <Card
            key={section.id}
            style={styles.quickLinkCard}
            onClick={() => setSelectedTab(index)}
            header={
              <CardHeader
                titleText={section.title}
                avatar={<Icon name={section.icon} />}
              />
            }
          >
            <div style={{ padding: '10px' }}>
              <Text>Click to learn more about {section.title.toLowerCase()}</Text>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Help Sections */}
      <div style={{ ...styles.contentArea, marginTop: '30px' }}>
        <TabContainer
          onTabSelect={(e) => setSelectedTab(e.detail.tabIndex)}
          style={styles.tabContainer}
        >
          {helpSections.map((section) => (
            <Tab key={section.id} text={section.title} icon={section.icon}>
              <div style={{ padding: '20px' }}>
                {section.content.map((subsection, idx) => (
                  <Panel
                    key={idx}
                    headerText={subsection.subtitle}
                    collapsed={idx > 0}
                    style={styles.sectionCard}
                  >
                    <div style={{ padding: '15px' }}>
                      <Text style={{ marginBottom: '15px', display: 'block' }}>
                        {subsection.description}
                      </Text>
                      <List>
                        {subsection.items.map((item, itemIdx) => (
                          <ListItemStandard key={itemIdx} style={styles.listItem}>
                            <FlexBox alignItems="Start" style={{ gap: '10px' }}>
                              <Icon name="accept" style={{ color: '#0854a0', marginTop: '2px' }} />
                              <Text>{item}</Text>
                            </FlexBox>
                          </ListItemStandard>
                        ))}
                      </List>
                    </div>
                  </Panel>
                ))}
              </div>
            </Tab>
          ))}
        </TabContainer>
      </div>

      {/* Contact Support */}
      <Card
        style={{ marginTop: '30px' }}
        header={
          <CardHeader
            titleText="Need More Help?"
            avatar={<Icon name="customer-and-contacts" />}
          />
        }
      >
        <div style={{ padding: '20px' }}>
          <Text style={{ marginBottom: '15px', display: 'block' }}>
            If you couldn't find the answer to your question, please reach out to us:
          </Text>
          <FlexBox direction="Column" style={{ gap: '10px' }}>
            <FlexBox alignItems="Center" style={{ gap: '10px' }}>
              <Icon name="email" />
              <Text>Contact us via the Contact page</Text>
            </FlexBox>
            <FlexBox alignItems="Center" style={{ gap: '10px' }}>
              <Icon name="discussion" />
              <Text>Chat with support (when available)</Text>
            </FlexBox>
            <FlexBox alignItems="Center" style={{ gap: '10px' }}>
              <Icon name="sys-help-2" />
              <Text>Check the About page for more information</Text>
            </FlexBox>
          </FlexBox>
          <Button
            design="Emphasized"
            style={{ marginTop: '20px' }}
            onClick={() =>  navigate("/contact")}
          >
            Contact Support
          </Button>
        </div>
      </Card>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px' }}>
        <Text style={{ color: '#666' }}>
          WebComponentApp v1.1.1 | Built with React & SAP UI5 Web Components
        </Text>
      </div>
    </div>
  );
}

export default HelpPage;

// Made with Bob
