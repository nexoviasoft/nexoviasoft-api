import { IsString, IsNotEmpty, IsOptional, IsObject, IsEmail, ValidateIf } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  type: string; // 'invoice' or 'letter'

  @IsString()
  @IsOptional()
  template?: string;

  @IsObject()
  @IsNotEmpty()
  data: any; // Document data

  @IsString()
  @IsOptional()
  clientName?: string;

  @ValidateIf((o) => o.clientEmail !== '' && o.clientEmail != null)
  @IsEmail()
  @IsOptional()
  clientEmail?: string;

  @IsString()
  @IsOptional()
  clientAddress?: string;

  @IsString()
  @IsOptional()
  documentNumber?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
