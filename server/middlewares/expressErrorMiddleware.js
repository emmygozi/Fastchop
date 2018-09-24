
// eslint-disable-next-line
export default (err, req, res, next) => {
  res.status(500).json({ state: 'Failed', message: 'Something failed in your application' });
};

