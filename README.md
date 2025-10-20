# 👟 KickzStore

**KickzStore** is a modern React Native e-commerce mobile application specializing in footwear retail. Built with Expo and React Native, this full-stack application provides a complete shopping experience for sneaker enthusiasts and shoe lovers. The app features a sleek, mobile-optimized interface with real-time product browsing, detailed product views, intelligent search functionality, and seamless navigation.

## 🎯 Project Overview

KickzStore is designed as both a production-ready mobile commerce platform and an educational resource for developers learning React Native, mobile app development, and full-stack architecture. The application demonstrates modern mobile development practices including:

- **Cross-platform compatibility** (iOS, Android, Web)
- **Real-time API integration** with a Node.js/Express backend
- **MongoDB database** for product and user data management
- **Responsive design** optimized for mobile devices
- **Modern React Native patterns** with hooks and functional components
- **Professional UI/UX** with smooth animations and intuitive navigation

## 🛍️ Core Features

### Product Management
- **Product Catalog**: Browse through an extensive collection of footwear
- **Product Details**: Comprehensive product information with high-quality images
- **Search & Filter**: Intelligent search with real-time suggestions and recent search history
- **Brand Filtering**: Filter products by popular shoe brands
- **Price Display**: Clear pricing information with currency formatting

### User Experience
- **Intuitive Navigation**: Tab-based navigation with smooth transitions
- **Shopping Cart**: Add and manage items for purchase
- **Wishlist**: Save favorite products for later
- **User Account**: Profile management and order history
- **Responsive Design**: Optimized for all screen sizes and orientations

### Technical Features
- **Real-time Search**: Instant product search with debounced API calls
- **Image Optimization**: Efficient image loading and caching
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Loading States**: Smooth loading indicators and skeleton screens
- **Offline Support**: Basic offline functionality with cached data

## 🏗️ Architecture

The application follows a clean, modular architecture with clear separation of concerns:

- **Frontend**: React Native with Expo for cross-platform development
- **Backend**: Node.js with Express.js for RESTful API services
- **Database**: MongoDB with Mongoose for data modeling and management
- **State Management**: React hooks for local state and context for global state
- **Navigation**: React Navigation for seamless screen transitions
- **Styling**: Custom stylesheets with responsive design principles

## 🚀 Technology Stack

### Frontend Technologies
- **React Native 0.81.4** - Mobile app framework
- **Expo ~54.0.13** - Development platform and tools
- **React Navigation 7.x** - Navigation library
- **Axios 1.12.2** - HTTP client for API calls
- **TypeScript 5.9.2** - Type-safe JavaScript

### Backend Technologies
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB 8.19.1** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS 2.8.5** - Cross-origin resource sharing
- **bcrypt 6.0.0** - Password hashing

### Development Tools
- **Expo CLI** - Development and deployment tools
- **ESLint 9.25.0** - Code linting and formatting
- **Git** - Version control
- **VS Code** - Recommended development environment

## 📱 Mobile-First Design

KickzStore is built with a mobile-first approach, ensuring optimal performance and user experience across all devices:

- **Touch-Optimized Interface**: Large, accessible touch targets
- **Gesture Support**: Swipe gestures and pull-to-refresh functionality
- **Performance Optimized**: Efficient rendering and memory management
- **Cross-Platform Consistency**: Uniform experience across iOS and Android
- **Responsive Layouts**: Adaptive design for different screen sizes

## 🎓 Educational Value

This project serves as an excellent learning resource for developers at various skill levels:

### Beginner Developers
- Learn React Native fundamentals and component architecture
- Understand mobile app navigation patterns
- Practice API integration and data fetching
- Master responsive design principles

### Intermediate Developers
- Implement advanced state management patterns
- Build complex user interfaces with smooth animations
- Integrate third-party libraries and services
- Optimize app performance and user experience

### Advanced Developers
- Design scalable mobile application architecture
- Implement advanced authentication and security features
- Build production-ready mobile commerce applications
- Master cross-platform development best practices

## 🔧 Development Ready

The project is fully configured for immediate development:

- **Hot Reloading**: Instant code changes without app restart
- **Debug Tools**: Comprehensive debugging and development tools
- **Type Safety**: Full TypeScript support for better code quality
- **Code Quality**: ESLint configuration for consistent code style
- **Git Integration**: Proper version control with comprehensive .gitignore

