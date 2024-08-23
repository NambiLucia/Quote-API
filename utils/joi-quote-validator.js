const validateQuote=(schema)=>{
    return function(req,res,next){
        const {error,value} = schema.validate(req.body)
        if(error) {
            res.json({error:error.details[0].message})
        }
        else{
            next()
        }
    }
}


console.log(validateQuote)


module.exports={
    validateQuote
   
}