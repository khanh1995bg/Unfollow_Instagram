import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import HeaderUser from 'libraries/components/HeaderUser';
import R from 'res/R';
import ContentEmail from './ContentEmail';
import NavigationService from 'routers/NavigationService';
import DeviceInfo from 'react-native-device-info';

export default class UpgradeInfoScreen extends Component {
    state = {
        version: null,
        OS: null,
        country: null,
        DeviceName: null,
        deviceId: null,
        emailTo: '',
        emailCC: '',
        subject: ''
    }

    componentDidMount() {
        this.getVersion();
    }

    getVersion = () => {
        const version = DeviceInfo.getVersion();
        const country = DeviceInfo.getDeviceCountry();
        const OS = DeviceInfo.getBuildNumber();
        const DeviceName = DeviceInfo.getDeviceName();
        const deviceId = DeviceInfo.getDeviceId();
        this.setState({ version, country, OS, DeviceName, deviceId })
    }

    onEmailTo = (emailTo) => {
        this.setState({ emailTo })
    }
    onEmailCC = (emailCC) => {
        this.setState({ emailCC })
    }
    onSubject = (subject) => {
        this.setState({ subject })
    }

    render() {
        return (
            <Container>
                <HeaderUser
                    textLeft="Cancel"
                    textRight="Send"
                    textTitle='Unfollow & Clean Mass'
                    textButtonStyle={{ color: R.colors.primaryColor }}
                    onButtonLeft={this.onButtonLeft}
                    onButtonRight={this.onButtonRight}
                />
                <View style={styles.container}></View>
                <ContentEmail
                    placeholder='Email'
                    title='To:'
                    textName={this.state.emailTo}
                    onChangeText={this.onEmailTo}
                    nameStyle={styles.nameStyle}
                />
                <ContentEmail
                    placeholder='Email'
                    title='Cc/Bcc, From:'
                    textName={this.state.emailCC}
                    onChangeText={this.onEmailCC}
                />
                <ContentEmail
                    placeholder='Unfollow & Clean Mass'
                    title='Subject:'
                    textName={this.state.subject}
                    onChangeText={this.onSubject}
                />

                <View style={styles.content}>
                    <Text style={styles.textContent}>
                        {`---Type feedback above this line-- \n\nApp Version: ${this.state.version} \n\nCountry: ${this.state.country} 
                        \n\nDevice: ${this.state.OS} \n\nOS Version: ${this.state.deviceId} 
                        \n\nUsername(s): ${this.state.DeviceName} \n\nSent from my iPhone`}
                    </Text>
                </View>
            </Container>
        );
    }
    onButtonLeft = () => {
        NavigationService.navigate('More');
    }

    onButtonRight = () => {
        const { emailTo, emailCC, subject, version, country, OS, deviceId, DeviceName } = this.state;

        let body = `${version} \n ${country} \n ${OS} \n ${deviceId} \n ${DeviceName} `

        Linking.openURL(`mailto:${emailTo}?cc=${emailCC}&subject=${subject}&body=${body}`)
    }
}

const styles = StyleSheet.create({
    container: {
        height: 35,
        backgroundColor: R.colors.coalGreen,
        marginTop: 20,
    },
    nameStyle: {
        color: R.colors.primaryColor
    },
    content: {
        marginTop: 40,
        paddingLeft: 20,
    },
    textContent: {
        color: R.colors.white100,
        paddingTop: 10,
    }
})