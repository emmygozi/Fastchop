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

router.get('/allentries', (req, res) => {
  res.sendFile('/allentries.html', { root });
});

router.get('/editentries', (req, res) => {
  res.sendFile('/editentries.html', { root });
});


router.get('/lastentry', (req, res) => {
  res.sendFile('/lastentry.html', { root });
});


router.get('/myindex', (req, res) => {
  res.sendFile('/myindex.html', { root });
});

router.get('/makeentry', (req, res) => {
  res.sendFile('/makeentry.html', { root });
});

export default router;
