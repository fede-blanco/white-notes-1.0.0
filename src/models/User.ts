import{model, models, Schema} from 'mongoose'

export type UserType = {
  name: string,
  email: string,
  image: string,
}

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Date,
})

export const User = models?.User || model('User', userSchema)


