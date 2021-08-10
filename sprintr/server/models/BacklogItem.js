import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BacklogItem = new Schema(
  {
    name: { type: String, required: true },
    body: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
    projectId: { type: String, ref: 'Project', required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default BacklogItem
