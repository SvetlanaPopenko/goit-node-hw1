const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  console.log("Removed contact");
  return result;
  }

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: nanoid(8) };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
