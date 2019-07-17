import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import R from 'res/R';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'

class Container extends PureComponent {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <StatusBar
                    barStyle='light-content'
                />
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: R.colors.roughBlack,
        paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : 0,
    }
});

export default Container;
