import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import R from 'res/R';
import FastImage from 'react-native-fast-image';

class ContentFlatlist extends PureComponent {
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity onPress={this.props.onPress}>
         <view></view>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10
  },
  viewImage: {
    width: 60,
    height: 60,
  },
  logoStyle: {
    width: 59,
    height: 59,
    borderRadius: 59 / 2
  },

  nameStyle: {
    color: R.colors.white100,
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center'
  }
});

export default ContentFlatlist;