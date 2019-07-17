import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, ActionSheetIOS, Dimensions, Alert } from 'react-native';
import Header from 'libraries/components/Header';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import ListFollowerItem from './ListFollowerItem';
import R from 'res/R';
import SelectToolbar from 'libraries/components/SelectToolbar/SelectToolbar';
import { BUTTONS_SELECT, CANCEL_INDEX_SELECT, BUTTONS_ACTION_FOLLOWER, CANCEL_INDEX_ACTION_FOLLOWER, BUTTONS_LIST, CANCEL_INDEX_LIST } from 'libraries/components/dataButton';
import apis from 'libraries/networking/apis';
import { Status } from 'libraries/networking/status';
import database from 'libraries/utils/database';
import LoadingView from 'libraries/components/LoadingView';
import ModalCheckSuccess from 'libraries/components/ModalcheckSuccess';
import NavigationService from 'routers/NavigationService';
const { width, height } = Dimensions.get('window');

export default class FollowerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data_white: [],
            loadingPage: true,
            loading: false,
            disabled: true,
            countSelect: 0,
            isVisible: false,
            textSelect: '',
            ghostFilter: {},
            inactiveDay: {}
        };
    }

    componentDidMount() {
        this.getDataFollower();
        this.getDataWhitelist();
        this.getGhostFilter();
        this.getListInactive();
    }

    getGhostFilter = () => {
        apis.fetch(apis.PATH.LIST_GHOST_FILTER).then(response => {
            this.setState({ ghostFilter: response.data.ghost_filter_posts })
        })
    }

    getListInactive = () => {
        apis.fetch(apis.PATH.LIST_INACTIVE).then(response => {
            this.setState({ inactiveDay: response.data.inactive_days })
        })
    }

    getDataFollower = async () => {
        let user = await database.get(database.KEY.KEY_USER)
        let newUser = JSON.parse(user);

        let objectUser = {
            username: newUser.username,
            password: newUser.password
        }

        apis.fetch(apis.PATH.FOLLOWER, objectUser).then(response => {
            if (response.code == Status.SUSSESS) {
                this.setState({ data: response.data, loading: false })
                setTimeout(() => {
                    this.setState({ loadingPage: false })
                }, 300);
            }
        }).catch(error => {
            this.setState({ loading: false })
            setTimeout(() => {
                this.setState({ loadingPage: false })
            }, 300);
            return error;

        })
    }

    getDataWhitelist = async () => {
        apis.fetch(apis.PATH.WHITE_LIST).then(response => {
            if (response.code == Status.SUSSESS) {
                this.setState({ data_white: response.data })
            }
        }).catch(error => {
            return error;

        })
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item, index }) => {
        return <ListFollowerItem item={item} index={index} onChooseItem={this.onChooseItem} />
    }

    _renderFlatlist() {
        if (!this.state.loadingPage) {
            if (!this.state.loading) {
                if (this.state.data && this.state.data.length > 0) {
                    return <FlatList
                        ref={(ref) => this.flatlistRef = ref}
                        style={{ paddingBottom: 40, backgroundColor: R.colors.white100, height: height }}
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        onRefresh={this._onRefresh}
                        refreshing={this.state.loading}
                    />
                } else {
                    return (
                        <View style={styles.viewNotData}>
                            <Text style={styles.textNotData}>No Follower</Text>
                        </View>
                    )
                }
            }
            return null;
        }
        return <LoadingView />
    }

    _renderModal() {
        return <ModalCheckSuccess
            isVisible={this.state.isVisible}
            text={this.state.textSelect}
        />
    }

    render() {
        const { countSelect, data } = this.state
        return (
            <Container>
                <Header
                    back
                    text='Follower'
                    countSelect={countSelect ? countSelect : 0}
                    countTotal={data && data.length > 0 ? data.length : 0}
                    showCount
                />
                {this._renderFlatlist()}
                {this._renderModal()}
                <SelectToolbar
                    onSelect={this.onSelect}
                    onAction={this.onAction}
                    onList={this.onList}
                    textStyle={this.state.disabled == true ? { color: '#CCCCCC' } : { color: null }}
                    disabled={this.state.disabled}
                />
            </Container>
        );
    }

    _onRefresh = () => {
        this.setState({ loading: true });
        this.getDataFollower();
    }

    onChooseItem = (index) => () => {
        const listItem = this.state.data.reduce((prevValue, value, idx) => {
            if (index === idx) {
                value.status_check = !value.status_check
            }
            prevValue.data.push(value);
            if (value.status_check) {
                prevValue.count = prevValue.count + 1;
            }
            return prevValue;
        }, { data: [], count: 0 })
        this.setState({
            data: listItem.data,
            disabled: listItem.count === 0 ? true : false,
            countSelect: listItem.count
        })
    }

    onSelect = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS_SELECT,
            cancelButtonIndex: CANCEL_INDEX_SELECT,
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        this.onSelectAll();
                        break;
                    case 1:
                        this.onDeSelectAll();
                        break;
                    case 2:
                        this.onInvertSelect();
                        break;
                    case 3:
                        this.onSegmentSelect();
                        break;
                    case 4:
                        this.onSelectNonFollowers();
                        break;
                    case 5:
                        this.onSelectGhostUser();
                        break;
                    case 6:
                        this.onSelectInactiveUsers();
                        break;

                    default:
                        break;
                }
            });
    }
    onAction = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS_ACTION_FOLLOWER,
            cancelButtonIndex: CANCEL_INDEX_ACTION_FOLLOWER,
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        this.onBlock();
                        break;
                    case 1:
                        this.onAddWhitelist();
                        break;
                    case 2:
                        this.onRemoveWhitelist();
                        break;

                    default:
                        break;
                }
            });
    }
    onList = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS_LIST,
            cancelButtonIndex: CANCEL_INDEX_LIST,
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        this.onLoadAll();
                        break;
                    case 1:
                        this.onLoadTop();
                        break;
                    case 2:
                        this.onLoadBottom();
                        break;

                    default:
                        break;
                }
            });
    }

    onSelectAll = () => {
        let listAllItem = [...this.state.data];
        listAllItem.map(item => {
            item.status_check = true
            return item;
        });

        this.setState({
            data: listAllItem,
            disabled: false,
            countSelect: listAllItem.length,
            isVisible: true,
            textSelect: `Selected ${listAllItem.length} users`
        }, () => {
            setTimeout(() => {
                this.setState({ isVisible: false })
            }, 1000)
        })
    }
    onDeSelectAll = () => {
        let listAllItem = [...this.state.data];
        listAllItem.map(item => {
            item.status_check = false;
            return item;
        });
        this.setState({
            data: listAllItem,
            disabled: true,
            countSelect: 0

        })
    }
    onInvertSelect = () => {
        const listAllItem = this.state.data.reduce((prevValue, value, idx) => {
            value.status_check = !value.status_check
            prevValue.data.push(value);
            if (value.status_check) {
                prevValue.count = prevValue.count + 1;
            }
            return prevValue;
        }, { data: [], count: 0 })
        this.setState({
            data: listAllItem.data,
            disabled: listAllItem.count === 0 ? true : false,
            countSelect: listAllItem.count,
            isVisible: true,
            textSelect: `Selected ${listAllItem.count} users`
        }, () => {
            setTimeout(() => {
                this.setState({ isVisible: false })
            }, 1000)
        })
    }

    onSegmentSelect = () => {
        const dataCheck = this.state.data.map(val => val.status_check);
        const minIndex = dataCheck.indexOf(true);
        const maxIndex = dataCheck.lastIndexOf(true);
        const listAllItem = this.state.data.reduce((prevValue, value, idx) => {
            if (idx > minIndex && idx < maxIndex) {
                value.status_check = true;
            }
            prevValue.data.push(value);
            if (value.status_check) {
                prevValue.count = prevValue.count + 1;
            }
            return prevValue;
        }, { data: [], count: 0 })
        this.setState({
            data: listAllItem.data,
            countSelect: listAllItem.count,
            disabled: false,
            isVisible: true,
            textSelect: `Selected ${listAllItem.count} users`
        }, () => {
            setTimeout(() => {
                this.setState({ isVisible: false })
            }, 1000)
        })
    }

    onSelectNonFollowers = () => {
        if (database.unlockedAllFeatures) {
            Alert.alert(
                'Non-follwing',
                `Select followers that you don't follow back. This may take a while.`,
                [
                    { text: 'Cancel' },
                    { text: 'Ok', onPress: () => this.onNonFollower() },
                ],
                { cancelable: false }
            )
        } else {
            NavigationService.navigate('InAppPurchaseScreen');
        }
    }

    onNonFollower = async () => {
        let user = await database.get(database.KEY.KEY_USER)
        let newUser = JSON.parse(user);

        let newData = {
            username: newUser.username,
            password: newUser.password,
        }
        apis.fetch(apis.PATH.NON_FOLLOWING, newData).then(response => {
            if (response.code == Status.SUSSESS) {
                let dataFollowers = Object.keys(response.data);
                this.setState(prevState => {
                    const newDataFollower = prevState.data.map(value => {
                        if (dataFollowers.includes(value.pk)) {
                            value.status_check = true;
                        }
                        return value;
                    })
                    return {
                        ...prevState,
                        data: newDataFollower,
                        disabled: false,
                        isVisible: true,
                        textSelect: `Selected ${dataFollowers.length} users`
                    };
                }, () => {
                    setTimeout(() => {
                        this.setState({ isVisible: false })
                    }, 1000)
                })
            }
        })
    }

    onSelectGhostUser = () => {
        if (database.unlockedAllFeatures) {
            Alert.alert(
                "Ghost users!",
                `Ghosts are users that have never liked or commented on your latest ${this.state.ghostFilter} posts. Filtering ghost followers may take a few minutes if you have a lot of comments.`,
                [
                    { text: 'Cancel' },
                    { text: 'Ok', onPress: () => this.onGhostUser(this.state.ghostFilter) },
                ],
                { cancelable: false }
            )
        } else {
            NavigationService.navigate('InAppPurchaseScreen');
        }
    }

    onGhostUser = async (value) => {
        let user = await database.get(database.KEY.KEY_USER)
        let newUser = JSON.parse(user);

        let newData = {
            username: newUser.username,
            password: newUser.password,
            posts: value.toString()
        }
        apis.fetch(apis.PATH.GHOST_USER, newData).then(response => {
            if (response.code == Status.SUSSESS) {
                let dataFollowers = response.data.map(item => {
                    return item.pk;
                })
                this.setState(prevState => {
                    const newDataFollower = prevState.data.map(value => {
                        if (dataFollowers.includes(value.pk)) {
                            value.status_check = true;
                        }
                        return value;
                    })
                    return {
                        ...prevState,
                        data: newDataFollower,
                        disabled: false,
                        // isVisible: true,
                        // textSelect: `Selected ${dataFollowers.length} users`
                    };
                })
            }
        })
    }

    onSelectInactiveUsers = () => {
        if (database.unlockedAllFeatures) {
            Alert.alert(
                "Inactive users!",
                `Inactive users are users that do not post anything in last ${this.state.inactiveDay} days (Settings). Filtering inactive users may take a while`,
                [
                    { text: 'Cancel' },
                    { text: 'Ok', onPress: () => this.onInactive(this.state.inactiveDay) },
                ],
                { cancelable: false }
            )
        } else {
            NavigationService.navigate('InAppPurchaseScreen');
        }
    }

    onInactive = async (day) => {
        let user = await database.get(database.KEY.KEY_USER)
        let newUser = JSON.parse(user);

        let objectUser = {
            username: newUser.username,
            password: newUser.password,
            days: day
        }

        apis.fetch(apis.PATH.INACTIVE_USERS, objectUser).then(response => {

            if (response.code == Status.SUSSESS) {
                if (response && response.data) {
                    let dataFollowers = response.data.map(item => {
                        return item.pk;
                    })
                    this.setState(prevState => {
                        const newDataFollower = prevState.data.map(value => {
                            if (dataFollowers.includes(value.pk)) {
                                value.status_check = true;
                            }
                            return value;
                        })
                        return {
                            ...prevState,
                            data: newDataFollower,
                            disabled: false,
                            isVisible: true,
                            textSelect: `Selected ${dataFollowers.length} users`
                        };
                    }, () => {
                        setTimeout(() => {
                            this.setState({ isVisible: false })
                        }, 1000)
                    })
                }
            }
        })
    }

    onAddWhitelist = async () => {
        let newList = this.state.data.filter(item => item.status_check).map(value => value.pk).join(',');
        let listAllItem = [...this.state.data];
        let user = await database.get(database.KEY.KEY_USER)
        let newUser = JSON.parse(user);

        let addWhitelist = {
            username: newUser.username,
            password: newUser.password,
            pk: newList,
        }
        apis.post(apis.PATH.ADD_WHITELIST, addWhitelist).then(response => {
            if (response.code == Status.SUSSESS) {
                this.setState({ isVisible: true, textSelect: 'Added to whitelist' }, () => {
                    setTimeout(() => {
                        this.setState({ isVisible: false })
                    }, 1000);
                    listAllItem.map(item => {
                        item.status_check = false;
                        return item;
                    });
                })
            }
        })
    }

    onRemoveWhitelist = () => {
        // lọc những data nào có status = 1
        let newList = this.state.data_white.filter(item => item.status).map(value => value.id);

        let objectUser = {
            id: newList.join(','),
        }
        apis.post(apis.PATH.REMOVE_WHITELIST, objectUser).then(response => {
            // Refresh data
            if (response.code == Status.SUSSESS) {
                const newData = this.state.data_white.filter(item => !newList.includes(item.id));

                this.setState({
                    data_white: newData,
                    isVisible: true,
                    textSelect: `Remove whitelist success!`
                }, () => {
                    setTimeout(() => {
                        this.setState({ isVisible: false })
                    }, 1000)
                })
            }
        })
    }

    onBlock = async () => {
        let listUnFollow = [];
        if (this.state.data_white) {
            listUnFollow = this.state.data_white.map(value => value.pk.toString());
        }
        // lọc những data nào có status_check = true 
        let data = this.state.data.filter(value => !listUnFollow.includes(value.pk.toString()) && value.status_check).map(value => value.pk);


        let user = await database.get(database.KEY.KEY_USER)
        let newUser = JSON.parse(user);

        let objectUser = {
            pk: data.join(','),
            username: newUser.username,
            password: newUser.password
        }

        Alert.alert(
            'Confirm Blocking',
            `Are you sure you want to block ${data.length} profiles`,
            [
                { text: 'No' },
                { text: 'Do it', onPress: () => this.onDoneBlock(objectUser, data) },
            ],
            { cancelable: false }
        )
    }

    onDoneBlock = (objectUser, data) => {
        apis.post(apis.PATH.BLOCK, objectUser).then(response => {
            if (response.code == Status.SUSSESS) {
                //refresh data 

                const newData = this.state.data.filter(item => !data.includes(item.pk));

                this.setState({
                    data: newData,
                    isVisible: true,
                    textSelect: `Unfollow ${data.length} success!`
                }, () => {
                    setTimeout(() => {
                        this.setState({ isVisible: false })
                    }, 1000)
                })
            }
        })
    }
    onLoadAll = () => {
        this.setState({ loadingPage: true });
        this.getDataFollower();
    }

    onLoadTop = () => {
        this.flatlistRef.scrollToIndex({ animated: true, index: 0, })
    }
    onLoadBottom = () => {
        this.flatlistRef.scrollToEnd({ animated: true })
    }

}

const styles = StyleSheet.create({
    viewNotData: {
        alignItems: 'center',
        paddingTop: height / 3,
        height: height,
        backgroundColor: R.colors.white100
    },
    textNotData: {
        fontSize: 17,
        fontWeight: '600',
        color: R.colors.blackColor
    }
})