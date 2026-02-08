import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVariantDto {
  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceOffset?: number;

  @IsInt()
  @Type(() => Number)
  stock: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
