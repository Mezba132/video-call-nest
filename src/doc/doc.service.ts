import { Injectable } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';

@Injectable()
export class DocService {
  create(createDocDto: CreateDocDto) {
    console.log('asdasd');
    return 'This action adds a new doc';
  }

  findAll() {
    return `This action returns all doc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doc`;
  }

  update(id: number, updateDocDto: UpdateDocDto) {
    return `This action updates a #${id} doc`;
  }

  remove(id: number) {
    return `This action removes a #${id} doc`;
  }
}
