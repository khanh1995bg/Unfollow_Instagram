import React, { PureComponent } from 'react';
import { ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const {height} = Dimensions.get('window');

export default class LoadingView extends PureComponent {

    render() {
        return (
            <ActivityIndicator
                size='large'
                color={R.colors.white100}
                style={[styles.container, this.props.styles]}
            />
        );
    }

}
const styles = StyleSheet.create({
    container: {
        marginTop: height/3,
        alignItems: 'center',
        justifyContent: 'center',
    }
})