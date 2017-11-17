import React from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/styles';
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      teacher: { },
    }
  }

  _attemptLogin() {
    const successFunc = (responseData) => {
      this.setState({teacher: responseData});
      this.props.navigation.navigate('Home');
    }
    const errorFunc = (error) => {
      console.error(error)
    }
    const params = {
      email: this.state.email,
      password: this.state.password,
    }
    postRequest(APIRoutes.loginPath(), successFunc, errorFunc, params);
  }

  _attemptSignOut() {
    const successFunc = (responseData) => {
      this.setState({teacher: responseData});
      this.props.navigation.navigate('LoginScreen');
    }
    const errorFunc = (error) => {
      console.error(error)
    }
    deleteRequest(APIRoutes.signoutPath(), successFunc, errorFunc);
  }

  render() {

    return (
      <View>
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          onChangeText={(text) => this.setState({email: text})}/>
        <TextInput
          placeholder='Password'
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry/>
        <Button
          onPress={() => {
                  this._attemptLogin.bind(this);
                  this.props.navigation.goBack(this.props.navigation.state.params.parentKey || null);
                  }}
          title='Login'
        />
        <Button
          onPress={() => this.props.navigation.navigate('SignUp')}
          title='Sign Up'
        />
        <Button
          onPress={() => this._attemptSignOut.bind(this)}
          title='Sign Out'
        />

      </View>
    );
  }
}

export default LoginScreen;