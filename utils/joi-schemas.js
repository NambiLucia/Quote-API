const Joi=require('joi');
const quoteSchema=Joi.object({

text:Joi.string().min(3).max(250).required(),
category:Joi.string().min(3).max(20).required(),
author:Joi.string().min(3).max(20).required()

})

module.exports ={
    quoteSchema
}