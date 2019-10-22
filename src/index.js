import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import * as firestore from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBTTvqyxmUK1et2ld_hSBdqw3wwsbsDnho',
  authDomain: 'enphrase-dev.firebaseapp.com',
  databaseURL: 'https://enphrase-dev.firebaseio.com',
  projectId: 'enphrase-dev',
  storageBucket: 'enphrase-dev.appspot.com',
  messagingSenderId: '1074324233230',
  appId: '1:1074324233230:web:e1aec0a7d1172af701b05f'
};

firebase.initializeApp(config);

function App() {
  return (
    <>
      <ul>
        <li>Github</li>
        <li>Gmail</li>
        <li>Secret note</li>
        <li>Hotmail</li>
      </ul>
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
