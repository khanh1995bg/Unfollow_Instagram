import { createSwitchNavigator, createAppContainer } from 'react-navigation';
// import AuthNavigator from 'libraries/components/AuthTemplate/Airbnb/AuthNavigator';
import StackNavigator from './MainNavigator';

const mainStack = createSwitchNavigator({
    // Auth: AuthNavigator,
    Main: StackNavigator,
})
const MainNavigation = createAppContainer(mainStack);
export default MainNavigation;
