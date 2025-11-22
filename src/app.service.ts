import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello there my friend how are you doing today!';
  }

  getHi(): string {
    return 'HiIIIIIIII!'
  }
}
