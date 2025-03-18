import Joi from "joi";
import validation from "./validation";

const platformRegex = /xbox|pc|playstation|nintendo/;
const productStatusRegex = /new|like new|used/;

const gameDetailsSchema = Joi.object({
    platform: Joi.string().pattern(platformRegex).required(),
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(256).allow(""),
    cate0: Joi.string().min(2).max(256).required(),
    cate1: Joi.string().allow(""),
    cate2: Joi.string().allow(""),
    productStatus: Joi.string().pattern(productStatusRegex).required(),
    url0: Joi.string().min(5).max(9999).required(),
    url1: Joi.string().min(5).max(9999).allow(""),
    url2: Joi.string().min(5).max(9999).allow(""),
    price: Joi.number().min(1).max(99999).required(),
});

const validateGameDetails = (inputToCheck) =>
    validation(gameDetailsSchema, inputToCheck);

export { validateGameDetails };