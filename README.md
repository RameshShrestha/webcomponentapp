# WebComponentApp - Enterprise React Application

A comprehensive enterprise-grade web application built with React 18, SAP UI5 Web Components, and Vite. This application provides a full-featured platform with user management, real-time chat, weather information, news aggregation, and much more.

## 🚀 Features Overview

### 🔐 Authentication & User Management
- **User Registration & Login** - Secure authentication system
- **Password Reset** - Self-service password recovery
- **Protected Routes** - Role-based access control
- **User Profiles** - View and edit user information
- **OAuth Callback** - Third-party authentication support

### 👥 User Management
- **User Directory** - Browse all registered users
- **User Details** - Comprehensive user profile pages
- **Infinite Scroll** - Efficient loading of large user lists
- **User Search & Filter** - Find users quickly

### 💬 Real-Time Chat
- **Socket.IO Integration** - Real-time messaging
- **Online Status** - See who's online
- **Chat History** - Message persistence
- **User-to-User Messaging** - Direct messaging capabilities

### 📦 Product Management
- **Product Catalog** - Browse products with rich UI
- **Add Products** - Create new product entries
- **Edit Products** - Modify existing products
- **Product Details** - Detailed product information
- **Image Gallery** - Product image management

### ✅ To-Do List
- **Task Management** - Create, edit, and delete tasks
- **Task Status** - Track task completion
- **Activity Timeline** - View task history
- **User-specific Lists** - Personal task organization

### 🔗 Useful Links Manager
- **Link Collection** - Save and organize useful links
- **Categories** - Organize links by category
- **My Links** - Personal link management
- **All Links** - Browse community links
- **Add/Edit/Delete** - Full CRUD operations

### 🌤️ Weather Information
- **Current Weather** - Real-time weather data
- **Location-based** - Automatic location detection
- **Weather Cards** - Beautiful weather visualization
- **Forecast** - Multi-day weather predictions

### 📰 News Aggregation
- **Latest News** - Real-time news from RapidAPI
- **Article Cards** - Rich news presentation
- **Categories** - Filter news by category
- **External Links** - Read full articles

### 🌍 Countries Information
- **Country Directory** - Browse world countries
- **Country Details** - Detailed country information
- **Search & Filter** - Find countries easily
- **Rich Data** - Population, capital, languages, etc.

### 🖼️ Image Gallery
- **Image Upload** - Upload and manage images
- **Image Slider** - Beautiful image presentation
- **Gallery View** - Grid and list views
- **Image Management** - Organize your images

### 📝 Quiz System
- **Create Quizzes** - Add questions and answers
- **Manage Questions** - Edit and delete questions
- **Take Quiz** - Interactive quiz interface
- **View Results** - Score tracking and history

### 👨‍💼 Admin Features
- **Admin Dashboard** - Administrative controls
- **Message Box** - Admin messaging system
- **System Logs** - View application logs
- **User Management** - Admin user controls

### ⚙️ Settings & Configuration
- **User Preferences** - Customize your experience
- **Theme Settings** - Dark/Light mode (SAP Horizon Dark)
- **Notification Settings** - Control notifications
- **Profile Settings** - Update personal information

### 📄 Information Pages
- **Welcome Screen** - Landing page for new users
- **About Page** - Application information
- **Contact Page** - Contact form
- **Help Page** - User documentation

## 🛠️ Technology Stack

### Core Technologies
- **React 18.2** - Modern React with Hooks
- **Vite 5.4.21** - Lightning-fast build tool
- **React Router 6.21** - Client-side routing
- **Socket.IO Client 4.7.3** - Real-time communication

### UI Framework
- **SAP UI5 Web Components 2.10** - Enterprise UI components
  - `@ui5/webcomponents` - Core components
  - `@ui5/webcomponents-react` - React wrappers
  - `@ui5/webcomponents-fiori` - Fiori components
  - `@ui5/webcomponents-icons` - Icon library
  - `@ui5/webcomponents-react-charts` - Data visualization

### Additional Libraries
- **OpenLayers 8.2** - Interactive maps
- **React Infinite Scroll 6.1** - Infinite scrolling
- **React Simple Image Slider 2.4** - Image carousel

### Development Tools
- **ESLint 9.39** - Code linting
- **Prettier 3.9** - Code formatting
- **Vite Plugin React 4.7** - React support for Vite

## 📁 Project Structure

