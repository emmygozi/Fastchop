// eslint-disable-next-line
export default (req, res, next) => {
  res.status(404).json({ state: 'Failed', message: 'API route cannot be found' });
};

