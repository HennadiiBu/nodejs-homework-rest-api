import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../../models/contacts.js";

import express from "express";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

 const result = await getContactById(contactId);
  res.json(result);
});

contactsRouter.post("/", async (req, res, next) => {
  const result = await addContact(req.body);
  res.json(result);
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  res.json(result);
});

contactsRouter.patch("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  res.json(result);
});

export default contactsRouter;
