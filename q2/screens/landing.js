import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import CryptoJS from 'crypto-js';
import {openDatabase} from 'react-native-sqlite-storage';

import {authenticate} from '../redux/actions/authActions';
import {returnNumbers} from '../utils';

const db = openDatabase({name: 'crypto.db'});

const LandingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isAuth} = useSelector(state => state.authReducer);
  const handleAuthentication = () => {
    dispatch(authenticate);
  };
  const hashedText = text => CryptoJS.SHA512(text, 'secretKey 123').toString();
  console.log('firstly executed');
  const newHashes = returnNumbers(10000).map(item => ({
    item,
    hash: hashedText(String(item)),
  }));
  console.log({newHashes});
  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS crypto(crypto_id INTEGER PRIMARY KEY AUTOINCREMENT, item VARCHAR(255), hash  VARCHAR(255))',
        [],
      );
    });
    console.log('SQLite Database and Table Successfully Created...');
  };
  useEffect(() => {
    createTable();
  }, []);
  useEffect(() => {
    newHashes.map(hash => {
      db.transaction(txn => {
        txn.executeSql('INSERT INTO crypto (item, hash) VALUES (?, ?)', [
          hash.item,
          hash.hash,
        ]);
      });
    });
  }, [newHashes]);
  useEffect(() => {
    navigation.navigate('Video');
  }, [navigation, isAuth]);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => handleAuthentication}>
        <Text>Authenticate</Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingScreen;
