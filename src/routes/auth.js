import {
  enforceRequiredUserCredentials,
  enforceRequiredValidSessionId
} from '../common/authentication';
import { requestSessionByUser } from '../controllers/sessionController';
import Session from '../models/session';

const express = require('express');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  enforceRequiredUserCredentials,
  async (req, res) => {
    const session = await requestSessionByUser(req.user);
    res.json(session);
  }
);

router.get(
  '/',
  enforceRequiredValidSessionId,
  async (req, res) => {
    const session = await Session.extendSessionExpiry(req.user);
    res.status(200)
      .json(session);
  }
);

module.exports = router;
