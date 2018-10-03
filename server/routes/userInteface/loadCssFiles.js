import express from 'express';

const router = express.Router();

const root = 'UI';
router.get('/css/mobileview.css', (req, res) => {
  res.sendFile('/css/mobileview.css', { root });
});

router.get('/css/style.css', (req, res) => {
  res.sendFile('/css/style.css', { root });
});

router.get('/css/switch.css', (req, res) => {
  res.sendFile('/css/switch.css', { root });
});

router.get('/css/toast.css', (req, res) => {
  res.sendFile('/css/toast.css', { root });
});

router.get('/css/mobilecustomerorders.css', (req, res) => {
  res.sendFile('/css/mobilecustomerorders.css', { root });
});

router.get('/css/homestyles.css', (req, res) => {
  res.sendFile('/css/homestyles.css', { root });
});

router.get('/css/customerorders.css', (req, res) => {
  res.sendFile('/css/customerorders.css', { root });
});

router.get('/css/buttonstyles.css', (req, res) => {
  res.sendFile('/css/buttonstyles.css', { root });
});

router.get('/css/mobilehomestyleinput.css', (req, res) => {
  res.sendFile('/css/mobilehomestyleinput.css', { root });
});


export default router;
