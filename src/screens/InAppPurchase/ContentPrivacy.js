import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class ContentPrivacy extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row',  alignItems: 'center', marginTop: 5 }}>
                    <Icon name='ios-radio-button-on' size={10} />
                    <Text style={styles.textTitle}>{this.props.title}</Text>
                </View>
                {this.props.textContent ? <Text style={styles.textStyle}>{this.props.content}</Text> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15
    },
    textTitle: {
        paddingLeft: 10,
        fontSize: 14,
        color: '#000',
    },
    textStyle: {
        fontSize: 14,
        color: '#000',
        paddingTop: 2,
        paddingLeft: 20
    }
})

export default ContentPrivacy;
