import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import Header from 'libraries/components/Header';
import database from 'libraries/utils/database';
import R from 'res/R';

const { width, height } = Dimensions.get('window');

export default class GetStartedScreen extends Component {
  state = {
    infoUser: [],
    data: [
      {
        id: 0,
        icon: R.images.ic_following,
        title: 'FOLLOWING',
        total: 63
      },
      {
        id: 1,
        icon: R.images.ic_follower,
        title: 'FOLLOWERS',
        total: 63
      },
      {
        id: 2,
        icon: R.images.ic_like,
        title: 'LIKES',
        total: 63
      },
      {
        id: 3,
        icon: R.images.ic_media,
        title: 'MEDIA',
        total: 63
      },
      {
        id: 4,
        icon: R.images.ic_more,
        title: 'MORE',
      }
    ]
  };
  async componentDidMount() {
    let user = await database.get(database.KEY.INFO_USER);
    let newUser = JSON.parse(user);

    this.setState({ infoUser: newUser });
  }
  render() {
    console.log(this.state.infoUser, database.user.name, 'infoUserinfoUser');
    let { infoUser } = this.state;
    let newImage = R.images.im_person;
    if (infoUser && infoUser.profile_pic_url) {
      newImage = {
        uri: infoUser.profile_pic_url
      };
    }
    return (
      <Container>
        <Header
          user
          menu
          text={infoUser ? infoUser.full_name : ''}
          totalFollowing={infoUser && infoUser.following_count ? infoUser.following_count : 0}
          totalFollowers={infoUser && infoUser.follower_count ? infoUser.follower_count : 0}
          avatar={newImage}
          containerStyle={{ zIndex: 2 }}
        />
        <View style={{ flex: 1, backgroundColor: '#FFC400', zIndex: 1, paddingTop: 50 }}>
          <FlatList data={this.state.data} extraData={this.state} keyExtractor={this.keyExtractor} renderItem={this.renderItem} numColumns={2}/>
        </View>
      </Container>
    );
  }
  keyExtractor = item => item.id.toString();
  renderItem = ({ item }) => {
    return <View style={styles.container}>
        <Image source={item.icon} style={{width: 35, height: 35,}} resizeMode='contain'/>
        <Text style={{paddingTop: 10, fontSize: 14}}>{item.title}</Text>
        <Text style={{paddingTop: 10, fontSize: 18, fontWeight: '500'}}>{item.total}</Text>
    </View>;
  };
}

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 30,
    height: width / 2 - 50,
    borderRadius: 5,
    backgroundColor: R.colors.white100,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 0.2,
    marginLeft: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
