import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import R from 'res/R';

const {width} = Dimensions.get('window');

class ContentEmail extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={styles.titleStyle}>{this.props.title}</Text>

                    <TextInput 
                        placeholder={this.props.placeholder}
                        placeholderTextColor='#DDDDDD'
                        style={[styles.nameStyle, this.props.nameStyle]}
                        value={this.props.textName}
                        onChangeText={this.props.onChangeText}
                    />
                </View>
                {/* {this.props.showButton ?
                    <TouchableOpacity>
                        <View style={styles.viewIcon}>
                            <Image source={R.images.add_IMG} style={styles.imageStyle} />
                        </View>
                    </TouchableOpacity>
                    : null
                } */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.coalGreen,
        marginLeft: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleStyle: {
        color: R.colors.colorTitle,
        paddingVertical: 15,
    },
    nameStyle: {
        color: R.colors.white100,
        fontWeight: '500',
        paddingVertical: 15,
        width: width - 70,
        marginLeft: 10
    },
    viewIcon: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        borderWidth: 1,
        borderColor: R.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    imageStyle: {
        width: 10, 
        height: 10, 
        tintColor: R.colors.primaryColor
    }
})

export default ContentEmail;
