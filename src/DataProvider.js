import { createContext, useState } from 'react';
import * as config from './../config';
import { initializeApp } from 'firebase';

const app = initializeApp(config.firebase);
const firestore = app.firestore();
const Context = createContext();

const DataProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [itemToUpdate, setItemToUpdate] = useState(false);

  const create = async item => {
    //const timestamp = firestore.FieldValue.serverTimestamp;
    setIsFetching(true);
    try {
      const timestamp = firestore.FieldValue.serverTimestamp;
      const collection = await firestore.collection('/data');
      const doc = collection.doc();
      console.log(doc.id);

      await doc.set({ ...item, dateTime: 323423, id: doc.id });
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
    setIsFetching(false);
  };

  const update = (id, payload) => {};

  const read = async () => {
    try {
      const snapshot = await firestore.collection('data').get();
      const data = await snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(data);
    } catch (e) {
      console.error(e);
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

export default DataProvider;
