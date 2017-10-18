import { Schema, model } from 'mongoose';
import { Roles } from '../lib/roles';

interface userSchama {
    email: string,
    password?: string,
    firstName: string,
    lastName: string,
    role: string,
    avatarUrl: string
}

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    role: { type: String, default: Roles.user },
    avatarUrl: { type: String, default: '' }
});
const UserEntity = model('user', UserSchema);

export { UserEntity, userSchama }
