import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, NetInfo } from 'react-native';

import R from 'res/R';
import FastImage from 'react-native-fast-image';

class NoInternetComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
        };
    }

    componentDidMount() {
        
            NetInfo.isConnected.addEventListener(
                'connectionChange', 
                this.handleConnectivityChange
            );

        
    }

    handleConnectivityChange = isConnected => {
        if(this.state.isConnected !== isConnected){
            this.setState({ isConnected });
        }
        
    };

    render() {
        return (!this.state.isConnected ?
            <View style={styles.offlineContainer}>
                <FastImage
                    source={R.images.bg_cannot_connect}
                    style={styles.imageStyle}
                    resizeMode={FastImage.resizeMode.contain}
                />

                <Text style={styles.textStyle}>{R.strings.NoInternetComponent.no_internet_connection}</Text>
                <Text style={styles.subTextStyle}>{R.strings.NoInternetComponent.pls_check_your_internet_connection}</Text>
            </View>
            :
            <View />)


    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    offlineText: { color: '#fff' },

    textStyle: {
        fontSize: 20,
        color: 'black',
        marginTop: 30
    },

    subTextStyle: {
        fontSize: 16,
        color: '#ccc',
        marginVertical: 10
    },

    imageStyle: {
        width: '80%',
        height: 200
    }
})

export default NoInternetComponent;
