const { check, validationResult } = require("express-validator");

exports.validateRequest=[
    check('firstname')
    .notEmpty()
    .withMessage("first name is required"),

    check('lastname')
    .notEmpty()
    .withMessage("last name is required"),

    check("email")
    .isEmail()
    .withMessage("Valid email is required"),

    check("password")
    .isLength({min: 6})
    .withMessage("password must be at least 6 letter required")
]

exports.isRequestValidated= (req,res,next)=>{
    const errors= validationResult(req);
    if(errors.array().length>0){
        return res.send({errro: errors.array()[0].msg})
    }
    next()
}