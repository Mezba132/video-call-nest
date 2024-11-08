import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
export declare class DocService {
    create(createDocDto: CreateDocDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDocDto: UpdateDocDto): string;
    remove(id: number): string;
}
