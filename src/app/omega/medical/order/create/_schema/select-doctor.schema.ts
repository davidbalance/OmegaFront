import Joi from "joi";

const schema = Joi.object({
    doctorDni: Joi.string().empty().required()
});

export default schema;