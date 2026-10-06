import { test } from '@playwright/test';
import { DatabaseService } from '../../services/DatabaseService';

test('DB Query Test', async () => {

const db = new DatabaseService();

const client = await db.connect();

await client.query('TRUNCATE TABLE REC_UPI_MAC_UREM_DATA;');
const result = await client.query('SELECT * FROM REC_UPI_MAC_UREM_DATA;');

//console.log(result.rows);
console.log(JSON.stringify(result.rows, null, 2));
console.log('Table Truncated Successfully');

await client.end();

});