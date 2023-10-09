import { Schema, model } from "mongoose";
import Joi from "joi";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" required field`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

contactSchema.pre("findOneAndUpdate", function (next) {
  this.getOptions.runValidators = true;
  next();
});

contactSchema.post("findOneAndUpdate", (error, data, next) => {
  error.status = 400;
  next();
});

export const Contact = model("contact", contactSchema);

// export default Contact;
