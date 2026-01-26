import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';

export class CreateTaskCommentDto {
  @IsInt()
  taskId: number;

  @IsString()
  author: string;

  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  mentions?: string[];
}
