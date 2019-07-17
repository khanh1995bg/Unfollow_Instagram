import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import Header from 'libraries/components/Header';
import database from 'libraries/utils/database';

export default class GetStartedScreen extends Component {
    state = {
        infoUser: []
    }
    async componentDidMount() {
        let user = await database.get(database.KEY.INFO_USER);
        let newUser = JSON.parse(user);
    
        this.setState({ infoUser: newUser });
      }
    render() {
        console.log(object);
        return (
            <Container>
                <Header 
                    text={database.user.name}
                />
            </Container>
        )
    }
}
 