import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import Header from 'libraries/components/Header';
import database from 'libraries/utils/database';

export default class GetStartedScreen extends Component {
    render() {
        return (
            <Container>
                <Header 
                    text={database}
                />
            </Container>
        )
    }
}
 