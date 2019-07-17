import React, { Component } from 'react';
import { Text, View, Sty} from 'react-native';
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

    return (
      <Container>
        <Header menu text={infoUser ? infoUser.full_name : ''} />
        <View>
          <View style={styles.viewImage}>
            <FastImage style={styles.logoStyle} source={newImage} resizeMode={FastImage.resizeMode.cover} />
          </View>
        </View>
      </Container>
    );
  }
}
