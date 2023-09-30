import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "../../models/contacts.js";

import express from "express";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const id = contactId.slice(1);
  const result = await getContactById(id);
  res.json(result);
});

contactsRouter.post("/", async (req, res, next) => {
  const result = await addContact();
  res.json(result);
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact();
  res.json(result);
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default contactsRouter;
