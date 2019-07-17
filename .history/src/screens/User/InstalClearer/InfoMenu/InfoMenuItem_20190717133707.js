import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import R from 'res/R';

class InfoMenuItem extends PureComponent {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.props.onPress}
                >
                    <View style={styles.viewText}>
                        <Text style={styles.textStyle}>{this.props.text}</Text>
                        {this.props.content ? <Text style={styles.contentStyle}>{this.props.contentText}</Text> : null}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.coalGreen,
        marginLeft: 15,
    },
    viewText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle: {
        color: R.colors.bla,
        paddingVertical: 15,
    },
    contentStyle: {
        color: R.colors.greyColor,
        paddingRight: 15,
    }
})

export default InfoMenuItem;
