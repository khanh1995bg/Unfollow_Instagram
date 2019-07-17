import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Modal from "react-native-modal";
import R from 'res/R';

class ModalCheckSuccess extends PureComponent {

    renderModalContent() {
        return (
            <View style={styles.wrapper}>
                <Image source={R.images.ic_check} style={styles.imageStyle} />
                <Text style={styles.textStyle}>{this.props.text}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Modal
                    style={styles.modalStyle}
                    animationIn='bounceIn'
                    animationOut='bounceOut'
                    hasBackdrop={false}
                    isVisible={this.props.isVisible}>
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
    modalStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: 150,
        height: 90,
        borderRadius: 10,
        backgroundColor: '#000',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 25,
        height: 25
    },
    textStyle: {
        fontSize: 14,
        color: R.colors.white100,
        paddingTop: 10,
    }
})

export default ModalCheckSuccess;
