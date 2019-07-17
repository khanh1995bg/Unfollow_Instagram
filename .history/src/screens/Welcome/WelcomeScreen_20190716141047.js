import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import LayoutImageScreen from 'libraries/components/LayoutImageScreen';
import LoginButton from 'libraries/components/AuthTemplate/Airbnb/Welcome/LoginButton';
import R from 'res/R';
import NavigationService from 'routers/NavigationService';

const { height, width } = Dimensions.get('window');

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <LayoutImageScreen />

                <View style={styles.wrapper}>
                    <LoginButton
                        onPress={this.onInstagramPressed}
                        imageName={R.images.im_instagram}
                        textButton='LOG IN WITH INSTAGRAM'
                        imageStyle={styles.imageStyle}
                        containerStyle={styles.containerStyle}
                        textStyle={styles.textStyle}
                    />
                </View>
            </Container>
        );
    }

    onInstagramPressed = () => {
        NavigationService.navigate('LoginScreen', {});
    }
}

const styles = StyleSheet.create({
    registerLableStyle: { color: R.colors.white100, textDecorationLine: 'underline', fontStyle: 'italic', fontSize: 15, paddingTop: 7 },
    imageStyle: {
        width: 25,
        height: 25
    },
    wrapper: {
        height: height / 3 - 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    textLogin: {
        paddingBottom: 40,
        color: R.colors.white100,
        fontSize: 18,
        fontWeight: '500',
    },
    containerStyle: {
        backgroundColor: R.colors.white100,
        borderRadius: 5,
        height: 45,
        width: '75%',

    },
    textStyle: {
        color: '#000',
        fontWeight: '600',
        fontSize: 15
    },

});


export default WelcomeScreen;

