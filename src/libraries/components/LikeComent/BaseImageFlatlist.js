import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import R from 'res/R';
import BaseIconLike from './BaseIconLike';

const { width, height } = Dimensions.get('window');

class BaseImageFlatlist extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.props.onPress}
                >
                    <View style={styles.wrapper}>
                        <FastImage
                            style={styles.logoStyle}
                            source={this.props.image}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <View  style={ this.props.chooseStyle ? styles.contentChoose : styles.contentStyle} />
                        <View style={{ flexDirection: 'row'}}>
                            <BaseIconLike name={this.props.numberLike} icon={R.images.ic_heart}/>
                            <BaseIconLike name={this.props.numberComent} icon={R.images.ic_message} iconStyle={styles.iconStyle} />
                        </View>
                    </View>
                    {this.props.chooseItem ? <View style={styles.wrapperChoose} /> : null}
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1/3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        width: width / 3 - 3,
        height: width / 3 - 3,
        marginBottom: 3,
    },
    wrapperChoose: {
        width: width / 3 - 3,
        height: width / 3 - 3,
        marginBottom: 3,
        position: 'absolute',
        backgroundColor: R.colors.primaryColor,
        opacity: 0.5
    },
    logoStyle: {
        width: width / 3 - 3,
        height: width / 3 - 3,
    },
    contentStyle: {
        width: '100%',
        backgroundColor: '#000',
        height: 20,
        position: 'absolute',
        bottom: 0,
        opacity: 0.4
    },
    contentChoose: {
        width: '100%',
        backgroundColor: R.colors.primaryColor,
        height: 20,
        position: 'absolute',
        bottom: 0,
        opacity: 0.4
    },
    iconStyle: {
        left: 55
    }
})

export default BaseImageFlatlist;
