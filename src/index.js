import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
const Context = createContext();

const List = () => {
  const context = useContext(Context);
  return (
    <ul>
      <li>
        Github - 19.10.2019 <button>Show</button>
        <button>Edit</button>
      </li>
      <li>Gmail</li>
      <li>Secret note</li>
      <li>Hotmail</li>
    </ul>
  );
};

const Add = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (!toggle) {
      // reset form
    }
  }, [toggle]);

  return (
    <>
      <button type="button" onClick={() => setToggle(t => !t)}>
        Add new
      </button>
      <div style={{ display: toggle ? '' : 'none' }}>
        <input name="name" placeholder="Name" />
        <br />
        <input name="login" placeholder="Login" />
        <br />
        <input name="password" placeholder="password" />
        <br />
        <button>Save</button>
      </div>
    </>
  );
};

function App() {
  return (
    <Context.Provider value={{}}>
      <List />
      <hr />
      <Add />
    </Context.Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
