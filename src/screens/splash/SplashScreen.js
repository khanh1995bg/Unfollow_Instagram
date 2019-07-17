import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import database from 'libraries/utils/database';
import NavigationService from 'routers/NavigationService';
import FastImage from 'react-native-fast-image';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import LayoutImageScreen from 'libraries/components/LayoutImageScreen';
import LoadingView from 'libraries/components/LoadingView';
import apis from 'libraries/networking/apis';
import { Status } from 'libraries/networking/status';

class SplashScreen extends Component {

    state = { loadding: true }

    render() {
        return (
            <Container>
                <LayoutImageScreen />
            </Container>
        );
    }

    async componentDidMount() {


        let account = await database.get(database.KEY.KEY_USER_TEST);
        let token = await database.get(database.KEY.KEY_USER_TOKEN);

        if (!account) {
            setTimeout(() => {
                NavigationService.reset('WelcomeScreen')
            }, 1000)
            return
        }

        // let newUser = JSON.parse(account);


        // let objectUser = {
        //     username: newUser.username,
        //     password: newUser.password
        // }
        if (token) {
            database.tokenCache = token;

            apis.fetch(apis.PATH.USER_INFO, null, database.tokenCache).then(response => {
                if (response.code == Status.SUSSESS) {
                    database.save(database.KEY.INFO_USER, JSON.stringify(response.data.user));
                    this.navigate(account)
                } else {
                    this.navigate(null)
                }

            }).catch(error => {
                this.navigate(null)
            })
        }
    }

    navigate = (account) => {
        try {
            if (account) {
                let newAccount = JSON.parse(account);

                database.user = newAccount;
                NavigationService.reset('Main')
            } else {
                NavigationService.reset('WelcomeScreen')
            }
        } catch (error) {
            NavigationService.reset('WelcomeScreen')
        }
    }
}

export default SplashScreen;
