import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger';
import User from '../models/User';
import generateJwt from '../utils/generateJWT';

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).send({ error: true, message: 'User is already registered' });
  }

  try {
    const newUser = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser
      .save()
      .then(logger.info('User Created'))
      .catch((err) => logger.error(`Error in User Creation: ${err}`));

    const token = generateJwt(newUser._id, email);

    res.cookie('token', token, { maxAge: 86400000, httpOnly: true });

    res.send({ error: false, message: token });
  } catch (err) {
    res.send({ error: true, message: 'User Account cannot be created!' });
  }
};