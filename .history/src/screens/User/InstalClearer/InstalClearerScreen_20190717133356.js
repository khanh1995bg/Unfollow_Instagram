import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActionSheetIOS, Linking } from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import Header from 'libraries/components/Header';
import R from 'res/R';
import InfoUser from './InfoUser';
import InfoMenuItem from './InfoMenu/InfoMenuItem';
import NavigationService from 'routers/NavigationService';
import database from 'libraries/utils/database';
import { BUTTONS_INACTIVE, CANCEL_BUTTONS_INACTIVE, BUTTONS_GHOST_FILTER, CANCEL_BUTTONS_GHOST_FILTER } from 'libraries/components/dataButton';
import apis from 'libraries/networking/apis';
import DeviceInfo from 'react-native-device-info';
import ModalCustom from 'libraries/components/ModalCustom';

export default class InstaCleanerScreen extends Component {
    state = {
        infoUser: {},
        inactiveDay: {},
        ghostFilter: {},
        version: null,
        modalVisible: false,
        valueInactive: null,
        modalGhostVisible: false,
        valueGhost: null,
    }

    componentWillMount() {
        this.getListInactive();
        this.getGhostFilter();
        this.getVersion();
    }

    getVersion = () => {
        const version = DeviceInfo.getVersion();
        this.setState({ version })
    }

    getListInactive = () => {
        apis.fetch(apis.PATH.LIST_INACTIVE).then(response => {
            this.setState({ inactiveDay: response.data.inactive_days })
        })
    }
    getGhostFilter = () => {
        apis.fetch(apis.PATH.LIST_GHOST_FILTER).then(response => {
            this.setState({ ghostFilter: response.data.ghost_filter_posts })
        })
    }

    onValueInactive = (valueInactive) => {
        this.setState({ valueInactive })
    }
    onValueGhost = (valueGhost) => {
        this.setState({ valueGhost })
    }

    _renderModal() {
        return (
            <ModalCustom
                isVisible={this.state.modalVisible}
                title='Unfollow for Instagram'
                content='Enter the number of days a user has been inactive'
                value={this.state.valueInactive ? this.state.valueInactive.toString() : 0}
                onChangeText={this.onValueInactive}
                onLeft={this.onCloseInactive}
                onRight={this.onYesInactive}
            />
        )
    }

    _renderModalGhost() {
        return (
            <ModalCustom
                isVisible={this.state.modalGhostVisible}
                title='Unfollow for Instagram'
                content='Ghost user filter'
                value={this.state.valueGhost ? this.state.valueGhost.toString() : 0}
                onChangeText={this.onValueGhost}
                onLeft={this.onCloseGhost}
                onRight={this.onYesGhost}
            />
        )
    }

    render() {
        const { infoUser } = this.state;
        return (
            <Container>
                <Header
                    back
                    text='InstaCleaner'
                />
                <ScrollView
                    style={styles.wrapper}
                    showsVerticalScrollIndicator={false}
                >
                    {this._renderModal()}
                    {this._renderModalGhost()}

                    <View style={styles.container}></View>
                    <InfoUser
                        infoUser={infoUser}
                        onDetailInfo={this.onDetailInfo}
                    />

                    <View style={styles.label}></View>
                    <InfoMenuItem
                        text='Whitelist manager'
                        onPress={this.onListWhite}
                    />
                    <InfoMenuItem
                        text='Blocked users'
                        onPress={this.onListBlocked}
                    />
                    <InfoMenuItem
                        content
                        text='Inactive filter'
                        contentText={`${this.state.inactiveDay} days`}
                        onPress={this.onInactive}
                    />
                    <InfoMenuItem
                        content
                        text='Ghost filter'
                        contentText={`last ${this.state.ghostFilter} posts`}
                        onPress={this.onGhostFilter}
                    />

                    <View style={styles.label}></View>
                    <InfoMenuItem
                        text='User guide'
                        onPress={this.onUserGuide}
                    />
                    <InfoMenuItem
                        text='Leave a review'
                        onPress={this.LeaveReview}
                    />
                    <InfoMenuItem
                        content
                        text='Contact us'
                        onPress={this.onDetailCleaner}
                    />
                    <InfoMenuItem
                        content
                        text='Version'
                        contentText={this.state.version}
                    />

                </ScrollView>
            </Container>
        );
    }

    async componentDidMount() {

        let user = await database.get(database.KEY.INFO_USER);
        let newUser = JSON.parse(user)

        this.setState({ infoUser: newUser });
    }


    onDetailInfo = () => {
        const { infoUser } = this.state;
        NavigationService.navigate('UserScreen', { infoUser })
    }
    onDetailCleaner = () => {
        // const {version} = this.state;
        // NavigationService.navigate('UpgradeInfoScreen', {version})
        Linking.openURL('https://itunes.apple.com/app/id1461438806');
    }

    onListBlocked = () => {
        NavigationService.navigate('BlockUserScreen')
    }
    onListWhite = () => {
        NavigationService.navigate('WhitelistScreen')
    }

    onInactive = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS_INACTIVE,
            cancelButtonIndex: CANCEL_BUTTONS_INACTIVE,
        },
            (buttonIndex) => {
                this.onChooseDays(buttonIndex + 1)
            });
    }

    onYesInactive = () => {
        this.postInactiveday(parseInt(this.state.valueInactive));
    }

    onChooseDays = (index) => {

        let days = 0;
        if (index === 1) {
            days = 30;
        } else if (index === 2) {
            days = 60;
        } else if (index === 3) {
            days = 90
        } else if (index === 4) {
            this.onCustomInactive()
            return;
        }

        this.postInactiveday(days);
    }

    postInactiveday = (days) => {
        let inactive = {
            id: 1,
            inactive_days: days
        }
        apis.post(apis.PATH.INACTIVE_DAY, inactive).then(response => {
            this.setState({ inactiveDay: inactive.inactive_days, modalVisible: false })
        })
    }
    onCloseInactive = () => {
        this.setState({ modalVisible: false })
    }

    onCustomInactive = () => {
        this.setState({ modalVisible: true })
    }




    onGhostFilter = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS_GHOST_FILTER,
            cancelButtonIndex: CANCEL_BUTTONS_GHOST_FILTER,
        },
            (buttonIndex) => {
                this.onChooseGhost(buttonIndex + 1)
            });
    }

    onChooseGhost = (index) => {
        let ghost = 0;
        if (index === 1) {
            ghost = 50;
        } else if (index === 2) {
            ghost = 100;
        } else if (index === 3) {
            this.onCustomGhost()
            return;
        }

        this.postGhost(ghost);
    }

    postGhost = (ghost) => {
        let inactive = {
            id: 1,
            ghost_filter_posts: ghost
        }

        apis.post(apis.PATH.GHOST_FILTER, inactive).then(response => {
            this.setState({ ghostFilter: inactive.ghost_filter_posts, modalGhostVisible: false })
        })
    }

    onYesGhost = () => {
        this.postGhost(parseInt(this.state.valueGhost));
    }

    onCustomGhost = () => {
        this.setState({ modalGhostVisible: true })
    }

    onCloseGhost = () => {
        this.setState({ modalGhostVisible: false })
    }

    onUserGuide = () => {
        NavigationService.navigate('UserGuide')
    }

    LeaveReview = () => {
        Linking.openURL('https://itunes.apple.com/app/id1461438806');
    }
}

const styles = StyleSheet.create({
    container: {
        height: 35,
        backgroundColor: ,
    },
    wrapper: {
        marginBottom: 30
    },
    label: {
        height: 20,
        backgroundColor: R.colors.coalGreen,
        marginTop: 15,
    },
})