import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

class LoginButton extends PureComponent {

    static propTypes = {
        iconName: PropTypes.string,
        textButton: PropTypes.string.isRequired,
        containerStyle: PropTypes.object,
        textStyle: PropTypes.object,
        onPress: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
        };


    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.socialButtonStyle, this.props.containerStyle]}>

                {this._renderIconLeft()}
                {this._renderImageLeft()}

                <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.textButton}</Text>
            </TouchableOpacity>
        );
    }

    _renderIconLeft = () => {
        if (!this.props.iconName) return null;
        return <View style={styles.viewIcon}>
            <Icon name={this.props.iconName}
                size={18}
                color={R.colors.primaryColor}
            />
        </View>
    }
    _renderImageLeft = () => {
        if (!this.props.imageName) return null;
        return <View style={styles.viewIcon}>
           <Image 
               source={this.props.imageName}
               style={this.props.imageStyle}
           />
        </View>
    }
}


const styles = StyleSheet.create({
    socialButtonStyle: {
        marginTop: 12,
        backgroundColor: R.colors.white100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        borderRadius: 19,
        width: width * 0.78
    },

    textStyle: {
        color: R.colors.primaryColor,
        fontSize: 16
    },
    viewIcon: {
        position: "absolute", 
        left: 20
    }
});

export default LoginButton;