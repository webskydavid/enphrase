import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
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
  const [itemToUpdate, setItemToUpdate] = useState(false);

  const create = item => {
    setState(s => {
      return {
        ...s,
        items: [...s.items, item]
      };
    });
  };
  const update = (id, payload) => {
    const index = state.items.indexOf(i => i.id === id);
    const item = state.items[index];
    setState(s => ({
      ...s,
      items: [...s.items]
    }));
  };
  const read = () => {
    return state.items;
  };

  const remove = () => {};

  console.log(itemToUpdate);

  return (
    <Context.Provider
      value={{
        create,
        update,
        read,
        remove,
        itemToUpdate,
        setItemToUpdate
      }}
    >
      {children}
    </Context.Provider>
  );
};

const List = () => {
  const { read, setItemToUpdate, itemToUpdate } = useContext(Context);
  const [show, setShow] = useState();

  const handleShow = id => {
    if (show === id) {
      setShow(undefined);
    } else {
      setShow(id);
    }
  };

  return (
    <ul>
      {read().map(item => {
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
  const { create, update, itemToUpdate, setItemToUpdate } = useContext(Context);
  console.log(itemToUpdate);

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
