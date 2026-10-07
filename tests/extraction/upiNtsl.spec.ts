import { test, expect } from '@playwright/test';
import { ExtractionService } from '../../services/ExtractionService';
import extractionData from '../../data/extractionData.json';
import { ExtractionPage } from '../../pages/ExtractionPage';
import {DatabaseService} from '../../services/DatabaseService';

test('UPI NTSL Extraction',async ({ page }) => {

const extraction = new ExtractionService();

await extraction.uploadFile(extractionData.localFilePath, extractionData.remoteFolder);

await extraction.executeQueries(extractionData.truncateQueries);

await page.goto(process.env.APP_URL!);

await extraction.login(page);

await extraction.triggerExtraction(page);

const extractionPage = new ExtractionPage(page);
await extractionPage.waitForCompletion();

const statuses = await extractionPage.getStatuses();

console.log('Final Status',statuses);

if (statuses.stageStatus ==='Completed') {
    console.log('Stage Completed');
}
else {
  console.log('Stage Failed');
}

const stageCount = await extractionPage.captureStageCount();
await expect(page.getByRole('heading', { name: 'Stage Status' })).toBeVisible();

const db = new DatabaseService();
const dbCount =
await db.getCount(`select count (*) from REC_NTSL_UPI_STAGE_T;`);

console.log(`Screen Count = ${stageCount}`);

console.log(`DB Count = ${dbCount}`);

expect(stageCount).toBe(dbCount);

});