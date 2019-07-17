import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import R from 'res/R';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';

class ContentFlatlist extends PureComponent {
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.wrapper}>
            <View style={styles.viewInfo}>
              <ImageBackground source={R.images.circle} style={styles.viewImage}>
                <FastImage style={[styles.logoStyle, this.props.logoStyle]} source={{ uri: this.props.image }} resizeMode={FastImage.resizeMode.cover} />
              </ImageBackground>
              <Text style={[styles.nameStyle, this.props.nameStyle]}>{this.props.name}</Text>
            </View>
            <View style={styles.viewInfo}>
                <FlatList
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
    borderBottomColor: R.colors.greyColor,
    borderBottomWidth: 0.5
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
  },
  viewInfo:{
    flexDirection: 'row'
  },    
  viewImage: {
    width: 60,
    height: 60
  },
  logoStyle: {
    width: 59,
    height: 59,
    borderRadius: 59 / 2
  },

  nameStyle: {
    color: R.colors.blackColor,
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 10
  }
});

export default ContentFlatlist;
