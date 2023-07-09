import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import Notiflix from 'notiflix';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();

  const prevContacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const nameChange = e => {
    setName(e.target.value);
  };

  const phoneChange = e => {
    setPhone(e.target.value);
  };

  const reset = () => {
    setName('');
    setPhone('');
  };

  const findContactPhone = (contacts, number) => {
    return contacts.find(
      contact => contact.phone.replace(/[^\d]/g, '') === number
    );
  };

  const findContactName = (contacts, name) => {
    return contacts.find(contact => contact.name.toLowerCase() === name);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const onlyNumber = phone.replace(/[^\d]/g, '');
    const checkNumber = findContactPhone(prevContacts, onlyNumber);
    const lowerName = name.toLowerCase();
    const checkName = findContactName(prevContacts, lowerName);
    const contact = { name, phone };
    if (!checkNumber && !checkName) {
      dispatch(addContact(contact));
    } else if (checkName) {
      Notiflix.Notify.info(`${name} is already in contacts.`);
    } else if (checkNumber) {
      Notiflix.Notify.info(`${phone} is already in contacts.`);
    }
    reset();
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        id={nameInputId}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={nameChange}
        required
      />
      <label htmlFor={numberInputId}>Number</label>
      <input
        id={numberInputId}
        type="tel"
        name="phone"
        value={phone}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        onChange={phoneChange}
        required
      />
      <button className={css.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
