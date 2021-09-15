'use strict'

import { Client } from 'pg';
import { ProductInterface } from './inrerface';

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

export const createNewProduct = async (dataObject: ProductInterface) => {
	let client;

	try {
		client = new Client(dbOptions);
		await client.connect();
		await client.query('BEGIN');
	
		let result = await client.query(`insert into product_model (title, description, price) values ('${dataObject.title}','${dataObject.description}',${ dataObject.price})`);
		const productId = await client.query(`SELECT * FROM product_model WHERE product_model.title='${dataObject.title}' and product_model.description='${dataObject.description}' and product_model.price=${dataObject.price}`);
		result = await client.query(`insert into stock_model (product_id, count) values ('${productId.rows[0].id}',${dataObject.count})`);
	
		await client.query('COMMIT');
		return { message: 'everithing is OK' };
	} catch (error) {
		console.log(error);
		await client.query('ROLLBACK');
	} finally {
		if(client) client.end();
	}
}