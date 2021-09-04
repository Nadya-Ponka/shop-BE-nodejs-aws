'use strict'

import { Client } from 'pg';

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;
const dbOptions = {
	host: PGHOST,
	port: PGPORT,
	database: PGDATABASE,
	user: PGUSER,
	password: PGPASSWORD,
	ssl: {
		rejectUnauthorized: false
	},
	connectionTimeoutMillis: 5000
};

export const getAllProductsFromDatabase = async () => {
	const client = new Client(dbOptions);
	await client.connect();

	const result = await client.query(`SELECT * FROM product_model INNER JOIN stock_model ON product_model.id = stock_model.product_id`);
	client.end();
	return result.rows ? result.rows : null;
}

export const getProductByIdFromDatabase = async (productId) => {
	const client = new Client(dbOptions);
	await client.connect();

	const result = await client.query(`SELECT * FROM (SELECT * FROM product_model WHERE product_model.id='${productId}') product_model INNER JOIN stock_model ON product_model.id=stock_model.product_id`);
	client.end();
	return result.rows[0] ? result.rows[0] : null;
}
