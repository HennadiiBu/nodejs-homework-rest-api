import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

export const listContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await listContacts(contacts);
  return result;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await listContacts(contacts);
  return newContact;
};

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((task) => task.id === contactId);
  if (contactIndex === -1) {
    throw new Error("Task not found");
  }
  contacts.splice(contactIndex, 1, { ...contacts[contactIndex], ...body });
  return contacts[contactIndex];
};
