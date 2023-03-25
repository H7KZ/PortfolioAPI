import mongoose, { Schema, type Document } from 'mongoose';

interface Project extends Document {
    name: string;
    lines: number;
    collaborators: number;
    pullRequests: number;
    commits: number;
}

const projectSchema = new Schema<Project>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        lines: {
            type: Number,
            required: true
        },
        collaborators: {
            type: Number,
            required: true
        },
        pullRequests: {
            type: Number,
            required: true
        },
        commits: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<Project>('Project', projectSchema);
