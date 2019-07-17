import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import R from 'res/R';

class ButtonHeaderUser extends PureComponent {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
            >
                <Text style={[styles.textButtonStyle, this.props.style]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    textButtonStyle: {
        color: R.colors.white100,
        fontSize: 16,
        paddingTop: 3,
    },
})

export default ButtonHeaderUser;
