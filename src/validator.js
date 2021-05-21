const { check, validationResult } = require('express-validator/check');

exports.validateUser = [
    check('username')
    .not().isEmpty()
    .withMessage('Username can not be empty!'),
    check('password')
    .not().isEmpty()
    .withMessage('Password can not be empty!')
    .isLength({ min: 8 })
    .withMessage('Minimum 8 characters required!'),
    check('email')
    .not().isEmpty()
    .withMessage('Email can not be empty!')
    .isEmail(),
    check('phonenum')
    .not().isEmpty()
    .withMessage('Phone number can not be empty!')
    .isMobilePhone(),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
];