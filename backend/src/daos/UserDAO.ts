import User, { UserT } from "../schemas/userS";
const bcrypt = require("bcryptjs");

class UserDAO {
  constructor() {}

  // Retorna un usuario por id
  public async getUserByID(id: string) {}

  // Retorna un usuario por email
  public async getUserByEmail(email: string) {
    return await User.findOne({ email: email });
  }

  // Retorna un usuario por id pero no retorna la contraseña del usuario
  public async getUserNoPwd(userId: string) {
    const user: UserT | null = await User.findOne({ _id: userId });
    if (user == null) {
      return null;
    }
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export { UserDAO };
