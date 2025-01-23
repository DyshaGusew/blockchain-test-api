import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseHexPipe implements PipeTransform {
  transform(value: string) {
    const isHex = /^0x[0-9a-fA-F]+$/.test(value);
    if (!isHex) {
      throw new BadRequestException('Invalid hex value, must be a valid hexadecimal string');
    }
    return value;
  }
}