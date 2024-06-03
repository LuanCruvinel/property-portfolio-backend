import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    this.validateRequiredFields(createClientDto, ['name', 'cpf']);

    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  private validateRequiredFields(dto: any, requiredFields: string[]) {
    const missingFields = requiredFields.filter(field => !dto[field]);

    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`,
      );
    }
  }

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  findOne(id: number): Promise<Client> {
    return this.clientRepository.findOne({ where: { id } });
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.clientRepository.update(id, updateClientDto);
    return this.clientRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
