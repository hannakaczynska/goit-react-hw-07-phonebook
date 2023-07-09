import { fetchContacts } from 'redux/operations';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectError } from 'redux/selectors';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        {isLoading ? <div>Loading...</div> : <ContactList />}
        {error && <div>Something go wrong... Try again!</div>}
      </div>
    </>
  );
};
