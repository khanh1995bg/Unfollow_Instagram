import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Container from 'libraries/components/AuthTemplate/Airbnb/components/Container';
import Header from 'libraries/components/Header';

class TermsOfService extends PureComponent {
    render() {
        return (
            <Container>
                <Header
                    back
                    text='Term of Use'
                />
                <ScrollView>
                    <View style={styles.wrapper}>
                        <Text style={styles.textStyle}>
                            Unfollow & Clean Mass! Tool is a followers analytics application for Instagram® account
                            holders with the features of unfollow detection, blockers detection, detection of profile interactions and such.
                        </Text>
                       <Text style={styles.textStyle}>
                            You are solely responsible for any activity that occurs through your account.
                            You agree and undertake that you will use Unfollowers !
                            Tool for Instagram© accounts that are legally owned by you and you will not interfere with third party accounts.
                            Unfollowers for Instagram! Tool prohibits the creation of an account for anyone other than yourself.
                            You also represent that all information you provide or provided to CCSoft+ Followers Tool upon registration and at all other times will be true.
                            You agree that you will not solicit,
                            collect or use the login credentials of other Unfollow & Clean Mass! Tool & Instagram © users.
                            You are responsible for keeping your password secret and secure.
                        </Text>
                       <Text style={styles.textStyle}>
                            You may not use the Service for any illegal or unauthorized purpose.
                            You agree to comply with all laws, rules and regulations.
                            You are solely responsible for your conduct and content.

                        </Text>
                       <Text style={styles.textStyle}>
                            You must not access Unfollow & Clean Mass!
                            Tool private API by means other than those permitted.
                            You must not interfere or disrupt the Service or servers or networks connected to the Service,
                            including by transmitting any worms, viruses, spyware,
                            malware or any other code of a destructive or disruptive nature.

                        </Text>
                       <Text style={styles.textStyle}>
                            You must not create accounts with the Service through unauthorized means,
                            including but not limited to, by using an automated device, script, bot, spider, crawler or scraper.

                        </Text>
                       <Text style={styles.textStyle}>
                            Violation of these Terms of Use may, in Unfollow & Clean Mass!
                            Tool’s sole discretion, result in termination of your account.
                            You understand and agree that Unfollow & Clean Mass!
                            Tool cannot and will not be responsible for your actions you use the Service at your own risk.
                            If you violate the letter or spirit of these Terms of Use,
                            or otherwise create risk or possible legal exposure for Unfollow & Clean Mass! Tool,
                            we can stop providing all or part of the Service to you.
                        </Text>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    textStyle: {
        fontSize: 14,
        color: '#000',
        paddingTop: 5,
    }
})
export default TermsOfService;
