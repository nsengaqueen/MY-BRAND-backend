import { Request, Response } from 'express';
import ContactModel, { Contact } from '../models/contactModel';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, message } = req.body;
        const contact = new ContactModel({ name, email, message });
        const savedContact = await contact.save();
        res.status(201).json({ data: savedContact, message: 'Message submitted successfully!' });
    } catch (error) {
        console.error('Error submitting message:', error);
        res.status(500).send('Internal Server Error');
    }
};
export const findAllMessage = async (req: Request, res: Response) => {
    try {
      const message = await ContactModel.find();

      return res.status(200).json({
        data: message,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  export const  deleteMessage = async (req: Request, res: Response) => {
    const id = req.params.id;

    const message = await ContactModel.findById(id);
    if (!message) {
      return res.status(400).json({
        message: "Id not found",
      });
    } else {
      await ContactModel.findByIdAndDelete(id);
      return res.status(204).json({
        message: "message deleted successfully",
      });
    }
  }

  export const findMessage = async (req: Request, res: Response)=> {
    const message = await ContactModel.findById(req.params.id);
    if (message) {
      return res.status(200).json(message);
    } else {
      return res.status(400).json({ message: "message not found" });
    }
  }