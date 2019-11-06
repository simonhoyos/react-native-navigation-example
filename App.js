import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  state = {
    text: '',
  };

  handleChange = text => {
    this.setState({ text });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <TextInput
          onChangeText={this.handleChange}
          placeholder="Your name"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('register')}
          />
          <Button
            title="Login"
            onPress={() => navigation.navigate('login', {
              name: this.state.text,
            })}
          />
        </View>
      </View>
    );
  }
}

function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate('home')}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('login', {
          name: 'Simon'
        })}
      />
    </View>
  )
}

class Login extends React.Component {
  static navigationOptions({ navigation }) {
    return {
      title: navigation.getParam('name'),
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Hello {navigation.getParam('name')}</Text>
        <Button
          title="Home"
          onPress={() => navigation.navigate('home')}
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate('register')}
        />
      </View>
    );
  }
}

const Routes = createStackNavigator({
  home: Home,
  register: Register,
  login: Login,
});

const AppContainer = createAppContainer(Routes);

export default function App() {
  return (
    <AppContainer />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  }
});
