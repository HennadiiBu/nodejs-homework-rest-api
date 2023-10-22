import fs from "fs/promises";
import path from "path";
import { Contact } from "../models/contact.js";

import HttpError from "../helpers/HttpErrors.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const avatarsPath = path.resolve("public", "avatars");

//...............GET ALL CONTACTS...........................
const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.params;

  const result = await Contact.find(
    { owner },
    "-createdAt -updatedAt"
  ).populate("owner", "username email");
  res.json(result);
};

//...............GET ONE CONTACT by ID...........................
const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findById(
    { _id: contactId, owner },
    "-createdAt -updatedAt"
  );

  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json(result);
};

//...............ADD CONTACT...........................
const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);

  await fs.rename(oldPath, newPath);

  const avatar = path.join( "avatars", filename);
  const result = await Contact.create({ ...req.body, avatar, owner });
  res.status(201).json(result);
};

//...............DELETE ONE CONTACT by ID...........................
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);
  res.json(result);
};

//...............UPDATE ONE CONTACT by ID...........................
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  res.json(result);
};

//...............UPDATE ONE CONTACT by ID (FAVORITE)...........................
const addToFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, `Movie with ${contactId} not found`);
  }
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  addToFavorite: ctrlWrapper(addToFavorite),
};
