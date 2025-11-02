# ModernVPN Frontend

A modern React frontend for ModernVPN built with Vite, featuring user authentication, server dashboard, and advertising integration.

## 🚀 Features

- **Modern React with Vite** - Fast development and build process
- **User Authentication** - Login/Register with JWT token management
- **VPN Dashboard** - Server selection and connection management
- **Ad Integration** - Sponsored content with event tracking
- **Responsive Design** - Mobile-friendly interface
- **Real-time Status** - Connection status and usage tracking

## 📋 Prerequisites

- Node.js 16+ and npm
- ModernVPN Backend running (see [backend repository](https://github.com/Student-kits/modernvpn-backend))

## 🛠️ Quick Start

### Option 1: Clone and Run

```bash
# Clone the repository
git clone https://github.com/Student-kits/modernvpn-frontend.git
cd modernvpn-frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your backend URL

# Start development server
npm run dev
```

### Option 2: Create from Scratch

```bash
# Create new Vite React project
npm create vite@latest modernvpn-frontend -- --template react
cd modernvpn-frontend

# Install additional dependencies
npm install
npm install axios react-router-dom

# Copy source files from this repository
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Backend API URL - Update this to match your backend
VITE_API_URL=https://your-backend-url.com

# For local development:
# VITE_API_URL=http://localhost:8000

# For Replit backend:
# VITE_API_URL=https://your-repl.yourname.repl.co
```

### API Integration

The frontend expects these backend endpoints:

| Endpoint | Method | Purpose | Expected Response |
|----------|--------|---------|-------------------|
| `/auth/login` | POST | User login | `{ access_token: string }` |
| `/users/create` | POST | User registration | `{ id: number, email: string }` |
| `/users/me` | GET | Get current user | `{ id: number, email: string, is_admin: boolean }` |
| `/vpn/servers` | GET | List VPN servers | `[{ id: string, region: string, ip: string }]` |
| `/vpn/assign` | POST | Connect to server | `{ config: string }` |
| `/ads` | GET | Get advertisements | `[{ id: number, title: string, link: string, payoutRate: string }]` |
| `/ads/event` | POST | Track ad events | `{ ok: boolean }` |

## 🏗️ Project Structure

```
src/
├── main.jsx              # Application entry point
├── App.jsx               # Main app component with routing
├── styles.css            # Global styles and design system
├── services/
│   └── api.js           # Axios configuration and interceptors
├── pages/
│   ├── Login.jsx        # Login page with authentication
│   ├── Register.jsx     # User registration
│   └── Dashboard.jsx    # Main dashboard with VPN controls
└── widgets/
    └── AdsList.jsx      # Advertisement display component
```

## 🎨 Features Overview

### Authentication System
- JWT token-based authentication
- Automatic token attachment to requests
- Secure logout with token cleanup
- Form validation and error handling

### VPN Dashboard
- Server selection with visual cards
- Connection status tracking
- Usage reporting functionality
- Real-time connection feedback

### Advertisement Integration
- Country-based ad targeting
- Click and impression tracking
- Responsive ad grid layout
- Event analytics for monetization

### Responsive Design
- Mobile-first approach
- Modern CSS Grid and Flexbox
- Clean, professional interface
- Smooth animations and transitions

## 🚀 Deployment Options

### Local Development

```bash
npm run dev
# Open http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variable: `VITE_API_URL`
4. Deploy automatically

### Deploy to Netlify

1. Build locally: `npm run build`
2. Upload `dist/` folder to Netlify
3. Or connect GitHub repository
4. Set environment variables in Netlify dashboard

### Deploy to Replit

1. Import from GitHub in Replit
2. Set `VITE_API_URL` in Replit Secrets
3. Update `package.json` start script:
   ```json
   {
     "scripts": {
       "start": "vite --host 0.0.0.0 --port 3000"
     }
   }
   ```
4. Click Run in Replit

## 🔗 Backend Integration

This frontend is designed to work with the [ModernVPN Backend](https://github.com/Student-kits/modernvpn-backend). Make sure your backend includes:

### Required Routes
- Authentication endpoints (`/auth/login`)
- User management (`/users/create`, `/users/me`)
- VPN management (`/vpn/servers`, `/vpn/assign`)
- Ad system (`/ads`, `/ads/event`)

### CORS Configuration
Ensure your backend allows frontend origin:

```python
# FastAPI CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Structure

- **Components**: Functional components with hooks
- **State Management**: React useState and useEffect
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Styling**: CSS custom properties and modern CSS

### Adding New Features

1. Create component in appropriate directory
2. Add route to `App.jsx` if needed
3. Update API service for new endpoints
4. Add corresponding styles
5. Test with backend integration

## 🔒 Security Features

- JWT token automatic attachment
- Secure token storage in localStorage
- Input validation and sanitization
- HTTPS-ready (set `VITE_API_URL` to HTTPS)
- NoOpener for external links

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interface elements
- Optimized typography and spacing
- Mobile-first CSS approach

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test
4. Commit: `git commit -am 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend CORS is configured correctly
- Check `VITE_API_URL` is set properly

**Authentication Fails**
- Verify backend authentication endpoints
- Check token format in localStorage
- Ensure JWT secret is consistent

**Build Issues**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version (16+ required)
- Verify all dependencies are installed

**Connection Issues**
- Check backend is running and accessible
- Verify API endpoint URLs
- Check browser developer console for errors

## 🔗 Related Projects

- [ModernVPN Backend](https://github.com/Student-kits/modernvpn-backend) - FastAPI backend

## 📞 Support

- Open an issue on GitHub
- Check backend integration guide
- Review API documentation

---

**Happy coding! 🚀**