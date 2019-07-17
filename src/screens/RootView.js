import React, { Component } from 'react';
import { View, Text, StyleSheet,  } from 'react-native';
import NoInternetComponent from 'libraries/components/NoInternet/NoInternetComponent';
class RootView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.children}

                <NoInternetComponent />
            </View>
        );
    }


    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default RootView;
