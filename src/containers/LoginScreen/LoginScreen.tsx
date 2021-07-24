import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './LoginScreen.styles';
import {useGetDataQuery} from '../../redux/data/data';

type TProps = {};

const LoginScreen = ({}: TProps): JSX.Element => {
  const {data, error, isError, isLoading} = useGetDataQuery();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Hello world!</Text>
        {isLoading && <Text>isLoading</Text>}
        {isError && <Text>isError</Text>}
        <Text>Error: {JSON.stringify(error)}</Text>
        <Text>Response: {JSON.stringify(data)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
