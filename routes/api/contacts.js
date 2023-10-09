import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} from "../../models/contact.js";
import validateBody from "../../decorators/validateBode.js";
import { Contact } from "../../models/contact.js";

import express from "express";
import HttpError from "../../helpers/HttpErrors.js";
import isValidId from "../../middlewares/isValidId.js";

const contactsAddValidate = validateBody(contactAddSchema);
const contactsUpdateFavoriteValidate = validateBody(
  contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

//...............GET ALL CONTACTS...........................
contactsRouter.get("/", async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
});

//...............GET ONE CONTACT by ID...........................
contactsRouter.get("/:contactId", isValidId, async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId, "-createdAt -updatedAt");

  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json(result);
});

//...............ADD CONTACT...........................
contactsRouter.post("/", contactsAddValidate, async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
});

//...............DELETE ONE CONTACT by ID...........................
contactsRouter.delete("/:contactId", isValidId, async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  res.json(result);
});

//...............UPDATE ONE CONTACT by ID...........................
contactsRouter.put(
  "/:contactId",
  isValidId,
  contactsAddValidate,
  async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    res.json(result);
  }
);

//...............UPDATE ONE CONTACT by ID (FAVORITE)...........................
contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  contactsUpdateFavoriteValidate,
  async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    res.json(result);
  }
);

export default contactsRouter;
