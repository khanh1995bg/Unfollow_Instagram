import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentFlatlist from 'libraries/components/contentFlatlist';
import R from 'res/R';

class ListFollowerItem extends Component {

    render() {
        const { item, index } = this.props
        if (item.status_check === true) {
            return <ContentFlatlist
                chooseAvatar
                image={item.profile_pic_url}
                name={item.username}
                onPress={this.props.onChooseItem(index)}
                viewImage={styles.viewImage}
            />
        } else {
            return <ContentFlatlist
                image={item.profile_pic_url}
                name={item.username}
                onPress={this.props.onChooseItem(index)}
            />
        }

    }
}

const styles = StyleSheet.create({
    viewImage: {
        borderColor: R.colors.primaryColor,
    }
})

export default ListFollowerItem;
