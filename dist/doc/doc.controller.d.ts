import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
export declare class DocController {
    private readonly docService;
    constructor(docService: DocService);
    create(createDocDto: CreateDocDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDocDto: UpdateDocDto): string;
    remove(id: string): string;
}
