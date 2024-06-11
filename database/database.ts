import { User } from 'src/user/entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
import { Property } from 'src/property/entities/property.entity';

const typeOrmConfig = {
  type: 'postgres',
  url: 'postgresql://admin:password@127.0.0.1:5435/nest_project',
  autoLoadEntities: true,
  entities: [User,Client, Property],
  migrations: ['database/migrations/1718066620387-creatinity.ts'],
}
export const getDataBaseInfo = () => typeOrmConfig;

export default typeOrmConfig;