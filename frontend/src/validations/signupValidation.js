import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters.",
    "string.max": "Name must be less than 50 characters.",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid email format.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
  role: Joi.string().valid("user", "admin").required().messages({
    "any.only": "Invalid role selected.",
  }),
});

export default signupSchema;
