import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView, ActionSheetIOS, Alert } from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import Header from 'libraries/components/Header';
import ListLikeItem from './ListLikeItem';
import R from 'res/R';
import SelectToolbar from 'libraries/components/SelectToolbar/SelectToolbar';
const { width, height } = Dimensions.get('window');
import {
    BUTTONS_LIST, CANCEL_INDEX_LIST,
    BUTTONS_SELECT_LIKE, CANCEL_INDEX_SELECT_LIKE,
    BUTTONS_ACTION_LIKE, CANCEL_INDEX_ACTION_LIKE
} from 'libraries/components/dataButton';
import database from 'libraries/utils/database';
import apis from 'libraries/networking/apis';
import { Status } from 'libraries/networking/status';
import LoadingView from 'libraries/components/LoadingView';
import ModalCheckSuccess from 'libraries/components/ModalcheckSuccess';

export default class LikeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loadingPage: true,
            loading: false,
            disabled: true,
            countSelect: 0,
            isVisible: false,
            textSelect: ''
        };
    }

    componentDidMount() {
        this.getDataLike();
    }

    getDataLike = async () => {
        let user = await database.get(database.KEY.KEY_USER);
        let newUser = JSON.parse(user);

        let objectUser = {
            username: newUser.username,
            password: newUser.password
        }

        apis.fetch(apis.PATH.LIKE, objectUser).then(response => {
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

    _keyExtractor = (item) => item.id.toString();

    _renderItem = ({ item, index }) => {
        return <ListLikeItem item={item} index={index} onChooseItem={this.onChooseItem} />
    }

    _renderFlatlist() {
        if (!this.state.loadingPage) {
            if (!this.state.loading) {
                if (this.state.data && this.state.data.length > 0) {
                    return <FlatList
                        ref={(ref) => this.flatlistRef = ref}
                        style={{ marginTop: 10, marginBottom: 40 }}
                        data={this.state.data}
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
                            <Text style={styles.textNotData}>No Like</Text>
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
                    text='Like'
                    countSelect={countSelect}
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
        this.getDataLike();
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
            options: BUTTONS_SELECT_LIKE,
            cancelButtonIndex: CANCEL_INDEX_SELECT_LIKE,
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
                }
            });
    }
    onAction = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS_ACTION_LIKE,
            cancelButtonIndex: CANCEL_INDEX_ACTION_LIKE,
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        this.onUnLike();
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

    onUnLike = async () => {
        let listAllItem = [...this.state.data];
        // lọc những data nào có status_check = true
        let newList = listAllItem.filter(item => item.status_check).map(value => value.id).join(',');

        let user = await database.get(database.KEY.KEY_USER)
        let newUser = JSON.parse(user);

        let objectUser = {
            id: newList,
            username: newUser.username,
            password: newUser.password
        }

        let CountProfile = newList.split(',')

        Alert.alert(
            'Confirm Unlike',
            `Are you sure you want to unlike ${CountProfile.length} profiles`,
            [
                { text: 'No' },
                { text: 'Do it', onPress: () => this.onDoneUnLike(objectUser) },
            ],
            { cancelable: false }
        )
    }

    onDoneUnLike = (objectUser) => {
        apis.post(apis.PATH.UNLIKE, objectUser).then(response => {
            // Refresh data
            if (response.code == Status.SUSSESS) {
                const idSelecteds = objectUser.id.split(',');
                const data = [...this.state.data]

                const newData = data.filter(item => !idSelecteds.includes(item.id));

                this.setState({
                    data: newData,
                    isVisible: true,
                    textSelect: `Unlike ${idSelecteds.length} success!`
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
        this.getDataLike();
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
