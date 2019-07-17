import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, NativeModules, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import R from 'res/R';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import LoginButton from 'libraries/components/AuthTemplate/Airbnb/Welcome/LoginButton';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationService from 'routers/NavigationService';
import database from 'libraries/utils/database';
import apis from 'libraries/networking/apis';
import constants from 'libraries/utils/constants';
const { width, height } = Dimensions.get('window');
const { InAppUtils } = NativeModules

export default class InAppPurchaseScreen extends Component {


    canMakePayments = false;

    constructor(props) {
        super(props);

        InAppUtils.canMakePayments((canMakePayments) => {

            this.canMakePayments = canMakePayments;
        })
    }

    render() {
        return (
            <Container>
                <FastImage
                    style={styles.logoStyle}
                    source={R.images.bg_Vip}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.wrapperClose}
                        onPress={this.onClose}>
                        <View style={styles.viewClose}>
                            <Icon name="ios-close" size={30} color={R.colors.white100} />
                        </View>
                    </TouchableOpacity>
                    <FastImage
                        style={styles.logoGrowStyle}
                        source={R.images.grow}
                        resizeMode={FastImage.resizeMode.contain}
                    >
                        <View style={styles.viewGrow}>
                            <Text style={styles.priceStyle}>$ 2.99</Text>
                            <Text style={styles.titleStyle}>Unlock All features</Text>
                        </View>

                    </FastImage>

                    <View style={styles.wrapperButton}>
                        <LoginButton
                            textButton='BUY'
                            textStyle={styles.textStyle}
                            containerStyle={styles.containerStyle}
                            onPress={this.onInAppPurchse}
                        />

                        <TouchableOpacity
                            onPress={this.onRestorePurchases}
                        >
                            <Text style={styles.restoreStyle}>Restore Purchase</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={this.onTermsService}
                            >
                                <Text style={styles.textBottomStyle}>Terms of Use </Text>
                            </TouchableOpacity>
                            <Text style={styles.textBottomStyle}> and </Text>
                            <TouchableOpacity
                                onPress={this.onPrivacyPolicy}
                            >
                                <Text style={styles.textBottomStyle}> Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }


    onClose = () => {
        NavigationService.pop();
    }

    onTermsService = () => {
        NavigationService.navigate('TermsOfService')
    }
    onPrivacyPolicy = () => {
        NavigationService.navigate('PrivacyPolicy')
    }

    onRestorePurchases = () => {
        InAppUtils.restorePurchases((error, response) => {
            if (error) {
                Alert.alert('Itunes Error', 'Could not connect to itunes store.');
            } else {


                if (response.length === 0) {
                    Alert.alert('No Purchases', "We didn't find any purchases to restore.");
                    return;
                }

                response.forEach((purchase) => {
                    if (purchase.productIdentifier === constants.PURCHASE_PACKAGE_ID) {
                        Alert.alert('Restore Successful', 'Successfully restores all your purchases.');
                        return
                    }
                });
            }
        });
    }

    onInAppPurchse = async () => {
        let userStr = await database.get(database.KEY.INFO_USER);
        let userInfo = {}
        if (userStr) {
            userInfo = JSON.parse(userStr);
        }


        if (!this.canMakePayments || (!userInfo.pk && !userInfo.id)) {
            Alert.alert('Not Allowed', 'This device is not allowed to make purchases. Please check restrictions on device');
            return
        }

        var productIdentifier = constants.PURCHASE_PACKAGE_ID;

        const identifiers = [
            productIdentifier,
        ];
        InAppUtils.loadProducts(identifiers, (error, products) => {
            InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
                // NOTE for v3.0: User can cancel the payment which will be available as error object here.

                if (response && response.productIdentifier) {
                    const req = {
                        username: database.user.username,
                        password: database.user.password,
                        transaction_id: response.originalTransactionIdentifier
                    }

                    apis.post(apis.PATH.CHECK_TRANS_EXIST, req).then(res => {
                        if (res.code == 200) {
                            //If pk của user server trả về trùng với pk hiện tại thì thành công
                            //Không trùng pk thì sẽ báo "Bạn đã thanh toán cho 1 tài khoản trước đó. 
                            //Vui lòng đăng nhập tài khaorn đã thanh toán trước đó để tiếp tục sử dụng đầy đủ tính năng!"
                            if (res.data.length == 0) {
                                this.purchaseSuccessful(userInfo, response)
                            } else {
                                
                                if(res.data[0].pk == userInfo.pk){
                                    this.purchaseSuccessful(userInfo, response)
                                } else {
                                    NavigationService.pop()
                                    Alert.alert(
                                        'Oops!',
                                        'Your iTunes account is paid for an account already. Please log into that account to use all of the app\'s features.',
                                    );
                                }
                            }
                        }
                    }).catch(err=> {

                    })
                }
            });
        });
    }

    purchaseSuccessful = (userInfo, response) => {
        const data = {
            pk: userInfo.pk || userInfo.id,
            package_id: constants.PURCHASE_PACKAGE_ID,
            transaction_id: response.originalTransactionIdentifier,
        }
        
        apis.post(apis.PATH.USER_PAYMENT, data).then(res => {
        });

        database.save(database.KEY.UNLOCKED_ALL_FEATURES, 'true');
        database.unlockedAllFeatures = true
        NavigationService.pop()
        Alert.alert(
            'Purchase Successful',
            'All features are unlocked. Thanks for being awesome, we hope you enjoy your purchase.',
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    viewGrow: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    logoStyle: {
        width,
        height,
        position: 'absolute'
    },
    logoGrowStyle: {
        width: width / 2,
        height: height / 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },
    containerStyle: {
        backgroundColor: '#FFAA00',
        borderRadius: 10,
        width: width * 0.68,
        shadowColor: '#FFAA00',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    textStyle: {
        color: R.colors.white100
    },
    restoreStyle: {
        fontSize: 13,
        color: R.colors.white100,
        paddingTop: 15
    },
    wrapperButton: {
        marginTop: 30,
        alignItems: 'center'
    },
    textBottomStyle: {
        fontSize: 11,
        color: R.colors.colorTitle,
        paddingTop: 40,
        paddingBottom: 15,
    },
    priceStyle: {
        color: R.colors.white100,
        fontSize: 26,
        fontWeight: '700'
    },
    titleStyle: {
        color: R.colors.white100,
        fontSize: 14,
        paddingTop: 10
    },
    wrapperClose: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 40,
        right: 10
    },
    viewClose: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#000',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})