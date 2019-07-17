import React from 'react';
import { Dimensions } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import SplashScreen from 'screens/splash/SplashScreen';
import LoginScreen from 'screens/Login/LoginScreen';
import DrawerNavigationScreen from 'screens/DrawerNavigation/DrawerNavigationScreen';
import HomeScreen from 'screens/home/HomeScreen';
import FollowerScreen from 'screens/Follower/FollowerScreen';
import LikeScreen from 'screens/Like/LikeScreen';
import MediaScreen from 'screens/Media/MediaScreen';
import UserScreen from 'screens/User/UserScreen';
import InstalClearerScreen from 'screens/User/InstalClearer/InstalClearerScreen';
import UpgradeInfoScreen from 'screens/User/InstalClearer/UpgradeInfo/UpgradeInfoScreen';
import InAppPurchaseScreen from 'screens/InAppPurchase/InAppPurchaseScreen';
import WelcomeScreen from 'screens/Welcome/WelcomeScreen';
import BlockUserScreen from 'screens/User/BlockUser/BlockUserScreen';
import WhitelistScreen from 'screens/User/Whitelist/WhitelistScreen';
import TermsOfService from 'screens/InAppPurchase/TermsOfService';
import PrivacyPolicy from 'screens/InAppPurchase/PrivacyPolicy';
import UserGuide from 'screens/User/UserGuide';
import RegisterScreen from 'screens/Register/RegisterScreen';

const { width, height } = Dimensions.get('window');


const DrawerConfig = {
    drawerWidth: width * 0.75,
    contentComponent: props => {
        return(<DrawerNavigationScreen {...props} />)
    },
}

const drawer = createDrawerNavigator({
    Following: { screen: HomeScreen },
    Follower: { screen: FollowerScreen },
    Like: { screen: LikeScreen },
    Media: { screen: MediaScreen },
    More: { screen: InstalClearerScreen }
},
    DrawerConfig

);

const StackNavigator = createStackNavigator({
    SplashScreen: { screen: SplashScreen },
    WelcomeScreen: { screen: WelcomeScreen },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    
    Main: drawer,
    BlockUserScreen: { screen: BlockUserScreen },
    UserScreen: { screen: UserScreen },
    UpgradeInfoScreen: { screen: UpgradeInfoScreen },
    InAppPurchaseScreen: { screen: InAppPurchaseScreen },
    WhitelistScreen: { screen: WhitelistScreen },
    TermsOfService: { screen: TermsOfService },
    PrivacyPolicy: { screen: PrivacyPolicy },
    UserGuide: { screen: UserGuide },

},
    {
        headerMode: 'none'
    }
)

export default StackNavigator;
