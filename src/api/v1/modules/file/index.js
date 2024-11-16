const router = require('express').Router();
const fileController = require('./controller');
const { isAuth, upload } = require('../../middlewares');

router.post('/', isAuth, upload.single('file'), fileController.upload);

module.exports = { router, base: 'files' };
