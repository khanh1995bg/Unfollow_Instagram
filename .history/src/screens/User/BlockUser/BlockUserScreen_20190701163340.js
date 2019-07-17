import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, ActionSheetIOS, Dimensions, Alert } from 'react-native';
import Header from 'libraries/components/Header';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import R from 'res/R';
import SelectToolbar from 'libraries/components/SelectToolbar/SelectToolbar';
import { BUTTONS_SELECT, CANCEL_INDEX_SELECT, BUTTONS_ACTION_FOLLOWER_UNBLOCKED, CANCEL_INDEX_ACTION_FOLLOWER_UNBLOCKED, BUTTONS_LIST, CANCEL_INDEX_LIST } from 'libraries/components/dataButton';
import apis from 'libraries/networking/apis';
import { Status } from 'libraries/networking/status';
import database from 'libraries/utils/database';
import LoadingView from 'libraries/components/LoadingView';
import ListFollowerItem from 'screens/Follower/ListFollowerItem';
const { width, height } = Dimensions.get('window');
import ModalCheckSuccess from 'libraries/components/ModalcheckSuccess';

export default class BlockUserScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data_block: [],
            loadingPage: true,
            loading: false,
            disabled: true,
            countSelect: 0,
            isVisible: false,
            textSelect: ''
        };
    }

    componentDidMount() {
        this.getDataBlocked();
    }

    getDataBlocked = async () => {
        let user = await database.get(database.KEY.KEY_USER)
        let newUser = JSON.parse(user);

        let objectUser = {
            username: newUser.username,
            password: newUser.password
        }

        apis.fetch(apis.PATH.LIST_BLOCKED, objectUser).then(response => {
            if (response.code == Status.SUSSESS) {
                this.setState({ data_block: response.data, loading: false })
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

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item, index }) => {
        return <ListFollowerItem item={item} index={index} onChooseItem={this.onChooseItem} />
    }

    _renderFlatlist() {
        if (!this.state.loadingPage) {
            if (!this.state.loading) {
                if (this.state.data_block && this.state.data_block.length > 0) {
                    return <FlatList
                        ref={(ref) => this.flatlistRef = ref}
                        style={{ marginTop: 10, marginBottom: 40 }}
                        data={this.state.data_block}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        numColumns={3}
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
        const { countSelect, data_block } = this.state
        return (
            <Container>
                <Header
                    back
                    text='Follower'
                    countSelect={countSelect}
                    countTotal={data_block && data_block.length > 0 ? data_block.length : 0}
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
        this.getDataBlocked();
    }

    onChooseItem = (index) => () => {
        const listItem = this.state.data_block.reduce((prevValue, value, idx) => {
            if (index === idx) {
                value.status_check = !value.status_check
            }
            prevValue.data_block.push(value);
            if (value.status_check) {
                prevValue.count = prevValue.count + 1;
            }
            return prevValue;
        }, { data_block: [], count: 0 })
        this.setState({
            data_block: listItem.data_block,
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

                    default:
                        break;
                }
            });
    }
    onAction = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS_ACTION_FOLLOWER_UNBLOCKED,
            cancelButtonIndex: CANCEL_INDEX_ACTION_FOLLOWER_UNBLOCKED,
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        this.onUnBlock();
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
        let listAllItem = [...this.state.data_block];
        listAllItem.map(item => {
            item.status_check = true
            return item;
        });

        this.setState({
            data_block: listAllItem,
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
        let listAllItem = [...this.state.data_block];
        listAllItem.map(item => {
            item.status_check = false;
            return item;
        });
        this.setState({
            data_block: listAllItem,
            disabled: true,
            countSelect: 0

        })
    }
    onInvertSelect = () => {
        const listAllItem = this.state.data_block.reduce((prevValue, value, idx) => {
            value.status_check = !value.status_check
            prevValue.data_block.push(value);
            if (value.status_check) {
                prevValue.count = prevValue.count + 1;
            }
            return prevValue;
        }, { data_block: [], count: 0 })
        this.setState({
            data_block: listAllItem.data_block,
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
        const dataCheck = this.state.data_block.map(val => val.status_check);
        const minIndex = dataCheck.indexOf(true);
        const maxIndex = dataCheck.lastIndexOf(true);
        const listAllItem = this.state.data_block.reduce((prevValue, value, idx) => {
            if (idx > minIndex && idx < maxIndex) {
                value.status_check = true;
            }
            prevValue.data_block.push(value);
            if (value.status_check) {
                prevValue.count = prevValue.count + 1;
            }
            return prevValue;
        }, { data_block: [], count: 0 })
        this.setState({
            data_block: listAllItem.data_block,
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

    onUnBlock = async () => {
        let listAllItem = [...this.state.data_block];
        // lọc những data nào có status_check = true
        let newList = listAllItem.filter(item => item.status_check).map(value => value.user_id).join(',');

        let user = await database.get(database.KEY.KEY_USER)
        let newUser = JSON.parse(user);

        let objectUser = {
            pk: newList,
            username: newUser.username,
            password: newUser.password
        }

        let CountProfile = newList.split(',')

        Alert.alert(
            'Confirm UnBlocking',
            `Are you sure you want to unblock ${CountProfile.length} profiles`,
            [
                { text: 'No' },
                { text: 'Do it', onPress: () => this.onDoneUnBlock(objectUser) },
            ],
            { cancelable: false }
        )
    }

    onDoneUnBlock = (objectUser) => {
        apis.post(apis.PATH.UN_BLOCKED, objectUser).then(response => {
            if (response.code == Status.SUSSESS) {
                //refresh data 
                const idSelecteds = objectUser.pk.split(',');
                const data_block = [...this.state.data_block]

                const newData = data_block.filter(item => !idSelecteds.includes(item.user_id));

                this.setState({
                    data_block: newData,
                    isVisible: true,
                    textSelect: `UnBlock ${idSelecteds.length} success!`
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
        this.getDataBlocked();
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
        marginTop: height / 3
    },
    textNotData: {
        fontSize: 17,
        fontWeight: '600',
        color: R.colors.white100
    }
})