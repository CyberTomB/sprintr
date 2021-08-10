import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import ProjectSchema from '../models/Project'
import BacklogItemSchema from '../models/BacklogItem'
import TaskSchema from '../models/Task'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Project = mongoose.model('Project', ProjectSchema);
  BacklogItem = mongoose.model('BacklogItem', BacklogItemSchema);
  Task = mongoose.model('Task', TaskSchema)
}

export const dbContext = new DbContext()
