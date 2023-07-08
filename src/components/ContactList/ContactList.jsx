import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactSlice';
import { nanoid } from 'nanoid';
import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleClick = e => {
    dispatch(deleteContact(e.target.id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(contact => {
        return (
          <li className={css.contact} key={nanoid()}>
            <div>
              {contact.name}: {contact.number}
            </div>
            <button
              className={css.contactButton}
              type="button"
              id={contact.id}
              onClick={handleClick}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;


//LOCAL STORAGE
// const lokalStorageKey = 'phonebook';

//   const someContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },

//   useEffect(() => {
//     const contactsList = JSON.parse(localStorage.getItem(lokalStorageKey));

//   if (contactsList) {
//     dispatch(setContacts(contactsList));
//     console.log(contactsList);
//   }
// }, []);

// useEffect(() => {
//   try {
//     localStorage.setItem(lokalStorageKey, JSON.stringify(contacts));
//         console.log('Dane zapisane w local storage:', contacts);
//   } catch (error) {
//     console.error('Set state error: ', error.message);
//   }
// }, [contacts]);
