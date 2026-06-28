# WebComponentApp - Vite Edition

A modern React application built with SAP UI5 Web Components and powered by Vite for lightning-fast development.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:3000)
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
webcomponentapp/
├── public/              # Static assets
├── src/
│   ├── api/            # API integration
│   ├── components/     # React components
│   ├── contexts/       # Context providers
│   ├── Data/           # Data management
│   └── index.js        # Entry point
├── index.html          # Root HTML (Vite entry)
├── vite.config.js      # Vite configuration
├── .env.development    # Dev environment variables
└── .env.production     # Prod environment variables
```

## 🔧 Configuration

### Environment Variables

Create `.env.development` and `.env.production` files:

```bash
# .env.development
VITE_API_URL=http://localhost:3004
VITE_SOCKET_URL=http://localhost:3004/chat

# .env.production
VITE_API_URL=https://your-api.com
VITE_SOCKET_URL=wss://your-api.com/chat
```

### Vite Configuration

See `vite.config.js` for:
- Code splitting strategy
- Path aliases
- Build optimization
- Development server settings

## 🧪 Testing

```bash
# Run Cypress tests
npm run test

# Open Cypress UI
npm run test:open
```

## 📦 Build Output

Production builds are created in the `build/` directory with:
- Optimized and minified code
- Code-split chunks for better caching
- Source maps for debugging

## 🎯 Features

- ⚡ Lightning-fast HMR with Vite
- 🎨 SAP UI5 Web Components
- 🔐 Authentication & Authorization
- 💬 Real-time chat (Socket.IO)
- 📊 Product management
- 🌤️ Weather integration
- 📰 News feed
- 🗺️ Country information
- ✅ Todo list management
- 🔗 Useful links collection

## 🔗 Key Technologies

- **React 18.2** - UI framework
- **Vite 5.4** - Build tool
- **SAP UI5 Web Components** - Component library
- **React Router 6** - Routing
- **Socket.IO** - Real-time communication
- **Cypress** - E2E testing

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run zip` | Create deployment zip |

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not loading
- Ensure variables use `VITE_` prefix
- Restart dev server after changes
- Check `.env` files are in project root

## 📚 Documentation

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [UI5 Web Components](https://sap.github.io/ui5-webcomponents/)
- [Migration Guide](./VITE_MIGRATION.md)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private project - All rights reserved

---

**Built with ❤️ using Vite + React + UI5**