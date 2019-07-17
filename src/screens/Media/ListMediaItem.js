import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BaseImageFlatlist from 'libraries/components/LikeComent/BaseImageFlatlist';
import { NumberLike } from 'libraries/components/ConvertNumber';

class ListMediaItem extends Component {

    render() {
        const { item, index } = this.props;
        let image = item.image_versions2.candidates.map(item => item.url)

        let numberCount = NumberLike(item.like_count);
        let numberComment = NumberLike(item.comment_count);

        if (item.status_check === true) {
            return <BaseImageFlatlist
                chooseItem
                chooseStyle
                image={{ uri: image[0] }}
                numberLike={numberCount}
                numberComent={numberComment}
                onPress={this.props.onChooseItem(index)}
            />
        } else {
            return <BaseImageFlatlist
                image={{ uri: image[0] }}
                numberLike={numberCount}
                numberComent={numberComment}
                onPress={this.props.onChooseItem(index)}
            />
        }
    }
}

export default ListMediaItem;
