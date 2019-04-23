import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import Auth0 from 'react-native-auth0';

const auth0Domain = 'https://nathan-macaso.auth0.com';
const auth0ClientId = 'avkvsKHRsu6D8wurh12LkUkSnAHQHXRm';

const auth0 = new Auth0({ domain: auth0Domain, clientId: auth0ClientId });

export default class SignUp extends React.Component {
  state = {
    first: '',
    last: '',
    phone: '',
    email: '',
    password: ''
  }

  signUp = async () => {
    const {first, last, phone, email, password} = this.state
    const dbConnection = 'Username-Password-Authentication';
    
    auth0
      .auth
      .createUser({
        email: email, 
        password: password, 
        connection: dbConnection, 
        metadata: {
          'first_name': first, 
          'last_name': last, 
          'phone_number': phone,
          'email': email
        }
      })
      .then(res => console.log(res))
      .then(() => this.props.navigation.navigate('Login'))
      .catch(err => console.log(err));
  }

  // Used to remove the header created by React Navigation
  static navigationOptions = {
    header: null
  }

  render() {
    const {first, last, phone, email, password} = this.state;

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <View style={styles.form}>
          <TextField style={styles.input}
            label='First Name'
            value={first}
            onChangeText={ (first) => this.setState({ first: first }) }
          />
          <TextField style={styles.input}
            label='Last Name'
            value={last}
            onChangeText={ (last) => this.setState({ last: last }) }
          />
          <TextField style={styles.input}
            label='Phone Number'
            value={phone}
            onChangeText={ (phone) => this.setState({ phone: phone }) }
          />
          <TextField style={styles.input}
            label='Email Address'
            value={email}
            onChangeText={ (email) => this.setState({ email: email }) }
          />
          <TextField style={styles.input}
            label='Password'
            value={password}
            secureTextEntry
            onChangeText={ (password) => this.setState({ password: password }) }
          />
          <RaisedTextButton style={styles.button} color='#000000' titleColor='#FFFFFF' title='Sign Up' onPress={this.signUp}/>
          <TextButton title='Login' onPress={() => this.props.navigation.navigate('Login')} />
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