```
webcomponentapp/
├── public/                      # Static assets
├── src/
│   ├── AdminComponents/         # Admin-specific components
│   │   ├── AdminLogs.jsx
│   │   ├── AdminMessageBox.jsx
│   │   └── AdminNotificationSender.jsx
│   ├── api/                     # API client and utilities
│   │   ├── apiClient.js        # Centralized HTTP client
│   │   └── QuizApi.js          # Quiz API endpoints
│   ├── chatComponents/          # Real-time chat features
│   │   ├── ChatBox.jsx
│   │   ├── ChattingBox.jsx
│   │   └── ChatMessage.jsx
│   ├── components/              # Shared components
│   │   └── ErrorBoundary.jsx   # Error handling
│   ├── CountriesCompoents/      # Country information
│   │   ├── CountriesMainPage.jsx
│   │   └── CountryDetailPage.jsx
│   ├── Data/                    # Data management
│   │   ├── LocalStorage.js     # LocalStorage utilities
│   │   └── ContextHandler/     # React Context providers
│   │       ├── AuthContext.js
│   │       ├── UsersContext.js
│   │       ├── ToDoListContext.js
│   │       ├── UsefulLinksContext.js
│   │       ├── UserLocationContext.js
│   │       └── constant.js
│   ├── hooks/                   # Custom React hooks
│   │   └── useApi.js           # API call hooks
│   ├── ImageContainer/          # Image gallery
│   │   └── ImageListMainPage.jsx
│   ├── LoginComponents/         # Authentication
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── ProtectedRoutes.jsx
│   │   ├── UnProtectedRoutes.jsx
│   │   └── Callbackpage.jsx
│   ├── ProductComponents/       # Product management
│   │   ├── Products.jsx
│   │   ├── EditProducts.jsx
│   │   ├── NewProduct.jsx
│   │   └── ProductDetailDialog.jsx
│   ├── QuizComponents/          # Quiz system
│   │   ├── Quiz.jsx
│   │   ├── AddQuestions.jsx
│   │   ├── EditViewQuestion.jsx
│   │   └── ManageQuestions.jsx
│   ├── RapidAPI/                # External API integrations
│   │   └── News/
│   │       ├── NewsPage.jsx
│   │       └── ArticleCardContainer.jsx
│   ├── ShellBarComponents/      # Navigation & header
│   │   ├── MyShellBar.jsx
│   │   ├── UserPopover.jsx
│   │   ├── Notifications.jsx
│   │   └── MyNotificationItem.jsx
│   ├── ToDoComponents/          # Task management
│   │   ├── ToDoMainPage.jsx
│   │   └── TodoActivity.jsx
│   ├── UsefulLinks/             # Link management
│   │   ├── UsefulLinkMainPage.jsx
│   │   ├── MyLinksContent.jsx
│   │   ├── AllLinksContent.jsx
│   │   ├── AddLinkDialog.jsx
│   │   └── MyMessageBox.jsx
│   ├── UserComponents/          # User management
│   │   ├── UsersDetailPage.jsx
│   │   ├── StandardField.jsx
│   │   └── UserDetailValidator.js
│   ├── WeatherPage/             # Weather information
│   │   ├── WeatherMainPage.jsx
│   │   └── WeatherCard.jsx
│   ├── WelcomePage/             # Landing pages
│   │   ├── WelcomeScreen.jsx
│   │   ├── WelcomeHeader.jsx
│   │   ├── WelcomeFooter.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── HelpPage.jsx
│   ├── App.jsx                  # Root component
│   ├── MyApp.jsx                # Main routing component
│   ├── index.jsx                # Application entry point
│   ├── socket.js                # Socket.IO configuration
│   └── ContextCreator.js        # Context definitions
├── .env.development             # Development environment variables
├── .env.production              # Production environment variables
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
├── .prettierrc.json             # Prettier configuration
└── package.json                 # Dependencies and scripts
```

## 🗺️ Application Routes

### Public Routes (Unauthenticated)
- `/welcome` - Welcome landing page
- `/login` - User login
- `/register` - New user registration
- `/about` - About the application
- `/contact` - Contact form
- `/images` - Public image gallery
- `/weather` - Weather information
- `/news` - Latest news
- `/countries` - Country information
- `/help` - Help documentation
- `/usefullinks` - Public useful links
- `/products1` - Public product catalog
- `/authcallback` - OAuth callback handler

