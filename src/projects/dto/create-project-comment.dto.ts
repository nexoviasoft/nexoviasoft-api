import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';

export class CreateProjectCommentDto {
  @IsInt()
  projectId: number;

  @IsString()
  author: string;

  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  mentions?: string[];
}
