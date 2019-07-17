import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import Header from 'libraries/components/Header';
import R from 'res/R';

class UserGuide extends PureComponent {
    render() {
        return (
            <Container containerStyle={{backgroundColor: 'white'}}>
                <Header
                    back
                    text='Unfollow & Clean Mass'
                    headerStyle={{backgroundColor: R.colors.roughBlack}}
                />
                <ScrollView>
                    <View style={styles.wrapper}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: R.colors.primaryColor, textAlign: 'center' }}>User guide</Text>
                        <Text style={styles.textStyle}>
                            - Instagram has limits on how many actions you can perform per hour. This app does not remove the limits, noone can.
                        </Text>
                        <Text style={styles.textStyle}>
                            - All it can do is to automate the process and keep retrying until all tasks are done.
                        </Text>
                        <Text style={styles.textStyle}>
                            - You need coins to perform tasks (unfollow/block/unlike/etc.). One task costs one coin.
                        </Text>
                        <Text style={styles.textStyle}>
                            - Whitelist contains people that will not be unfollowed or blocked. It avoids accidental actions.
                        </Text>
                        <Text style={styles.titleStyle}>
                            Security:
                        </Text>
                        <Text style={styles.textStyle}>
                            - We do not store your password anywhere.
                        </Text>
                        <Text style={styles.textStyle}>
                            - We do not do anything on behalf of your account without your consent.
                        </Text>
                        <Text style={styles.titleStyle}>
                            Payments:
                        </Text>
                        <Text style={styles.textStyle}>
                            - This app only offers one-time purchases. You pay once, use forever. There is no recurring subscriptions.
                        </Text>
                        <Text style={styles.textStyle}>
                            - If you reinstall the app, you can restore purchases for free.
                        </Text>
                        <Text style={styles.textStyle}>
                            - If you have any question, please feel free to contact us anytime.
                        </Text>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1
    // },
    wrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    textStyle: {
        fontSize: 14,
        color: '#000',
        paddingTop: 10,
    },
    titleStyle: {
        fontSize: 14,
        color: '#000',
        paddingTop: 5,
        fontWeight: '500'
    }
})
export default UserGuide;
