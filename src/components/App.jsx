import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(
    () => window.localStorage.setItem('contacts', JSON.stringify(contacts)),
    [contacts]
  );
  const addContact = (name, number) => {
    const added = contacts.some(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (added) {
      Notify.failure(`${name} is already in contacts!`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };
  const filterAll = e => {
    setFilter(e.currentTarget.value);
  };
  const getContacts = () => {
    const filtered = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(filtered));
  };
  const deleteContact = contactId =>
    setContacts(contacts.filter(({ id }) => id !== contactId));
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterAll} />
      <ContactList contacts={getContacts()} deleteContact={deleteContact} />
    </div>
  );
}
