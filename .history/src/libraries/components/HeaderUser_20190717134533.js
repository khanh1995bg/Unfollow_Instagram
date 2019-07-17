import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import R from 'res/R';
import ButtonHeaderUser from './ButtonHeaderUser';

class HeaderUser extends PureComponent {
 
    render() {
        return (
            <View style={styles.container}>
                <ButtonHeaderUser text={this.props.textLeft} onPress={this.props.onButtonLeft}/>
                <Text style={styles.textStyle}>{this.props.textTitle}</Text>
                <ButtonHeaderUser text={this.props.textRight} style={this.props.textButtonStyle} onPress={this.props.onButtonRight}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 40,
        marginHorizontal: 10,
    },
    textButtonStyle: {
        color: R.colors.blackColor,
        fontSize: 16,
        paddingTop: 3,
    },
    textStyle: {
        color: R.colors.blackColor,
        fontSize: 20
    }
})
export default HeaderUser;
