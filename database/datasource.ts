import { DataSource, DataSourceOptions } from 'typeorm';
import { getDataBaseInfo } from 'database/database';

export function createDataSource(): DataSource {
  return new DataSource(getDataBaseInfo() as DataSourceOptions)
}
const dataSource = createDataSource()

export default dataSource;