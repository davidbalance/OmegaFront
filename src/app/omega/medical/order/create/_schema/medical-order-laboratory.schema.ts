import Joi from "joi";

const schema = Joi.object({
    examType: Joi.string().empty().required(),
    examSubtype: Joi.string().empty().required(),
    examName: Joi.string().empty().required(),
});

export default schema;