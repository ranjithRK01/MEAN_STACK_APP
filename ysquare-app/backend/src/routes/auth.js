const express = require('express');
const { managerMiddleware, requireSignin, adminMiddleware } = require('../common-middleware');
const { signup, signin, getCustomerList, getManagerList, getAdminList } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();

router.post('/signup',validateSignupRequest, isRequestValidated, signup);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);
router.get('/customer/list',requireSignin,getCustomerList);
router.get('/manager/list',requireSignin,managerMiddleware,getManagerList);
router.get('/admin/list',requireSignin,adminMiddleware,getAdminList);

module.exports = router;