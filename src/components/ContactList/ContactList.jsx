import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { nanoid } from 'nanoid';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();

  const handleClick = e => {
    dispatch(deleteContact(e.target.id));
  };

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(contact => {
        return (
          <li className={css.contact} key={nanoid()}>
            <div>
              {contact.name}: {contact.phone}
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
