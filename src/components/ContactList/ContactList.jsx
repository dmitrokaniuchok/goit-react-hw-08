import { useSelector, useDispatch } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/slice.js";
import { deleteContact } from "../../redux/contacts/operations.js";

import Contact from "../Contact/Contact.jsx";
import css from "./ContactList.module.css";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={css.container}>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          <Contact
            name={contact.name}
            phone={contact.number}
            onClick={() => handleDelete(contact.id)}
          />
        </li>
      ))}
    </ul>
  );
}
