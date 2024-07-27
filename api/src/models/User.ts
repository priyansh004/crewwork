
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    task?: mongoose.Types.ObjectId[]; 
    fullname: string;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    fullname: { type: String, required: true }
},
    {
        timestamps: true 
    });

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
