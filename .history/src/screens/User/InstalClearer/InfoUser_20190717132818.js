import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import R from 'res/R';
import FastImage from 'react-native-fast-image';
import Follow from './Follow';

class InfoUser extends PureComponent {

    render() {
        const {infoUser} = this.props;

        let newImage = R.images.im_person;
        if (infoUser && infoUser.profile_pic_url) {
            newImage = {
                uri: infoUser.profile_pic_url
            }
        }
        return (
            <View>
                <View style={styles.infoStyle}>
                    <Follow
                        text="Following"
                        number={infoUser && infoUser.following_count ? infoUser.following_count : 0}
                    />
                    <View style={styles.viewImage}>
                        <FastImage
                            style={styles.imageStyle}
                            source={newImage}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text style={styles.textStyle}>{infoUser && infoUser.full_name ? infoUser.full_name : null}</Text>
                    </View>

                    <Follow
                        text="Follower"
                        number={ infoUser && infoUser.follower_count ? infoUser.follower_count : 0}
                    />
                </View>
                <TouchableOpacity
                    onPress={this.props.onDetailInfo}
                >
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.textStyle}>Account manager</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

   
}

const styles = StyleSheet.create({
    infoStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.coalGreen,
        back
    },
    viewImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    textStyle: {
        color: R.colors.blackColor,
        paddingTop: 10,
        fontWeight: '500',
    }

})

export default InfoUser;
