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

router.get('/client/savemenu.js', (req, res) => {
  res.sendFile('/client/savemenu.js', { root });
});

router.get('/client/getmenuadmin.js', (req, res) => {
  res.sendFile('/client/getmenuadmin.js', { root });
});

router.get('/client/editmenu.js', (req, res) => {
  res.sendFile('/client/editmenu.js', { root });
});

router.get('/client/updatemenu.js', (req, res) => {
  res.sendFile('/client/updatemenu.js', { root });
});

router.get('/client/deletemenu.js', (req, res) => {
  res.sendFile('/client/deletemenu.js', { root });
});

router.get('/client/homepage.js', (req, res) => {
  res.sendFile('/client/homepage.js', { root });
});

router.get('/client/makeorder.js', (req, res) => {
  res.sendFile('/client/makeorder.js', { root });
});

router.get('/client/getorders.js', (req, res) => {
  res.sendFile('/client/getorders.js', { root });
});

router.get('/client/acceptorders.js', (req, res) => {
  res.sendFile('/client/acceptorders.js', { root });
});

export default router;
