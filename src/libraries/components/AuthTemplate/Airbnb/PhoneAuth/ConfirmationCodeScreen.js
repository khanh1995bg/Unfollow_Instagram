import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Container from '../components/Container';
import ConfirmationCodeInput from '../components/ConfirmationCodeInput';
import IconPadding from '../components/IconPadding';
import ContinueButton from '../components/ContinueButton';
import strings from '../strings';
import NavigationService from 'routers/NavigationService';

const TIMEOUT_TO_RESEND_SMS = 60

class ConfirmationCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            secondResend: TIMEOUT_TO_RESEND_SMS,
            phoneNumber: this.props.navigation.state.params.phoneNumber
        };

        this.onCountDownResend()
    }

    _renderTextResend = () => {
        let message = `${strings.ConfirmationCodeScreen.send_sms_again} ${this.state.secondResend}s`

        if (this.state.secondResend == 0) {
            message = strings.ConfirmationCodeScreen.didnt_get_a_code
        }

        return <Text
            onPress={this.onResendPressed}
            style={styles.resendLabelStyle}
        >{message}</Text>
    }

    render() {
        return (
            <Container>

                <View style={styles.header}>

                    <IconPadding
                        onPress={this.onBackPressed}
                        iconCloseName='ios-arrow-back'
                    />
                </View>

                <Text style={styles.titleStyle}>
                    {strings.ConfirmationCodeScreen.enter_the_code_was_sent_to}
                </Text>

                <Text style={styles.phoneNumberStyle}>
                    {this.state.phoneNumber}
                </Text>

                <ConfirmationCodeInput
                    ref="codeInputRef"
                    keyboardType="numeric"
                    codeLength={5}
                    className='border-circle'
                    autoFocus={true}
                    codeInputStyle={{ fontWeight: '800' }}
                    onFulfill={(code) => this._onFinishCheckingCode(code)}
                    onFocused={this.onFocused}
                />

                <ContinueButton
                    disabled={this.state.disabled}
                    onPress={this.onContinuePressed}
                />

                {this._renderTextResend()}
            </Container>
        );
    }

    _onFinishCheckingCode = (code) => {
        this.setState({ disabled: false })
    }

    onResendPressed = () => {
        this.setState({ secondResend: TIMEOUT_TO_RESEND_SMS }, () => {
            this.onCountDownResend();
        })

    }

    onFocused = () => {
        this.setState({ disabled: true })
    }

    onCountDownResend = () => {
        this.countDownTimer = setInterval(() => {
            this.setState({ secondResend: this.state.secondResend - 1 }, () => {
                if (this.state.secondResend == 0) {
                    if (this.countDownTimer) clearInterval(this.countDownTimer)
                }
            })
        }, 1000)
    }

    onBackPressed = () => {
        NavigationService.pop()
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 15,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    titleStyle: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 5
    },
    phoneNumberStyle: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginVertical: 10
    },

    resendLabelStyle: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
        marginVertical: 15
    }
})

export default ConfirmationCodeScreen;
