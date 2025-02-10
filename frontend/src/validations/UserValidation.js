import Joi from "joi";

// Validation for creating a user
export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").required(),
  profile_image: Joi.any().optional(), // File upload validation (optional)
});

// Validation for editing a user
export const editUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(), // Allow email editing if required
  password: Joi.string().min(6).optional(), // Password is optional during edit
  role: Joi.string().valid("user", "admin").optional(),
  profile_image: Joi.any().optional(), // Profile image update is optional
});
