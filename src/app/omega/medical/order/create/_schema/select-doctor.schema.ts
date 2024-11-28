import Joi from "joi";

const schema = Joi.object({
    doctorDni: Joi.string().empty().required()
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

