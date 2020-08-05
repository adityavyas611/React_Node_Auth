  
import express from 'express';
import { userRegister } from '../controllers/userRegister';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { userLogin } from '../controllers/userLogin';

const router = express.Router();

router.get('/', (req, res) => res.send('User gets created'));

router.post('/register', userRegister);

router.post('/login', userLogin);

router.get('/auth', ensureAuthenticated, (req, res) => {
  res.send('Auth success');
});

export default router;
