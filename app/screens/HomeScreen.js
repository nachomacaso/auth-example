import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import Auth0 from 'react-native-auth0';

const auth0Domain = 'https://nathan-macaso.auth0.com';
const auth0ClientId = 'avkvsKHRsu6D8wurh12LkUkSnAHQHXRm';

const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

export default class HomeScreen extends Component {
  state = {
    meta: {},
    showMeta: false
  }

  // Used to remove the header created by React Navigation
  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    const { token } = this.props.navigation.state.params;
    
    auth0
      .auth
      .userInfo({token: token})
      .then(res => this.getMeta(res))
      .catch(err => console.log(err));
  }

  getMeta = (res) => {
    const { token } = this.props.navigation.state.params;
    const id = res.sub;
    
    auth0
      .users(token)
      .getUser({id: id})
      .then(res => this.setState({ meta: res.userMetadata, showMeta: true }))
      .catch(err => console.log(err));
  }

  render() {
    const {meta, showMeta} = this.state;
    let userInfo;
    if(showMeta) {
      userInfo = (
        <View>
          <Text style={styles.text}>First Name: {meta.first_name}</Text>
          <Text style={styles.text} >Last Name: {meta.last_name}</Text>
          <Text style={styles.text}>Email: {meta.email}</Text>
          <Text style={styles.text}>Phone Number: {meta.phone_number}</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <Image style={styles.image} source={require('../../assets/child.jpg')} />
        <Text style={styles.header}>User Metadata</Text>
        {userInfo}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 80,
    marginLeft: 60,
  },
  image: {
    width: 320,
    height: 200,
    marginTop: 60
  },
  header: {
    fontFamily: 'Helvetica Neue',
    fontSize: 35,
    fontWeight: 'bold',
    padding: 20,
    width: 320,
    backgroundColor: '#052E3B',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Helvetica Neue',
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center'
  }
});