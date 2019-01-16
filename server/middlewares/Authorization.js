import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Authorization {
  static auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ status: 'Failed', message: 'Access denied! No token provided' });

    try {
      const decodedToken = jwt.verify(token, process.env.MY_SECRET_KEY);
      req.aDecodedUser = decodedToken;
      next();
    } catch (ex) {
      res.status(400).json({ status: 'Failed', message: 'Invalid token!' });
    }
  }
}
export default Authorization;
