import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {
  }

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    this.validateRequiredFields(createPropertyDto, ['name', 'address', 'type']);

    const property = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(property);
  }

  private validateRequiredFields(dto: any, requiredFields: string[]) {
    const missingFields = requiredFields.filter(field => !dto[field]);

    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`,
      );
    }
  }

  findAll(): Promise<Property[]> {
    return this.propertyRepository.find();
  }

  findOne(id: number): Promise<Property> {
    return this.propertyRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    await this.propertyRepository.update(id, updatePropertyDto);
    return this.propertyRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.propertyRepository.delete(id);
  }
}
