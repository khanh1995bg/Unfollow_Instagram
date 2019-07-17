import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import R from 'res/R';

const { width, height } = Dimensions.get('window');

export default class LayoutImageScreen extends PureComponent {

    render() {
        return (
            <View style={styles.viewImage}>
                <FastImage
                    style={styles.imageStyle}
                    source={R.images.im_bg}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <FastImage
                    style={styles.logoStyle}
                    source={R.images.logo_app}
                    resizeMode={FastImage.resizeMode.cover}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewImage: {
        width: width,
        height: height / 2,
    },

    imageStyle: {
        width: '100%',
        height: '100%',
    },
    logoStyle: {
        position: 'absolute',
        top: height/4,
        left: width * 0.3  ,
        width: 150,
        height: 150
    }
})
