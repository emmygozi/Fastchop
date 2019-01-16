import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const generateAuthToken = (id, email, role) => {
  const token = jwt.sign({ id, email, role }, process.env.MY_SECRET_KEY, { expiresIn: 86400 });

  return token;
};
export default generateAuthToken;