## 🌟 Key Highlights

- **Production-Ready Code**: Clean, maintainable, and scalable codebase
- **Modern Development Practices**: Latest React Native and mobile development patterns
- **Comprehensive Documentation**: Detailed README and inline code comments
- **Educational Focus**: Designed for learning and skill development
- **Real-World Application**: Practical e-commerce functionality
- **Cross-Platform Support**: Single codebase for multiple platforms

## Prerequisites

- Node.js (version 16 or higher) and npm installed on your system
- Expo CLI installed globally (`npm install -g @expo/cli`)
- A modern mobile device or emulator (iOS Simulator, Android Emulator, or physical device)
- Expo Go app installed on your mobile device (for testing)
- (Optional) A code editor like VS Code, Sublime Text, or Atom for easier code navigation
- Basic understanding of JavaScript, React, and mobile development concepts
- Knowledge of React Native fundamentals (components, hooks, navigation)

## Installation

1. **Clone the repository** (if not already downloaded):
   ```sh
   git clone <repository-url>
   cd KickzStore/main
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Install backend dependencies**:
   ```sh
   cd backend
   npm install
   cd ..
   ```

4. **Start the development server**:
   ```sh
   npm start
   ```

## How to Run

### Development Mode

1. **Start the Expo development server**:
   ```sh
   npm start
   ```
   This will start the Expo development server with QR code for device testing.

2. **Run on specific platforms**:
   ```sh
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   
   # For Web
   npm run web
   ```

3. **Start the backend server** (in a separate terminal):
   ```sh
   cd backend
   node server.js
   ```

### Production Mode

1. **Build for production**:
   ```sh
   expo build:android
   expo build:ios
   ```

2. **Build for web**:
   ```sh
   expo export:web
   ```

**Note**: The application uses Expo for development, which provides hot reloading and easy device testing through the Expo Go app.

## Project Structure

```
KickzStore/
├── main/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   └── index.tsx
│   │   ├── _layout.tsx
│   │   ├── modal.tsx
│   │   └── src/
│   │       ├── components/
│   │       │   ├── BackButton/
│   │       │   ├── MenuButton/
│   │       │   ├── MenuImage/
│   │       │   └── ViewIngredientsButton/
│   │       ├── navigations/
│   │       │   ├── AppNavigator.js
│   │       │   └── MenuNavigator.js
│   │       └── screens/
│   │           ├── Account/
│   │           ├── Cart/
│   │           ├── Home/
│   │           ├── ProductDetail/
│   │           ├── ProductList/
│   │           ├── Search/
│   │           └── Wishlist/
│   ├── backend/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── cartController.js
│   │   │   ├── productController.js
│   │   │   ├── userController.js
│   │   │   └── wishlistController.js
│   │   ├── models/
│   │   │   ├── Cart.js
│   │   │   ├── Product.js
│   │   │   ├── User.js
│   │   │   └── Wishlist.js
│   │   ├── routes/
│   │   │   ├── cart.js
│   │   │   ├── product.js
│   │   │   ├── user.js
│   │   │   └── wishlist.js
│   │   ├── server.js
│   │   └── utils/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── external-link.tsx
│   │   ├── haptic-tab.tsx
│   │   ├── hello-wave.tsx
│   │   ├── parallax-scroll-view.tsx
│   │   ├── themed-text.tsx
│   │   ├── themed-view.tsx
│   │   └── ui/
│   ├── constants/
│   │   └── theme.ts
│   ├── hooks/
│   │   ├── use-color-scheme.ts
│   │   ├── use-color-scheme.web.ts
│   │   └── use-theme-color.ts
│   ├── app.json
│   ├── package.json
│   └── README.md
└── database/
    ├── KickzStore.carts.json
    ├── KickzStore.products.json
    ├── KickzStore.users.json
    └── KickzStore.wishlists.json
