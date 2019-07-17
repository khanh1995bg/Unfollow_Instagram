import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import R from 'res/R';
import SelectToolbarItem from './SelectToolbarItem';
import { getBottomSpace } from 'react-native-iphone-x-helper';

class SelectToolbar extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <SelectToolbarItem name="SELECT" onPress={this.props.onSelect}/>
                <View style={styles.viewStyle} />
                <SelectToolbarItem name="ACTION" onPress={this.props.onAction} textStyle={this.props.textStyle}  disabled={this.props.disabled}/>
                <View style={styles.viewStyle}/>
                <SelectToolbarItem name="LIST" onPress={this.props.onList}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Platform.OS === 'ios' ? getBottomSpace() + 50: 0,
        backgroundColor: R.colors.roughBlack,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0, 
        paddingBottom: Platform.OS === 'ios' ? getBottomSpace(): 0,
        alignItems: 'center',
    },
    viewStyle: {
        width: 1,
        height: 25,
        backgroundColor: R.colors.greyColor,
    }
})
export default SelectToolbar;
