import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Task = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enums: ['pending', 'in-progress', 'review', 'done'], default: 'pending', required: true },
    weight: { type: Number, required: true, default: 1 },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    // sprintId: { type: ObjectId, ref: 'Sprint'},
    backlogItemId: { type: ObjectId, ref: 'BacklogItem', required: true },
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
