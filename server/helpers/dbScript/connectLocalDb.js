import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
  database: process.env.LOCAL_DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const mydata = process.env.DATABASE_NAME;

// use the first connection method for development else use the other method
const pool = (process.env.NODE_ENV === 'development') ?
  new Pool(databaseConfig) :
  new Pool({
    connectionString: mydata,
    max: 5,
    number: 0
  });

const createUsersTable = `DROP TYPE IF EXISTS myrole;
CREATE TYPE myrole AS ENUM ('admin','customer');
CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    name character varying(70),
    email character varying(70),
    role myrole default 'customer',
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    password character varying(200),
    PRIMARY KEY (id),
    UNIQUE (id)
);`;

const createMenuTable = `CREATE TABLE IF NOT EXISTS menu (
    id SERIAL,
    name character varying(70),
    imageurl character varying(70),
    description text,
    price INTEGER NOT NULL,
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE (id)
);`;

const createOrdersTable = `DROP TYPE IF EXISTS mystatus;
CREATE TYPE mystatus AS ENUM ('pending','approved', 'declined');
 CREATE TABLE IF NOT EXISTS orders (
    id SERIAL,
    quantity INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    menuid INTEGER NOT NULL,
    status mystatus default 'pending',
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    FOREIGN KEY (userid) REFERENCES users (id),
    FOREIGN KEY (menuid) REFERENCES menu (id),
    PRIMARY KEY (id)
);`;

export { pool, createUsersTable, createMenuTable, createOrdersTable };
