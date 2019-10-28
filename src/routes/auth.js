import { enforceRequiredUserCredentials } from '../common/authentication';
import { requestSessionByUser } from '../controllers/sessionController';

const express = require('express');

const router = express.Router({ mergeParams: true });

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.post(
  '/auth',
  enforceRequiredUserCredentials,
  async (req, res) => {
    const session = await requestSessionByUser(req.user);
    res.json(session);
  }
);

module.exports = router;