```

- **app/**: Main application structure with Expo Router
  - `(tabs)/`: Tab-based navigation screens
  - `src/`: Source code organized by feature
  - `_layout.tsx`: Root layout component
  - `modal.tsx`: Modal screen component
- **backend/**: Node.js/Express backend server
  - `config/`: Database configuration
  - `controllers/`: Business logic handlers
  - `models/`: Data models and schemas
  - `routes/`: API route definitions
  - `server.js`: Main server entry point
- **assets/**: Static assets (images, icons)
- **components/**: Reusable UI components
- **constants/**: App constants and theme configuration
- **hooks/**: Custom React hooks
- **database/**: JSON database files for development

## Features

- **React Native Framework**: Modern JavaScript library for building mobile applications
- **Expo Integration**: Complete Expo development environment with easy deployment
- **Component-Based Architecture**: Reusable UI components with props and state
- **React Navigation**: Mobile-optimized navigation system
- **Authentication System**: User login and registration functionality
- **API Integration**: RESTful API calls using Axios
- **CRUD Operations**: Create, Read, Update, Delete workflows for products
- **Responsive Design**: Mobile-first design with adaptive layouts
- **State Management**: React hooks for local state management
- **Local Storage**: Persistent data storage using AsyncStorage
- **Modern JavaScript**: ES6+ features and async/await patterns
- **Hot Reloading**: Automatic app refresh during development
- **Form Handling**: Controlled components with validation
- **Error Handling**: Comprehensive error catching and user feedback
- **Loading States**: Conditional rendering based on data availability
- **Cross-Platform**: Works on iOS, Android, and Web

## Learning Modules

### React Native Fundamentals (`app/src/`)

This module covers the core React Native concepts:
- **Component Structure**: Functional components with hooks
- **State Management**: useState and useEffect hooks
- **Navigation**: React Navigation setup and screen transitions
- **Authentication Flow**: Token-based login/logout system
- **Local Storage**: AsyncStorage for persistent data
- **Platform-Specific Code**: iOS and Android adaptations

### Component Architecture (`app/src/components/`)

This module demonstrates component-based development:

#### Navigation Components
- **AppNavigator**: Main navigation structure
- **MenuNavigator**: Drawer navigation for menu screens
- **BackButton**: Reusable back navigation component

#### UI Components
- **MenuButton**: Custom button component with styling
- **MenuImage**: Image component with loading states
- **ViewIngredientsButton**: Specialized button for product details

### Screen Components (`app/src/screens/`)

This module covers screen-level components:
- **Home Screen**: Main dashboard with product listings
- **Product Detail**: Individual product information and actions
- **Product List**: Categorized product listings
- **Search Screen**: Product search functionality
- **Cart Screen**: Shopping cart management
- **Wishlist Screen**: Saved products management
- **Account Screen**: User profile and settings

### API Integration

This module covers backend API communication:
- **RESTful APIs**: Integration with Express.js backend
- **HTTP Methods**: GET, POST, PUT, DELETE requests
- **Authentication Headers**: Bearer token implementation
- **Error Handling**: Network error management
- **Data Transformation**: API response processing

### Backend Development (`backend/`)

This module covers server-side development:
- **Express.js Setup**: RESTful API server configuration
- **MongoDB Integration**: Database connection and models
- **Authentication**: User registration and login
- **CRUD Operations**: Product, cart, and wishlist management
- **Middleware**: CORS, authentication, and error handling
- **Data Validation**: Input validation and sanitization

### Navigation System

This module covers React Navigation implementation:
- **Stack Navigation**: Screen-to-screen transitions
- **Tab Navigation**: Bottom tab navigation
- **Drawer Navigation**: Side menu navigation
- **Modal Navigation**: Overlay screens
- **Deep Linking**: URL-based navigation
- **Navigation Guards**: Authentication-based access control

### State Management

This module covers React state patterns:
- **Local State**: useState hook for component state
- **Effect Management**: useEffect for side effects
- **Context API**: Global state management
- **Custom Hooks**: Reusable stateful logic
- **Async State**: Loading and error states
- **Data Persistence**: Local storage integration

### Mobile Development

This module covers mobile-specific development:
- **Responsive Design**: Adaptive layouts for different screen sizes
- **Touch Interactions**: Gesture handling and touch feedback
- **Platform APIs**: Device-specific functionality
- **Performance Optimization**: Memory management and rendering
- **Offline Support**: Cached data and offline functionality
- **Push Notifications**: Real-time user engagement

## Technologies Used

### Frontend
- **React Native 0.81.4**
- **Expo ~54.0.13**
- **React Navigation 7.x**
- **React 19.1.0**
- **TypeScript ~5.9.2**
- **Expo Router ~6.0.11**

### Backend
- **Node.js**
- **Express.js 5.1.0**
- **MongoDB with Mongoose 8.19.1**
- **CORS 2.8.5**
- **bcrypt 6.0.0**
- **dotenv 17.2.3**

### Development Tools
- **Expo CLI**
- **ESLint 9.25.0**
- **TypeScript 5.9.2**
- **Git**

## Development Workflow

### For Development

1. **Start Backend Server**: Run `node server.js` in backend directory
2. **Start Expo Development Server**: Run `npm start` in main directory
3. **Test on Device**: Use Expo Go app to scan QR code
4. **Code Changes**: Files automatically reload when modified

### For Production

1. **Build Mobile Apps**: Use `expo build` commands
2. **Deploy Backend**: Deploy to cloud platform (Heroku, AWS, etc.)
3. **Environment Setup**: Configure production API endpoints
4. **App Store Submission**: Submit to iOS App Store and Google Play Store

## Learning Path

### Beginner Level
1. Start with `app/src/screens/` to understand screen structure
2. Explore `app/src/components/` to learn component patterns
3. Study navigation in `app/src/navigations/`

### Intermediate Level
1. Implement CRUD operations in screen components
2. Add form validation and error handling
3. Create custom hooks for reusable logic

### Advanced Level
1. Add state management with Context API or Redux
2. Implement advanced navigation patterns
3. Add testing and deployment configurations
4. Optimize performance with React.memo and useMemo

## Best Practices Demonstrated

- **Component Composition**: Reusable and maintainable components
- **Hook Usage**: Proper useState and useEffect implementation
- **Error Handling**: Comprehensive error catching and user feedback
- **Security**: Input validation and secure authentication
- **Performance**: Efficient re-rendering and data fetching
- **Code Organization**: Consistent naming conventions and structure
- **Documentation**: Clear code comments and README
- **Version Control**: Proper Git workflow and commit messages
- **Mobile UX**: Touch-friendly interfaces and gestures
- **Cross-Platform**: Platform-specific optimizations

## API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users/profile` - Get user profile (with token)

