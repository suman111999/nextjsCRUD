import mongoose, { Schema } from 'mongoose';

interface TopicType {
    title: string,
    desc: string
}
const topicSchema = new Schema<TopicType>(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        desc: {
            type: String,
        }
    }, {
    timestamps: true
}
);

const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema)
export default Topic;

