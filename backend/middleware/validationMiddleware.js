const { check, validationResult } = require('express-validator');

    exports.signupValidation = [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
    ];

    exports.signinValidation = [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ];

    exports.validate = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };