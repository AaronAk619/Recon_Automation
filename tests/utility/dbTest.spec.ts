import { test } from '@playwright/test';
import { DatabaseService } from '../../services/DatabaseService';

test('Database Connection Test', async () => {

const db = new DatabaseService();

const client = await db.connect();

console.log('Database Connected Successfully');

await client.end();

console.log('Database Connection Closed');

});