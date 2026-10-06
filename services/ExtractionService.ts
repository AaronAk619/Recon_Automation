import { Page } from '@playwright/test';
import { DatabaseService } from './DatabaseService';
import { SftpService } from './SftpService';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ExtractionPage } from '../pages/ExtractionPage';
import fs from 'fs';
import { config } from '../config/appConfig';


export class ExtractionService {

private db = new DatabaseService();
private sftp = new SftpService();

async uploadFile(localPath: string, remotePath: string) {

    console.log('[STEP 1] Uploading File');

await this.sftp.connect();
await this.sftp.uploadFile(localPath,remotePath);

console.log('[SUCCESS] File Uploaded');

}

async executeQueries(queries: string[]) {
    console.log('[STEP 2] Executing Queries');

const client = await this.db.connect();

for (const query of queries) {
   await client.query(query);
  console.log(`Executed : ${query}`);
}
await client.end();
}


async login(page: Page) {
    console.log('[STEP 3] Login');

const loginPage = new LoginPage(page);

await loginPage.login(config.username!,config.password!,config.loginAs!);

}

async triggerExtraction(page: Page) {
    console.log('[STEP 4] Trigger Extraction');

const homePage = new HomePage(page);

const extractionPage = new ExtractionPage(page);

await homePage.navigateToUpiNtsl();
await extractionPage.triggerExtraction();
}

}