import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('window');

class SelectToolbarItem extends PureComponent {

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <View style={styles.container}>
          <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    fontWeight: '400',
    fontSize: 14
  }
})

export default SelectToolbarItem;
