# 👟 KickzStore
**KickzStore** is a modern React Native e-commerce mobile application specializing in footwear retail. Built with Expo and React Native, this full-stack application provides a complete shopping experience for sneaker enthusiasts and shoe lovers. The app features a sleek, mobile-optimized interface with real-time product browsing, detailed product views, intelligent search functionality, and seamless navigation.

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

## Technologies
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