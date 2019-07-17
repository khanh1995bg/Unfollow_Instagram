import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './Login/LoginScreen';
import WelcomeScreen from './Welcome/WelcomeScreen';
import NameScreen from './Register/NameScreen';
import EmailScreen from './Register/EmailScreen';
import PasswordScreen from './Register/PasswordScreen';
import ForgotPasswordScreen from './ForgotPassword/ForgotPasswordScreen';
import PhoneNumberScreen from './PhoneAuth/PhoneNumberScreen';
import ConfirmationCodeScreen from './PhoneAuth/ConfirmationCodeScreen';

const AuthNavigator = createStackNavigator({
    WelcomeScreen: { screen: WelcomeScreen },
    PhoneNumberScreen: { screen: PhoneNumberScreen },
    LoginScreen: {screen: LoginScreen},
    NameScreen: {screen: NameScreen},
    EmailScreen: {screen: EmailScreen},
    PasswordScreen: {screen: PasswordScreen},
    ForgotPasswordScreen: {screen: ForgotPasswordScreen},
    ConfirmationCodeScreen: {screen: ConfirmationCodeScreen},
},
    {
        headerMode: 'none'
    }
)

export default AuthNavigator;
