import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    pic: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    likes: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    replies: [
      {
        userId: {
          type: ObjectId,
          ref: 'User',
        },
        text: String,
        userProfilePic: String,
        username: String,
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
    comments: [commentSchema],
    isDraft: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
