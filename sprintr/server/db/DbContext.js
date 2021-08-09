import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import ProjectSchema from '../models/Project'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Project = mongoose.model('Project', ProjectSchema);
}

export const dbContext = new DbContext()
