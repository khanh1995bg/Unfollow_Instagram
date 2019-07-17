import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import R from 'res/R';
import NavigationService from 'routers/NavigationService';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const { width } = Dimensions.get('window');

class Header extends PureComponent {
  render() {
    return (
      <View>
        <View style={[styles.container, this.props.headerStyle]}>
          {this.props.menu ? (
            <TouchableOpacity onPress={this.onDrawer}>
              <View style={styles.viewIcon}>
                <Image source={R.images.ic_menu} style={{ width: 18, height: 18 }} />
              </View>
            </TouchableOpacity>
          ) : null}
          {this.props.back ? (
            <TouchableOpacity onPress={this.onBack}>
              <View style={[styles.viewIcon, { marginTop: 3 }]}>
                <Icon name="ios-arrow-back" size={25} color={R.colors.primaryColor} />
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.viewText}>
            <Text style={styles.titleStyle}>{this.props.text}</Text>
          </View>
          {this.props.showCount ? (
            <View style={styles.countSelectStyle}>
              <Text style={styles.countTotalStyle}>{this.props.countSelect}</Text>
              <Text style={styles.countTotalStyle}>/</Text>
              <Text style={styles.countTotalStyle}>{this.props.countTotal}</Text>
            </View>
          ) : null}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
                <Text></Text>
                <Text>Foll</Text>
            </View>
        </View>
      </View>
    );
  }
  onDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  onBack = () => {
    NavigationService.pop();
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewText: {
    width: width - 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    color: R.colors.blackColor,
    fontSize: 22,
    fontWeight: '500'
  },
  countSelectStyle: {
    flexDirection: 'row'
  },
  countTotalStyle: {
    fontSize: 14,
    color: R.colors.white100
  }
});
export default Header;
