import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import * as config from './../config';

import { initializeApp } from 'firebase';

const app = initializeApp(config.firebase);

const firestore = app.firestore();

const Context = createContext();

const initData = {
  items: [
    {
      id: 'fwefjhk38r432jf9',
      name: 'Github',
      dateTime: '2019-10-20',
      login: 'test',
      password: 'testing'
    },
    {
      id: 'fwefjhk38r43fff9',
      name: 'Netflix',
      dateTime: '2019-10-20',
      login: 'test',
      password: 'testing'
    }
  ]
};

const DataProvider = ({ children }) => {
  // Dummy data
  const [state, setState] = useState(initData);
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [itemToUpdate, setItemToUpdate] = useState(false);

  const create = async item => {
    //const timestamp = firestore.FieldValue.serverTimestamp;
    setIsFetching(true);
    try {
      const collection = await firestore.collection('/data');
      const doc = collection.doc();
      console.log(doc.id);

      await doc.set({ ...item, dateTime: 323423, id: doc.id });
    } catch (e) {
      setError(e.message);
    }
    setIsFetching(false);
  };

  const update = (id, payload) => {
    const index = state.items.indexOf(i => i.id === id);
    const item = state.items[index];
    setState(s => ({
      ...s,
      items: [...s.items]
    }));
  };

  const read = async () => {
    try {
      const snapshot = await firestore.collection('data').get();
      const data = await snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = () => {};

  console.log(itemToUpdate);

  return (
    <Context.Provider
      value={{
        error,
        items,
        create,
        update,
        read,
        remove,
        itemToUpdate,
        setItemToUpdate,
        isFetching
      }}
    >
      {children}
    </Context.Provider>
  );
};

const List = () => {
  const { read, items, setItemToUpdate, itemToUpdate } = useContext(Context);
  const [show, setShow] = useState();

  useEffect(() => {
    read();
  }, []);

  const handleShow = id => {
    if (show === id) {
      setShow(undefined);
    } else {
      setShow(id);
    }
  };

  return (
    <ul>
      {items.map(item => {
        return (
          <li key={item.id}>
            {item.name} - {item.dateTime}
            {show && show === item.id && item.password + ' ' + item.login}
            <button onClick={() => handleShow(item.id)}>Show</button>
            <button onClick={() => setItemToUpdate(item)}>Edit</button>
            {itemToUpdate.id === item.id ? 'Updating!' : ''}
          </li>
        );
      })}
    </ul>
  );
};

const formInitData = {
  name: '',
  login: '',
  password: ''
};

const Form = () => {
  // set to false
  const [toggle, setToggle] = useState(false);
  const {
    create,
    update,
    isFetching,
    error,
    itemToUpdate,
    setItemToUpdate
  } = useContext(Context);

  const [show, setShow] = useState({
    login: false,
    password: false
  });
  const [form, setForm] = useState(formInitData);

  useEffect(() => {
    if (!toggle) {
      setForm(formInitData);
      setItemToUpdate(false);
    }
  }, [toggle]);

  useEffect(() => {
    if (itemToUpdate) {
      setForm(itemToUpdate);
      setToggle(true);
    }
  }, [itemToUpdate]);

  const handleShow = field => {
    setShow(s => ({ ...s, [field]: !s[field] }));
  };

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;

    setForm(f => {
      return {
        ...f,
        [name]: value
      };
    });
  };

  const handleCreate = () => {
    if (itemToUpdate) {
      update(id, {
        name: form.name,
        login: form.login,
        password: form.password
      });
    } else {
      create({
        id: Date.now(),
        name: form.name,
        dateTime: '2019-10-20',
        login: form.login,
        password: form.password
      });
    }

    setForm(formInitData);
  };

  return (
    <>
      {isFetching && 'Loading...'}
      {error && error}
      <button type="button" onClick={() => setToggle(t => !t)}>
        {toggle ? 'Close' : 'Add new'}
      </button>
      <div style={{ display: toggle ? '' : 'none' }}>
        <h4>Create or Update</h4>
        <label>Name</label>
        <input
          type="text"
          onChange={handleChange}
          value={form.name}
          name="name"
          placeholder="Name"
        />
        <br />
        <label>Login</label>
        <input
          type={show.login ? 'text' : 'password'}
          onChange={handleChange}
          value={form.login}
          name="login"
          placeholder="Login"
        />
        <button onClick={() => handleShow('login')}>Show</button>
        <br />
        <label>Password</label>
        <input
          type={show.password ? 'text' : 'password'}
          onChange={handleChange}
          value={form.password}
          name="password"
          placeholder="password"
        />
        <button onClick={() => handleShow('password')}>Show</button>
        <br />
        <button onClick={handleCreate}>Save</button>
      </div>
    </>
  );
};

function App() {
  return (
    <DataProvider>
      <List />
      <hr />
      <Form />
    </DataProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
