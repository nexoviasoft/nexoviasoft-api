import { IsInt, IsString, IsOptional } from 'class-validator';

export class MoveTaskDto {
  @IsInt()
  taskId: number;

  @IsString()
  newColumnId: string;

  @IsInt()
  @IsOptional()
  newOrder?: number;
}
