import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Task = new Schema(
  {
    status: { type: String, enums: ['pending', 'in-progress', 'review', 'done'], default: 'pending', required: true },
    weight: { type: Number, required: true },
    projectId: { type: ObjectId, required: true },
    sprintId: { type: ObjectId, required: true },
    backlogItemId: { type: ObjectId, ref: 'Backlog', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
}
)

export default Task
