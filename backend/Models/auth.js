import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'seller', 'customer'],
    default: 'customer'
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model('User', UserSchema);
export default User;