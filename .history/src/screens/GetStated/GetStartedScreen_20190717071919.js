import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import Header from 'libraries/components/Header';
import database from 'libraries/utils/database';

export default class GetStartedScreen extends Component {
  state = {
    infoUser: []
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
            totalFollowing={}
            totalFollowers
            avatar={newImage}
        />
      </Container>
    );
  }
}

