import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  sender: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema({
  sender: { type: String, enum: ['user', 'model'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ConversationSchema: Schema<IConversation> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'New Conversation' },
    messages: { type: [MessageSchema], required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
