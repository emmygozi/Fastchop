import express from 'express';

const router = express.Router();

const root = 'UI';
router.get('/js/mobileview.js', (req, res) => {
  res.sendFile('/js/mobileview.js', { root });
});

router.get('/client/signup.js', (req, res) => {
  res.sendFile('/client/signup.js', { root });
});

router.get('/client/login.js', (req, res) => {
  res.sendFile('/client/login.js', { root });
});


export default router;
