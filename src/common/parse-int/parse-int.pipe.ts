import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    console.log("U IN THE PIPE");
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed: Value is not an integer.');
    }
    return val;
  }
}