### Product Management
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart Management
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart

### Wishlist Management
- `GET /api/wishlist/:userId` - Get user's wishlist
- `POST /api/wishlist/add` - Add item to wishlist
- `DELETE /api/wishlist/remove` - Remove item from wishlist

## Application Routes

### Tab Navigation
- `/` - Home screen (product listings)
- `/explore` - Explore screen (categories)

### Stack Navigation
- `/product/:id` - Product detail screen
- `/search` - Search screen
- `/cart` - Shopping cart screen
- `/wishlist` - Wishlist screen
- `/account` - User account screen

### Modal Screens
- `/modal` - Modal screen for overlays

## Authentication Flow

1. **Registration Process**:
   - User enters credentials on registration screen
   - System validates and creates new user account
   - JWT token generated and stored
   - User redirected to home screen

2. **Login Process**:
   - User enters credentials on login screen
   - System validates with backend API
   - JWT token stored in AsyncStorage
   - User redirected to home screen

3. **Session Management**:
   - Token checked on app initialization
   - Automatic login if valid token exists
   - Logout clears AsyncStorage and redirects

4. **Route Protection**:
   - Authentication state managed in navigation
   - Conditional rendering based on login status
   - Protected routes require authentication

## Troubleshooting

- **Expo Connection**: Ensure device and computer are on same network
- **Metro Bundler**: Clear cache with `expo start -c` if issues occur
- **Dependencies**: Run `npm install` if modules are missing
- **Backend Connection**: Ensure backend server is running on correct port
- **Authentication**: Check AsyncStorage for token storage issues
- **Navigation**: Ensure React Navigation is properly configured
- **Console Errors**: Check terminal and device console for error messages
- **Build Issues**: Clear node_modules and reinstall dependencies

## Contributing

This is a learning project designed for educational purposes. Feel free to:
- Modify examples to experiment with different approaches
- Add new features and functionality
- Improve documentation and comments
- Share your learning experiences
- Report bugs and suggest improvements

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Expo Router Documentation](https://expo.github.io/router/)

For questions or contributions, please open an issue or pull request on the GitHub repository.

## License

This project is licensed under the ISC License - see the LICENSE file for details.