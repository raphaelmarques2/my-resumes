import { z } from 'zod';

export const signupDtoSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(3),
  })
  .strict();

export type SignupDto = z.infer<typeof signupDtoSchema>;

// export class SignupDto {
//   @IsString()
//   @MinLength(1)
//   @ApiProperty({ minLength: 1 })
//   name!: string;

//   @IsString()
//   @IsEmail()
//   @ApiProperty({ format: 'email' })
//   email!: string;

//   @IsString()
//   @MinLength(3)
//   @ApiProperty({ minLength: 3 })
//   password!: string;
// }
