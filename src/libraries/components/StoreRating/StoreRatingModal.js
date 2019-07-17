import React, { PureComponent } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import R from 'res/R'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import utils from 'libraries/utils/utils';
import database from 'libraries/utils/database';
import { DateTimeUtils } from 'libraries/utils/DateTimeUtils';
import moment from 'moment'

class StoreRatingModal extends PureComponent {

    static defaultProps = {
        thresholdDayToShow: 30 * DateTimeUtils.TIME_VALUE.SECOND
    }

    static propTypes = {
        googleStoreLink: PropTypes.string,
        appleStoreLink: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

    _renderStars = () => {
        return <TouchableOpacity
            onPress={this.onRatingPressed}
            style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(value => {
                return <Icon
                    key={value.toString()}
                    style={{ marginHorizontal: 8 }}
                    name='ios-star-outline'
                    size={25}
                    color={R.colors.primaryColor}
                />
            })}
        </TouchableOpacity>
    }

    _renderDivider = () => <View
        style={styles.dividerStyle}
    />

    render() {
        return (
            <Modal
                transparent={true}
                animationType={'fade'}
                style={{ position: "absolute" }}
                visible={this.state.isVisible}
            >
                <View style={styles.containerStyle}>
                    <View style={styles.contentContainerStyle}>
                        <FastImage
                            style={styles.logoStyle}
                            source={R.images.app_icon}
                            resizeMode={FastImage.resizeMode.contain}
                        />

                        <Text style={styles.titleStyle}>Enjoying React Native?</Text>
                        <Text style={styles.descStyle}>Tap a star to rate it on the App Store</Text>

                        {this._renderDivider()}

                        {this._renderStars()}

                        {this._renderDivider()}

                        <TouchableOpacity
                            onPress={this.onNotNowPress}
                            style={styles.notNowContainerStyle}
                        >
                            <Text style={styles.textNotNowStyle}>Not Now</Text>
                        </TouchableOpacity>

                    </View>


                </View>
            </Modal>
        );
    }

    async componentDidMount() {
        let currentTime = moment(new Date()).valueOf();

        let lastTimeOpenApp = await database.get(database.KEY.LAST_TIME_SHOW_RATING_DIALOG);

        let canShowRatingDialog = await database.get(database.KEY.CAN_SHOW_RATING_DIALOG);

        if (canShowRatingDialog == null) {
            canShowRatingDialog = 'true'
        }

        if (lastTimeOpenApp) {

            lastTimeOpenApp = Number(lastTimeOpenApp);

            let timeThreshold = currentTime - lastTimeOpenApp;

            console.log(timeThreshold, canShowRatingDialog, this.props.thresholdDayToShow)
            if (timeThreshold >= this.props.thresholdDayToShow && canShowRatingDialog == 'true') {
                this.setState({ isVisible: true })
            } else {
                this.setState({ isVisible: false })
            }
        } else {
            database.save(database.KEY.LAST_TIME_SHOW_RATING_DIALOG, currentTime + '');
        }
    }

    onRatingPressed = () => {
        this.setState({ isVisible: false })
        database.save(database.KEY.CAN_SHOW_RATING_DIALOG, 'false')
        utils.openStore(this.props.googleStoreLink, this.props.appleStoreLink)
    }

    onNotNowPress = () => {
        let dateTimeStamp = moment(new Date()).valueOf();
        database.save(database.KEY.LAST_TIME_SHOW_RATING_DIALOG, JSON.stringify(dateTimeStamp));
        this.setState({ isVisible: false })
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    contentContainerStyle: {
        width: '80%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },

    logoStyle: {
        width: 65,
        height: 65,
        marginVertical: 20
    },
    titleStyle: {
        fontWeight: '600',
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 8,
        textAlign: 'center'
    },
    descStyle: {
        fontSize: 18,
        color: 'black',
        marginTop: 5,
        marginBottom: 20,
        paddingHorizontal: 8,
        textAlign: 'center'
    },
    notNowContainerStyle: {
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textNotNowStyle: {
        fontSize: 20,
        color: R.colors.primaryColor
    },

    starContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45
    },
    dividerStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#ccc'
    }
})

export default StoreRatingModal;
