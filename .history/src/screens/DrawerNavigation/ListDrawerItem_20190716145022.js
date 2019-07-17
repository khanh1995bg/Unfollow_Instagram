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
                        <Image source={item.icon} style={styles.iconStyle}  resizeMode="contain"/>
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
        borderBottomColor: R.colors.greyColor,
    },
    viewLableChoose: {
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.greyColor,
        backgroundColor: R.colors.white100
    },
    viewMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    link: {
        fontSize: 16,
        paddingVertical: 25,
        paddingLeft: 15,
        color: '#000'
    },
    iconStyle: {
        width: 18,
        height: 18
    },
})

export default ListDrawerItem;
