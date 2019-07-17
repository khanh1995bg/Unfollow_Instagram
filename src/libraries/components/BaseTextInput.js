import React, { PureComponent } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Image } from 'react-native';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

class BaseTextInput extends PureComponent {

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <Image
                    source={this.props.nameImage}
                    style={[styles.Imagestyle, this.props.Imagestyle]}
                    resizeMode='cover'
                />
                <TextInput
                    {...this.props}

                    ref={ref => this.textInputRef = ref}
                    placeholder={this.props.placeholder}
                    placeholderTextColor='#8E939B'
                    style={[styles.textInput, this.props.textInput]}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                />
            </View>
        );
    }

    focus = () => {
        this.textInputRef && this.textInputRef.focus()
    }
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.78,
        height: 45,
        backgroundColor: '#1D2636',
        borderRadius: 45 / 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        width: width / 2 + 50,
        color: R.colors.white100,
        fontSize: 15,
        padding: 7,
        paddingLeft: 15,
        fontWeight: '600',
    },
    Imagestyle: {
        width: 25,
        height: 25,
    }
})

export default BaseTextInput;
