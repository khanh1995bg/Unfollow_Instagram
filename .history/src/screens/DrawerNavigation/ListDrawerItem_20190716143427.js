import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import R from 'res/R';

class ListDrawerItem extends Component {

    render() {
        const { item, activeItemKey } = this.props;
        return (
            <View style={item.name !== activeItemKey ? styles.viewLable: styles.viewLableChoose}>
                <TouchableOpacity onPress={this.props.onChooseScreen(item)}>
                    <View style={styles.viewMenu}>
                        <Image source={item.icon} style={styles.iconStyle}  re/>
                        <Text style={styles.link}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewLable: {
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.primaryColor,
    },
    viewLableChoose: {
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.primaryColor,
        backgroundColor: R.colors.primaryColor
    },
    viewMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    link: {
        fontSize: 14,
        paddingVertical: 25,
        paddingLeft: 15,
        color: R.colors.white100
    },
    iconStyle: {
        width: 18,
        height: 18
    },
})

export default ListDrawerItem;
