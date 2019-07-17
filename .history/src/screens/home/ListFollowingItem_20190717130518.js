import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentFlatlist from 'libraries/components/contentFlatlist';
import R from 'res/R';

class ListFollowingItem extends Component {

    render() {
        const { item, index, onChooseAvatar } = this.props;
        if(item.status_check === true) {
            return (
                <ContentFlatlist
                    image={item.profile_pic_url}
                    name={item.username}
                    onPress={onChooseAvatar(index)}
                    chooseAvatar
                    containerStyle={styles.containerStyle}
                />
            )
        }else{
            return (
                <ContentFlatlist
                    image={item.profile_pic_url}
                    name={item.username}
                    onPress={onChooseAvatar(index)}
                    
                />
            )
        }
        
    }
}
const styles = StyleSheet.create({
    containerStyle: {
        borderColor: R.colors.primaryColor,
    }
})

export default ListFollowingItem;
