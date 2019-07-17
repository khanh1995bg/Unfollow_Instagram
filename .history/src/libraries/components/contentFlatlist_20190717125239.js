import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import R from 'res/R';
import FastImage from 'react-native-fast-image';

class ContentFlatlist extends PureComponent {
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.wrapper}>
            
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
    textAlign: 'center'
  }
});

export default ContentFlatlist;
