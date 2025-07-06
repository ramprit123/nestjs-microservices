import { isString, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
