const router = require('express').Router();
const validator = require('./validator');
const ContactController = require('./controller');
// const { isAuth, upload } = require('../../middlewares');

router.post('/', validator.contact, ContactController.contact);

module.exports = router;
