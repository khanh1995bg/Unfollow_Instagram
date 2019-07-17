import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Platform, Image, ScrollView, FlatList, Alert } from 'react-native';
import R from 'res/R';
import NavigationService from 'routers/NavigationService';
import FastImage from 'react-native-fast-image';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LoginButton from 'libraries/components/AuthTemplate/Airbnb/Welcome/LoginButton';
import ListDrawerItem from './ListDrawerItem';
import apis from 'libraries/networking/apis';
import database from 'libraries/utils/database';
const { width, height } = Dimensions.get('window');

class DrawerNavigationScreen extends Component {
  state = {
    activeItemKey: this.props.activeItemKey,
    data: [
      {
        id: 0,
        name: 'Feedback',
        icon: R.images.ic_feedback,
        title: 'Feedback'
      },
      {
        id: 1,
        name: 'Follower',
        icon: R.images.ic_privacy,
        title: 'Follower'
      },
      {
        id: 2,
        name: 'Like',
        icon: R.images.ic_term,
        title: 'Like'
      },
      {
        id: 3,
        name: 'Media',
        icon: R.images.ic_rate,
        title: 'Media'
      }
      // {
      //     id: 4,
      //     name: 'More',
      //     icon: R.images.ic_more,
      //     title: 'More'
      // },
    ],
    infoUser: {}
  };

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => {
    return <ListDrawerItem item={item} onChooseScreen={this.onChooseScreen} activeItemKey={this.state.activeItemKey} />;
  };
  render() {
    const { infoUser } = this.state;
    let newImage = R.images.im_person;
    if (infoUser && infoUser.profile_pic_url) {
      newImage = {
        uri: infoUser.profile_pic_url
      };
    }
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.viewLogo}>
            <Text style={styles.textMenu}>LOGO</Text>
          </View>

          <View style={{ flexDirection: 'row',  backgroundColor: R.colors.roughBlack }}>
            <View style={styles.viewImage}>
              <FastImage style={styles.logoStyle} source={newImage} resizeMode={FastImage.resizeMode.cover} />
            </View>
            <View style={styles.viewAccount}>
              <Text style={styles.nameStyle}>{infoUser && infoUser.full_name ? infoUser.full_name : null}</Text>
              <View style={styles.viewFollow}>
                <Text style={styles.FollowinfStyle}>Following: {infoUser && infoUser.following_count ? infoUser.following_count : 0}</Text>
                <Text style={styles.FollowinfStyle}>Follower: {infoUser && infoUser.follower_count ? infoUser.follower_count : 0}</Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView style={styles.viewScroll}>
          <FlatList data={this.state.data} keyExtractor={this._keyExtractor} extraData={this.state} renderItem={this._renderItem} />

          <View style={styles.viewButton}>
            <LoginButton textButton="Log out" containerStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.onAlertLogout} />
          </View>
        </ScrollView>
      </View>
    );
  }

  async componentDidMount() {
    let user = await database.get(database.KEY.INFO_USER);
    let newUser = JSON.parse(user);

    this.setState({ infoUser: newUser });
  }

  //fill màu button và điều hướng
  onChooseScreen = item => () => {
    NavigationService.navigate(item.name);
    this.setState({ activeItemKey: item.name });
  };

  onAlertLogout = () => {
    Alert.alert('Confirm', 'Logout all accounts?', [{ text: 'Cancel' }, { text: 'Yes', onPress: this.onLogout }], { cancelable: false });
  };

  onLogout = () => {
    database.user = {};
    database.info_user = {};
    database.tokenCache = '';
    database.save(database.KEY.KEY_USER, '');
    database.save(database.KEY.KEY_USER_TOKEN, '');
    database.save(database.KEY.INFO_USER, '');
    database.save(database.KEY.UNLOCKED_ALL_FEATURES, 'false');
    database.unlockedAllFeatures = false;

    NavigationService.navigate('WelcomeScreen');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.white100,
    // paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0
  },
  topLinks: {
    height: 160
  },

  wrapper: {
    borderBottomWidth: 0.5,
    borderBottomColor: R.colors.greyColor
  },
  viewImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 0.5,
    borderColor: R.colors.white100,
    marginVertical: 15,
    marginLeft: 15,
   
  },
  logoStyle: {
    width: 59,
    height: 59,
    borderRadius: 59 / 2
  },
  viewLogo: {
    paddingVertical: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: R.colors.greyColor,
    backgroundColor: R.colors.roughBlack
  },
  textMenu: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '400',
    color: R.colors.blackColor,
    paddingTop: 20
  },
  viewAccount: {
    justifyContent: 'flex-end',
    marginBottom: 22,
    marginLeft: 15
  },
  nameStyle: {
    fontSize: 17,
    color: R.colors.blackColor,
    fontWeight: '500'
  },
  viewFollow: {
    flexDirection: 'row',
    paddingTop: 10
  },
  FollowinfStyle: {
    fontSize: 13,
    color: R.colors.blackColor,
    paddingRight: 30
  },
  buttonStyle: {
    backgroundColor: R.colors.roughBlack,
    borderColor: R.colors.roughBlack,
    borderWidth: 1,
    borderRadius: 7,
    width: width * 0.85 - 70
  },
  textStyle: {
    color: R.colors.white100
  },
  viewButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 40
  },

  viewScroll: {
    marginBottom: 30
  }
});

export default DrawerNavigationScreen;
