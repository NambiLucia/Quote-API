const validateQuote=(schema)=>{
    return function(req,res,next){
        const {error,value} = schema.validate(req.body)
        if(error) {
            res.json({error})
        }
        else{
            next()
        }
    }
}
module.exports={
    validateQuote
}