import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Container from '../components/Container';
import { TextInput } from 'react-native-gesture-handler';
import countries from './countries.json';
import countryNameList from './countries_name.json'
import PropTypes from 'prop-types';
import colors from '../colors';
import IconPadding from '../components/IconPadding';
import NavigationService from 'routers/NavigationService';
import CountriesModal from './CountriesModal';
import strings from '../strings';

export const getAllCountries = () => {
    let countriesList = []
    countryNameList.map(name => {
        countriesList.push({ ...countries[name], code: name });
    })

    return countriesList;
}

class PhoneNumberScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            countries: getAllCountries(),
            countrySelected: "VN",
            isPhoneValid: false,
            phoneNumber: ''
        };
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

                <Text
                    style={styles.labelStyle}
                >{strings.phoneNumberScreen.label_enter_phone_number}</Text>

                <View
                    style={styles.containerEnterPhone}
                >
                    <TouchableOpacity
                        onPress={this.onFlagPressed}
                    >
                        <Image
                            resizeMode='contain'
                            source={{ uri: countries[this.state.countrySelected].flag }}
                            style={styles.imageCountryFlag}
                        />
                    </TouchableOpacity>

                    <Text
                        style={{ color: 'white', fontSize: 16 }}
                    >{`+${countries[this.state.countrySelected].callingCode || ''}`}</Text>
                    <TextInput
                        maxLength={12}
                        onChangeText={this.onChangeText}
                        autoFocus
                        keyboardType={'numeric'}
                        style={styles.phoneInputStyle}
                    />

                </View>


                <Text
                    style={styles.textPolicyStyle}>
                    {strings.phoneNumberScreen.text_hint_policy}
                </Text>


                <TouchableOpacity
                    disabled={!this.state.isPhoneValid}
                    onPress={this.onConfirmPressed}
                    style={[styles.verificationStyle, {backgroundColor: this.state.isPhoneValid ? 'white' : '#78a0a3'}]}>
                    <Text style={[styles.textStyle, {color: !this.state.isPhoneValid ? '#5f8284' : colors.primaryColor}]}>
                        {strings.phoneNumberScreen.text_button_continue}
                    </Text>
                </TouchableOpacity>

                <CountriesModal
                    onCountryPressed={this.onCountryPressed}
                    countries={this.state.countries}
                    ref={ref => this.countriesModal = ref}
                />

            </Container>
        );
    }


    onChangeText = (text) => {
        this.setState({ phoneNumber: text.substring(0, 12) })
        if (text.length < 8 || text.length > 12) {
            this.setState({isPhoneValid: false})
            return
        }
        this.setState({isPhoneValid: true})
    }

    onCountryPressed = (item) => () => {
        this.countriesModal.toggleModal(false)
        this.setState({ countrySelected: item.code })

    }

    onFlagPressed = () => {
        this.countriesModal.toggleModal(true)
    }

    onConfirmPressed = () => {
        NavigationService.navigate('ConfirmationCodeScreen', {phoneNumber: this.state.phoneNumber})
    }

    onBackPressed = () => {
        NavigationService.pop()
    }
}


const styles = StyleSheet.create({
    verificationStyle: {
        marginTop: 30,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        // borderRadius: 19
    },

    header: {
        paddingTop: 15,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    textStyle: {
        color: colors.primaryColor,
        fontSize: 16
    },

    labelStyle: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 20,
        color: 'white',
        fontWeight: '500'
    },

    containerEnterPhone: {
        height: 38,
        width: '100%',
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageCountryFlag: {
        width: 40,
        height: 25,
        marginRight: 5
    },
    phoneInputStyle: {
        height: 38,
        flex: 1,
        marginLeft: 10,
        backgroundColor: 'white',
        fontSize: 16,
        paddingHorizontal: 5
    },
    textPolicyStyle: {
        color: 'white',
        fontSize: 12,
        color: '#fffe',
        marginTop: 40,
        textAlign: 'center'
    }
});

export default PhoneNumberScreen;
