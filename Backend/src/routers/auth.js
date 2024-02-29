const HomeController = require('../app/Controllers/HomeController');

const router = require('express').Router();

router.post('/Register',HomeController.Register);
router.post('/Login', HomeController.Login)

module.exports = router