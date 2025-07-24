import {prismaClient} from "../application/database";
import { ResponseError } from '../error/response-error';
import { RegisterUserRequest, toUserResponse, UserResponse } from '../model/user.model';
import { UserValidation } from '../validation/user.validation';
import { Validation } from '../validation/validation';
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    const validatedData = Validation.validate(UserValidation.REGISTER, request);

    const totalUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: validatedData.email,
      },
    });

    if (totalUserWithSameEmail != 0) {
      throw new ResponseError(400, 'Email already exists');
    }

    validatedData.password = await bcrypt.hash(validatedData.password, 10);

    const user = await prismaClient.user.create({
      data: validatedData,
    });

    return toUserResponse(user);
  }
}
