import mongoose, { Schema, Document } from 'mongoose';

export interface Contact extends Document {
    name: string;
    email: string;
    message: string;
}

const ContactSchema: Schema = new Schema({
    name:  { type: String, required: true },
    email:  { type: String, required: true },
    message:  { type: String, required: true }
});

const ContactModel = mongoose.model<Contact>('Contact', ContactSchema);
export default ContactModel;
