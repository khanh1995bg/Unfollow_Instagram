import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import R from 'res/R';
import FastImage from 'react-native-fast-image';

class ContentFlatlist extends PureComponent {
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image source>
            <View style={[styles.viewImage, this.props.viewImage]}>
              <FastImage style={[styles.logoStyle, this.props.logoStyle]} source={{ uri: this.props.image }} resizeMode={FastImage.resizeMode.cover} />
              {this.props.chooseAvatar ? <View style={styles.viewStyle} /> : null}
            </View>
          </Image>

          <Text style={[styles.nameStyle, this.props.nameStyle]}>{this.props.name}</Text>
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
//   viewImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 60 / 2,
//     borderWidth: 0.5,
//     borderColor: R.colors.white100
//   },
  logoStyle: {
    width: 59,
    height: 59,
    borderRadius: 59 / 2
  },
  viewStyle: {
    width: 59,
    height: 59,
    borderRadius: 59 / 2,
    backgroundColor: R.colors.primaryColor,
    position: 'absolute',
    opacity: 0.5
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
