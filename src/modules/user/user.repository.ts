import CreateUserDTO from "./dto/create-user.dto";
import UpdateUserDTO from "./dto/update-user.dto";
import UserSchema from "./user.model";

export class UserRepository {
  public userSchema = UserSchema;

  public async findByUser(username: string) {
    return await this.userSchema.findOne({ username });
  }

  public async createUser(userDTO: CreateUserDTO) {
    return await this.userSchema.create(userDTO);
  }

  public async findByIdAndDelete(id: string) {
    return await this.userSchema.findByIdAndDelete(id);
  }

  public async findById(id: string) {
    return await this.userSchema.findById(id);
  }

  public async findByIdAndUpdate(id: string, userDTO: UpdateUserDTO) {
    return await this.userSchema.findByIdAndUpdate(id, userDTO, {
      new: true
    });
  }

  public async findOne(username: string, userId: string) {
    const result = await this.userSchema.findOne({
      username,
      _id: { $ne: userId }
    });

    return result;
  }

  public async findAll() {
    return await this.userSchema.find();
  }
}
