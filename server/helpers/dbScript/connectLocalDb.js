import { Pool } from 'pg';
import dotenv from 'dotenv';
import parseDbUrl from 'parse-database-url';


dotenv.config();


// use the first connection method for development else use the other method
let mode;

if (process.env.NODE_ENV === 'production') {
  mode = parseDbUrl[process.env.DATABASE_NAME];
} else {
  mode = process.env.DATABASE_NAME_TWO;
}
console.log(mode);
const pool = new Pool({
  connectionString: mode
});

const createUsersTable = `DROP TYPE IF EXISTS myrole CASCADE;
CREATE TYPE myrole AS ENUM ('admin','customer');
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    name character varying(70),
    email character varying(70),
    address character varying(70),
    phone character varying(70),
    role myrole default 'customer',
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    password character varying(200),
    PRIMARY KEY (id),
    UNIQUE (id)
); 

  DROP TABLE IF EXISTS menu CASCADE;  
CREATE TABLE IF NOT EXISTS menu (
    id SERIAL,
    name character varying(70),
    imageurl character varying(700),
    description text,
    price INTEGER NOT NULL,
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE (id)
);
   DROP TYPE IF EXISTS catererstatus cascade;  
  CREATE TYPE catererstatus AS ENUM ('New','Processing', 'Cancelled', 'Complete');  
  DROP TABLE IF EXISTS orders CASCADE;    
 CREATE TABLE IF NOT EXISTS orders (
    id SERIAL,
    quantity INTEGER NOT NULL,
    userid INTEGER NOT NULL,
    menuid INTEGER NOT NULL,
    status catererstatus default 'New',
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    FOREIGN KEY (userid) REFERENCES users (id),
    FOREIGN KEY (menuid) REFERENCES menu (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    PRIMARY KEY (id)
);`;

export { pool, createUsersTable };
