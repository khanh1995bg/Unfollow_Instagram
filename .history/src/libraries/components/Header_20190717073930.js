import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import R from 'res/R';
import NavigationService from 'routers/NavigationService';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');

class Header extends PureComponent {
  render() {
    return (
      <View>
        <View style={[styles.container, this.props.headerStyle]}>
          {this.props.menu ? (
            <TouchableOpacity onPress={this.onDrawer}>
              <View style={styles.viewIcon}>
                <Image source={R.images.ic_menu} style={{ width: 18, height: 18 }} />
              </View>
            </TouchableOpacity>
          ) : null}
          {this.props.back ? (
            <TouchableOpacity onPress={this.onBack}>
              <View style={[styles.viewIcon, { marginTop: 3 }]}>
                <Icon name="ios-arrow-back" size={25} color={R.colors.primaryColor} />
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.viewText}>
            <Text style={styles.titleStyle}>{this.props.text}</Text>
          </View>
          {this.props.showCount ? (
            <View style={styles.countSelectStyle}>
              <Text style={styles.countTotalStyle}>{this.props.countSelect}</Text>
              <Text style={styles.countTotalStyle}>/</Text>
              <Text style={styles.countTotalStyle}>{this.props.countTotal}</Text>
            </View>
          ) : null}
        </View>
        {this.props.user ? (
          <View style={styles.viewInfo}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 19}}>{this.props.totalFollowing}</Text>
              <Text>Following</Text>
            </View>
            <View style={styles.viewImage}>
              <FastImage style={styles.logoStyle} source={this.props.avatar} resizeMode={FastImage.resizeMode.cover} />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 19}}>{this.props.totalFollowers}</Text>
              <Text>Followers</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
  onDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  onBack = () => {
    NavigationService.pop();
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2000
  },
  viewIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewText: {
    width: width - 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    color: R.colors.blackColor,
    fontSize: 22,
    fontWeight: '500'
  },
  countSelectStyle: {
    flexDirection: 'row'
  },
  countTotalStyle: {
    fontSize: 14,
    color: R.colors.white100
  },
  viewInfo: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingBottom: 10, 
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: R.colors.greyColor,
    // shadowColor: '#000',
    // shadowOffset: { width: 2, height: 4 },
    // shadowOpacity: 0.8,
    // elevation: 0.5,
    
  },
  viewImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderWidth: 0.5,
    borderColor: R.colors.white100,
    position: 'absolute',
    top: 20,
    left: width/2 - 40,
   
  },
  logoStyle: {
    width: 59,
    height: 59,
    borderRadius: 59 / 2
  }
});
export default Header;
