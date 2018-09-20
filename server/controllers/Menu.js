import { Client } from 'pg';
import config from 'config';

const connectionString = config.get('db');
const client = new Client({
  connectionString,
});

client.connect();

