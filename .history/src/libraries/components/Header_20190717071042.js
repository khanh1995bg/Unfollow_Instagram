import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import R from 'res/R';
import NavigationService from 'routers/NavigationService';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const { width } = Dimensions.get('window');

class Header extends PureComponent {
    render() {
        return (
            
        );
    }
    onDrawer = () => {
        this.props.navigation.toggleDrawer();
    }
    onBack = () => {
       NavigationService.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewText: {
        width: width - 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        color: R.colors.blackColor,
        fontSize: 22,
        fontWeight: '500'
    },
    countSelectStyle: {
        flexDirection: 'row'
    },
    countTotalStyle: {
        fontSize: 14,
        color: R.colors.white100,
    }
})
export default Header;
