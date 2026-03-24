import { IsString, IsNumber, IsEnum, IsOptional, IsArray } from 'class-validator';
import { MessageSenderType } from '../entities/order-message.entity';

export class CreateOrderMessageDto {
  @IsNumber()
  orderId: number;

  @IsEnum(MessageSenderType)
  senderType: MessageSenderType;

  @IsOptional()
  @IsNumber()
  senderId?: number;

  @IsOptional()
  @IsString()
  senderName?: string;

  @IsOptional()
  @IsString()
  senderAvatar?: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}
