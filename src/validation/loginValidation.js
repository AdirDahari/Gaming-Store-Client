import Joi from "joi";
import validation from "./validation";

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string()
        .pattern(
            new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/
            )
        )
        .messages({
            "string.pattern.base": "The password must be at least 5 chars long, upper and lower case, and special char",
        })
        .min(5)
        .max(100)
        .required(),
});

const validateLogin = (inputToCheck) => validation(loginSchema, inputToCheck);

export { validateLogin };