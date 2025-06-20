import mongoose from 'mongoose';

const embedSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    embedding: {
        type: [Number],
        required: false,
    },
    
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    versionKey: false, // Disable __v field
});

const EmbedModel = mongoose.model('embed', embedSchema);
export default EmbedModel;