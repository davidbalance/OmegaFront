import Joi from "joi";

const schema = Joi.object({
    corporativeName: Joi.string().empty().required(),
    companyRuc: Joi.string().empty().required(),
    branchName: Joi.string().empty().required(),
    process: Joi.string().empty().required(),
});

export default schema;


/* 
 {
    corporativeName: string,
    companyName: string,
    companyRuc: string,
    branchName: string,
    process: string
}
*/

