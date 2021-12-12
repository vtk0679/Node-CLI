const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function updateContactsList(list) {
  fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
}

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  return contacts[idx];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  let deletedContact = null;
  const newContacts = contacts.filter((contact) => {
    if (contact.id === contactId) {
      deletedContact = contact;
      return false;
    } else return true;
  });
  await updateContactsList(newContacts);
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateContactsList(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
