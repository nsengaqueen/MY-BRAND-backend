import express from 'express';
import { submitContact,findAllMessage,deleteMessage,findMessage } from '../controllers/contactController';

const router = express.Router();


router.post('/message', submitContact);
router.get('/message',findAllMessage);
router.delete('/message/:id',deleteMessage);
router.get('/message/:id',findMessage);


export default router;
