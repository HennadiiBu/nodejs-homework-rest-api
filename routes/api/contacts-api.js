import express from "express";
import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} from "../../utils/validations/contactValidationSchemas.js";
import validateBody from "../../decorators/validateBode.js";
import isValidId from "../../middlewares/isValidId.js";
import contactsController from "../../controllers/contacts-controller.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";

const contactsAddValidate = validateBody(contactAddSchema);
const contactsUpdateFavoriteValidate = validateBody(
  contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

//...............GET ALL CONTACTS...........................
contactsRouter.get("/", contactsController.getAllContacts);

//...............GET ONE CONTACT by ID...........................
contactsRouter.get("/:contactId", isValidId, contactsController.getContactById);

//...............ADD CONTACT...........................
contactsRouter.post(
  "/",
  upload.single("avatar"),
  contactsAddValidate,
  contactsController.addContact
);

//...............DELETE ONE CONTACT by ID...........................
contactsRouter.delete(
  "/:contactId",
  isValidId,
  contactsController.deleteContact
);

//...............UPDATE ONE CONTACT by ID...........................
contactsRouter.put(
  "/:contactId",
  isValidId,
  contactsAddValidate,
  contactsController.updateContact
);

//...............UPDATE ONE CONTACT by ID (FAVORITE)...........................
contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  contactsUpdateFavoriteValidate,
  contactsController.addToFavorite
);

export default contactsRouter;
