import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import HeaderUser from 'libraries/components/HeaderUser';
import R from 'res/R';
import LoginButton from 'libraries/components/AuthTemplate/Airbnb/Welcome/LoginButton';
import NavigationService from 'routers/NavigationService';
import FastImage from 'react-native-fast-image';
import database from 'libraries/utils/database';

class UserScreen extends PureComponent {

    render() {
        const { infoUser} = this.props.navigation.state.params;

        let newImage = R.images.im_person;
        if (infoUser && infoUser.profile_pic_url) {
            newImage = {
                uri: infoUser.profile_pic_url
            }
        }
        return (
            <Container>
                <HeaderUser
                    textLeft="Add"
                    textRight="Close"
                    textTitle='User'
                    onButtonLeft={this.onButtonLeft}
                    onButtonRight={this.onButtonRight}
                />

               
            </Container>
        )
    }
    onButtonLeft = () => {
        NavigationService.navigate('LoginScreen', {key: 'AddAccount'})
    }

    onButtonRight = () => {
        NavigationService.navigate('More');
    }

    onAlertLogout = () => {
        Alert.alert(
            'Confirm',
            'Logout all accounts?',
            [
                { text: 'Cancel' },
                { text: 'Yes', onPress: this.onLogout },
            ],
            { cancelable: false }
        )
    }

    onLogout = () => {
        database.user = {};
        database.info_user = {};
        database.save(database.KEY.KEY_USER, '');
        database.save(database.KEY.INFO_USER, '');
        database.save(database.KEY.UNLOCKED_ALL_FEATURES, 'false');
        database.unlockedAllFeatures = false
        NavigationService.navigate('WelcomeScreen')
    }
}

const styles = StyleSheet.create({
    container: {
        height: 35,
        backgroundColor: '#EFEFEF',
        marginTop: 20,
    },
    viewUser: {
        backgroundColor: '#EFEFEF',
        marginTop: 40,
    },
    viewImage: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        borderWidth: 0.5,
        borderColor: R.colors.white100,
        marginLeft: 15,
    },
    logoStyle: {
        width: 59,
        height: 59,
        borderRadius: 59 / 2,
    },
    buttonStyle: {
        backgroundColor: R.colors.roughBlack,
        borderColor: R.colors.roughBlack,
        borderWidth: 1,
        borderRadius: 7
    },
    textStyle: {
        color: R.colors.blackColor,
    },
    viewButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 50
    },
    containerStyle: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    nameStyle: {
        color: R.colors.blackColor,
        fontSize: 18,
        paddingLeft: 15,
        fontWeight: '400',
    }
})
export default UserScreen;