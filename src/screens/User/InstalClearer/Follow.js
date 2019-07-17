import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import R from 'res/R';

class Follow extends PureComponent {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>{this.props.text}</Text>
                <Text style={[styles.textStyle, {paddingTop: 5}]}>{this.props.number}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: R.colors.blackColor,
        fontSize: 13
    }
})

export default Follow;
