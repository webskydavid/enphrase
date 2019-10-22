import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import * as firestore from 'firebase/firestore';

import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Edit from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

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
      <CssBaseline />
      <Typography variant="h4" component="h4">
        be nev lent
      </Typography>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            20-10-2019
          </Typography>
          <Typography variant="h5" component="h2">
            Github
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <Edit />
          </IconButton>
        </CardActions>
      </Card>
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