### Protected Routes (Authenticated)
- `/home` - User dashboard
- `/myprofile` - User profile page
- `/users` - User directory
- `/users/:id` - Specific user details
- `/products` - Product management
- `/addproduct` - Add new product
- `/editproducts` - Edit products
- `/todolist` - Personal to-do list
- `/usefullinks1` - Personal useful links
- `/settings` - User settings
- `/resetPassword` - Password reset
- `/adminmessagebox` - Admin messaging (Admin only)
- `/adminlogs` - System logs (Admin only)
- `/addquestion` - Add quiz question
- `/managequestion` - Manage quiz questions
- `/displayquestion/:id` - View/Edit question
- `/quiz` - Take quiz

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Backend API server running (default: http://localhost:3004)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd webcomponentapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env.development` file:
```env
VITE_API_URL=http://localhost:3004
VITE_SOCKET_URL=http://localhost:3004/chat
```

Create `.env.production` file:
```env
VITE_API_URL=https://your-production-api.com
VITE_SOCKET_URL=https://your-production-api.com/chat
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or next available port)

### Build for Production

```bash
npm run build
```

This will:
1. Build the application to the `dist/` directory
2. Create a zip file `myreactmodule-content.zip` for deployment

### Preview Production Build

```bash
npm run preview
```

## 📜 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production and create zip
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 UI Theme

The application uses **SAP Horizon Dark** theme by default. The theme can be configured in `MyApp.jsx`:

```javascript
setTheme("sap_horizon_dark");
```

Available themes:
- `sap_horizon` - Light theme
- `sap_horizon_dark` - Dark theme
- `sap_fiori_3` - Fiori 3 theme
- `sap_fiori_3_dark` - Fiori 3 dark theme

## 🔌 API Integration

The application connects to a backend API for:
- User authentication and management
- Product CRUD operations
- To-do list management
- Useful links storage
- Quiz questions and results
- Admin operations
- Real-time chat via Socket.IO

### API Configuration

API endpoints are configured in:
- `src/Data/ContextHandler/constant.js` - Base URL configuration
- `src/api/apiClient.js` - HTTP client with interceptors
- `src/socket.js` - Socket.IO configuration

## 🔒 Authentication

The application uses JWT-based authentication:
1. User logs in with credentials
2. Server returns JWT token
3. Token stored in localStorage
4. Token included in all API requests
5. Protected routes check for valid token

## 🌐 Real-Time Features

Socket.IO enables real-time features:
- **Live Chat** - Instant messaging between users
- **Online Status** - See who's currently online
- **Notifications** - Real-time notifications
- **Connection Status** - Monitor connection state

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

## 🧪 Testing

The application includes:
- Cypress component tests (`App.cy.jsx`)
- ESLint for code quality
- Prettier for code formatting

## 🔧 Configuration Files

- **vite.config.js** - Vite build configuration with optimizations
- **eslint.config.js** - ESLint 9 flat config
- **.prettierrc.json** - Code formatting rules
- **cypress.config.js** - Cypress testing configuration

## 📊 Performance Optimizations

- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - Components loaded on demand
- **Tree Shaking** - Unused code elimination
- **Minification** - Production code minification
- **Caching** - Efficient browser caching
- **HMR** - Hot Module Replacement in development

## 🐛 Error Handling

- **ErrorBoundary** - Catches React component errors
- **API Error Handling** - Centralized error management
- **User-Friendly Messages** - Clear error communication
- **Fallback UI** - Graceful degradation

## 🔐 Security Features

- JWT token authentication
- Protected routes
- Input validation
- XSS protection
- CSRF protection
- Secure password handling

## 📚 Documentation

Additional documentation available:
- `VITE_MIGRATION.md` - CRA to Vite migration guide
- `CODE_IMPROVEMENTS.md` - Code quality improvements
- `POST_MIGRATION_STEPS.md` - Post-migration tasks
- `README_VITE.md` - Vite-specific documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 👥 Support

For support and questions:
- Check the Help page in the application
- Contact via the Contact page
- Review documentation files

## 🎯 Future Enhancements

- [ ] Unit test coverage
- [ ] E2E testing with Cypress
- [ ] PWA support
- [ ] Offline mode
- [ ] Push notifications
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics
- [ ] Performance monitoring
- [ ] Accessibility improvements (WCAG 2.1)

## 📈 Version History

- **v1.1.1** - Current version with Vite migration
- **v1.0.0** - Initial release with Create React App

---

**Built with ❤️ using React, SAP UI5 Web Components, and Vite**
