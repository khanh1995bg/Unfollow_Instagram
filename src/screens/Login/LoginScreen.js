import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import LayoutImageScreen from 'libraries/components/LayoutImageScreen';
import BaseTextInput from 'libraries/components/BaseTextInput';
import R from 'res/R';
import LoginButton from 'libraries/components/AuthTemplate/Airbnb/Welcome/LoginButton';
import NavigationService from 'routers/NavigationService';
import Toast from 'react-native-simple-toast';
import { onLogin } from '../../redux/actions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { hideLoading, showLoading } from 'libraries/components/Loading/LoadingModal';
import database from 'libraries/utils/database';
import apis from 'libraries/networking/apis';
const { height, width } = Dimensions.get('window');

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    onUsername = (username) => {
        this.setState({ username });
    }

    onPassword = (password) => {
        this.setState({ password });
    }

    componentDidMount() {
        database.save(database.KEY.UNLOCKED_ALL_FEATURES, 'false')
    }

    render() {
        const { key } = this.props.navigation.state.params;
        return (
            <Container>
                <ScrollView>
                    <LayoutImageScreen />
                    {key ?
                        <TouchableOpacity
                            style={styles.wrapperClose}
                            onPress={this.onClose}>
                            <View style={styles.viewClose}>
                                <Icon name="ios-close" size={40} color={R.colors.white100} />
                            </View>
                        </TouchableOpacity> : null
                    }

                    <View style={styles.wrapper}>
                        <BaseTextInput
                            onSubmitEditing={() => {
                                this.passwordInputRef && this.passwordInputRef.focus()
                            }}
                            returnKeyType='next'
                            placeholder={R.strings.Login.username}
                            nameImage={R.images.ic_person}
                            value={this.state.username.toLowerCase()}
                            onChangeText={this.onUsername}
                        />
                        <BaseTextInput
                            onSubmitEditing={this.onLoginPress}
                            ref={ref => this.passwordInputRef = ref}
                            returnKeyType='done'
                            secureTextEntry={true}
                            placeholder={R.strings.Login.password}
                            nameImage={R.images.ic_lock}
                            containerStyle={styles.containerStyle}
                            value={this.state.password}
                            onChangeText={this.onPassword}
                        />

                        <LoginButton
                            textButton={R.strings.Login.label_button}
                            imageStyle={styles.imageStyle}
                            containerStyle={styles.ButtonStyle}
                            textStyle={styles.textStyle}
                            onPress={this.onLoginPress}
                        />
                    </View>
                </ScrollView>

                <KeyboardSpacer />
            </Container>
        );
    }

    onLoginPress = () => {
        const { username, password } = this.state;
        Keyboard.dismiss();

        if (username.length === 0) {
            Toast.show(R.strings.Login.msg_username_not_empty);
            return;
        }

        if (password.length === 0) {
            Toast.show(R.strings.Login.msg_password_not_empty);
            return;
        }

        const dataLogin = {
            username: 'huutxvin',
            password: 'Xuanhuu90'
        }

        const data = {
            username,
            password
        }
        showLoading()
        apis.post(apis.PATH.LOGIN, data).then(res => {
            if (res.code == 200) {
                
                database.user = dataLogin;
                database.user_test = res.data.user;
                database.tokenCache = res.data.token
                database.save(database.KEY.KEY_USER, JSON.stringify(dataLogin));
                database.save(database.KEY.KEY_USER_TEST, JSON.stringify(res.data.user));
                database.save(database.KEY.KEY_USER_TOKEN, res.data.token);

                // let objectUser = {
                //     username: data.username,
                //     password: data.password
                // }

                apis.fetch(apis.PATH.USER_INFO, null, true).then(response => {
                    hideLoading()
                    if (response.code == 200) {
                        database.save(database.KEY.INFO_USER, JSON.stringify(response.data.user));
                        NavigationService.reset('Main');
                    } else {
                        NavigationService.reset('Main');
                    }

                }).catch(error => {
                    hideLoading()
                    NavigationService.reset('Main');
                })

            } else {
                hideLoading()
                setTimeout(() => {
                    Toast.show(R.strings.Login.msg_login_fail)
                }, 1000)
            }
        }).catch(err => {
            hideLoading()

            setTimeout(() => {
                Toast.show(R.strings.Login.msg_login_fail)
            }, 1000)
        })

    }

    onClose = () => {
        NavigationService.pop();
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: height / 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    containerStyle: {
        marginTop: 10
    },
    imageStyle: {
        width: 25,
        height: 25
    },

    ButtonStyle: {
        backgroundColor: R.colors.primaryColor,
        borderRadius: 14,
        height: 45,
        width: width * 0.78,
        paddingLeft: 35,
        borderRadius: 45 / 2,
        marginTop: 50,
        paddingRight: 40,
    },
    textStyle: {
        color: R.colors.white100,
        fontWeight: '600',
    },
    wrapperClose: {
        position: 'absolute',
        top: 20,
        right: 10
    },
    viewClose: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.loginReducer.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (data) => dispatch(onLogin(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)