import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import R from 'res/R';

const { width } = Dimensions.get('window');

class ModalCustom extends PureComponent {

    renderModalContent = () => {
        return (
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text style={styles.titleStyle}>{this.props.title}</Text>
                    <Text style={styles.contentStyle}>{this.props.content}</Text>

                    <View style={styles.viewTextInput}>
                        <TextInput
                            placeholder='Custom number'
                            style={styles.inputStyle}
                            value={this.props.value}
                            onChangeText={this.props.onChangeText}
                        />
                    </View>

                    <View style={styles.viewButton}>
                        <TouchableOpacity
                            onPress={this.props.onLeft}
                        >
                            <View style={styles.buttonStyle}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.props.onRight}
                        >
                            <View style={styles.buttonStyle1}>
                                <Text style={styles.textStyle}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                <Modal isVisible={this.props.isVisible}>
                    {this.renderModalContent()}
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
        width: width - 100
    },
    viewTextInput: {
        width: 200,
        height: 25,
        borderWidth: 0.3,
        borderColor: '#999999',
        marginBottom: 10,

    },
    inputStyle: {
        color: '#333333',
        padding: 5,

    },
    titleStyle: {
        color: '#000',
        fontWeight: '500',
        fontSize: 16,
        paddingTop: 15,
    },
    contentStyle: {
        fontSize: 12,
        color: '#000',
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 15,
        textAlign: 'center'
    },
    viewButton: {
        flexDirection: 'row',
        width: width - 100
    },
    buttonStyle: {
        borderBottomLeftRadius: 10,
        borderWidth: 0.3,
        borderColor: '#CCCCCC',
        width: (width - 100) / 2,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '500'
    },
    buttonStyle1: {
        borderBottomRightRadius: 10,
        borderWidth: 0.3,
        borderColor: '#CCCCCC',
        width: (width - 100) / 2,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: R.colors.primaryColor
    }

})

export default ModalCustom;
