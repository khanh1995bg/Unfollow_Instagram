import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

class BaseIconLike extends PureComponent {
    render() {
        return (
            <View style={[styles.container, this.props.iconStyle]}>
                <Text style={styles.nameStyle}>{this.props.name}</Text>
                <FastImage
                    style={styles.icon}
                    source={this.props.icon}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        position: 'absolute', 
        bottom: 2, 
        alignItems: 'center',
    },
    nameStyle: {
        color: 'white', 
        fontSize: 12, 
        paddingHorizontal: 5
    },
    icon: {
        width: 12,
        height: 12,
    },

})

export default BaseIconLike;
