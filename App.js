import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './app/screens/HomeScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import LoginScreen from './app/screens/LoginScreen';

const RootStack = createStackNavigator({
  SignUp: {
    screen: SignUpScreen
  },
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: HomeScreen
  }
});

const App = createAppContainer(RootStack);

export default App;