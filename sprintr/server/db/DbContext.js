import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import ProjectSchema from '../models/Project'
import BacklogSchema from '../models/Backlog'
import TaskSchema from '../models/Task'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Project = mongoose.model('Project', ProjectSchema);
  Backlog = mongoose.model('Backlog', BacklogSchema);
  Task = mongoose.model('Backlog', BacklogSchema)
}

export const dbContext = new DbContext()
