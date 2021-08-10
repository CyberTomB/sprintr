import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Sprint = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true, default: Date() },
    endDate: { type: Date, required: true },
    isOpen: { type: Boolean, required: true, default: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Sprint.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
}
)

export default Sprint
