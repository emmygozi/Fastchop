import express from 'express';

const router = express.Router();

const root = 'UI';
router.get('/', (req, res) => {
  res.sendFile('/index.html', { root });
});

router.get('/index', (req, res) => {
  res.sendFile('/index.html', { root });
});

router.get('/signup', (req, res) => {
  res.sendFile('/signup.html', { root });
});

router.get('/login', (req, res) => {
  res.sendFile('/login.html', { root });
});

router.get('/admin-dashboard', (req, res) => {
  res.sendFile('/admin-dashboard.html', { root });
});

router.get('/customer-order-history', (req, res) => {
  res.sendFile('/customer-order-history.html', { root });
});


router.get('/home', (req, res) => {
  res.sendFile('/home.html', { root });
});


router.get('/orders', (req, res) => {
  res.sendFile('/orders.html', { root });
});


export default router;
