import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import Auth0 from 'react-native-auth0';

const auth0Domain = 'https://nathan-macaso.auth0.com';
const auth0ClientId = 'avkvsKHRsu6D8wurh12LkUkSnAHQHXRm';
const auth0Audience = 'https://nathan-macaso.auth0.com/api/v2/';

const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

export default class Login extends React.Component {
  // Used to remove the header created by React Navigation
  static navigationOptions = {
    header: null
  }

  state = {
    email: '',
    password: '',
    token: ''
  }

  login = async () => {
    const {email, password} = this.state
    const dbConnection = 'Username-Password-Authentication';

    auth0
      .auth
      .passwordRealm({
        username: email, 
        password: password, 
        realm: dbConnection,
        audience: auth0Audience,
        scope: 'read:current_user openid',
      })
      .then(res =>  this.setState({token:res.accessToken}))
      .then(() => this.props.navigation.navigate('Home', {token: this.state.token}))
      .catch(err => console.log(err));
  }

  render() {
    const {email, password} = this.state;

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <View style={styles.form}>
          <TextField style={styles.input}
            label='Email Address'
            value={email}
            onChangeText={ (email) => this.setState({ email: email }) }
          />
          <TextField style={styles.input}
            label='Password'
            secureTextEntry
            value={password}
            onChangeText={ (password) => this.setState({ password: password }) }
          />
          <RaisedTextButton style={styles.button} color='#000000' titleColor='#FFFFFF' title='Login' onPress={this.login}/>
          <TextButton title='Sign Up' onPress={() => this.props.navigation.navigate('SignUp')} />
        </View>
      </View>
    );
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
    marginLeft: 60
  },
  form: {
    width: '80%',
  },
  input: {
    position: 'absolute', 
    right: 0,
    width: '100%'
  },
  button: {
    marginTop: 20
  }
});