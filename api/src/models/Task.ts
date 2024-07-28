import mongoose, { Document, Schema } from 'mongoose';

export enum Status {
    Option1 = "to do",
    Option2 = "In progress",
    Option3 = "under review",
    Option4 = "finished"
}
export enum Priority {
    Option1 = "urgent",
    Option2 = "medium",
    Option3 = "low"
}

interface IPost extends Document {
    title: string;
    description?: string;
    status: Status;
    userId: mongoose.Types.ObjectId; // Reference to the User model
    priority?: Priority;
    deadline?: Date;
}

const TaskSchema = new mongoose.Schema<IPost>({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: Object.values(Status),
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    priority: {
        type: String,
        enum: Object.values(Priority),
    },
    deadline: { type: Date }
},
    {
        timestamps: true
    }
);

const PostModel = mongoose.model<IPost>('Task', TaskSchema);

export default PostModel;
