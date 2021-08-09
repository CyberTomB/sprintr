import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Project = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Project
