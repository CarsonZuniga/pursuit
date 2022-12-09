import express from 'express';
import DAppObject from './dapplogic.js';

var router = express.Router();
var dapp = new DAppObject();

router.post('/createUser', dapp.doCreateUser);
router.post('/login', dapp.doLogin);

export default router;