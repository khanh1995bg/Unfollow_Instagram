import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BaseImageFlatlist from 'libraries/components/LikeComent/BaseImageFlatlist';
import { NumberLike } from 'libraries/components/ConvertNumber';


class ListLikeItem extends Component {

    render() {
        const { item, index } = this.props;
        let numberCount = NumberLike(item.like_count);
        let numberComment = NumberLike(item.comment_count);

        let image =  item && item.image_versions2 && item.image_versions2.candidates ? item.image_versions2.candidates.map(item => item.url) : `https://www.google.com/search?q=girl&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj33Z-_5ejhAhUmyIsBHSATAQQQ_AUIDigB&biw=1799&bih=823#imgrc=1zN0_Fg3-e8DFM:`;
        if (item.status_check === true) {
            return <BaseImageFlatlist
                chooseItem
                chooseStyle
                image={{uri: image[0]}}
                numberLike={numberCount}
                numberComent={numberComment}
                onPress={this.props.onChooseItem(index)}
            />
        } else {
            return <BaseImageFlatlist
                 image={{uri: image[0]}}
                numberLike={numberCount}
                numberComent={numberComment}
                onPress={this.props.onChooseItem(index)}
            />
        }
        
    }
}

export default ListLikeItem;
