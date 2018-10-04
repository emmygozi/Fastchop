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


router.get('/all-orders', (req, res) => {
  res.sendFile('/orders.html', { root });
});

router.get('/update-menu/:id', (req, res) => {
  res.sendFile('update-menu.html', { root });
});

router.get('/delete-menu/:id', (req, res) => {
  res.sendFile('delete-menu.html', { root });
});

router.get('/add-quantity/:id', (req, res) => {
  res.sendFile('add-quantity.html', { root });
});

router.get('/processing/:id', (req, res) => {
  res.sendFile('processing-order.html', { root });
});

router.get('/decline/:id', (req, res) => {
  res.sendFile('decline-order.html', { root });
});

router.get('/complete/:id', (req, res) => {
  res.sendFile('complete-order.html', { root });
});


export default router;
