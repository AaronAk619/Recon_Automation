import { test } from '@playwright/test';
import { ExtractionService } from '../../services/ExtractionService';
import extractionData from '../../data/extractionData.json';

test('UPI NTSL Extraction',async ({ page }) => {

const extraction = new ExtractionService();

await extraction.uploadFile(extractionData.localFilePath, extractionData.remoteFolder);

await extraction.executeQueries(extractionData.truncateQueries);

await page.goto(process.env.APP_URL!);

await extraction.login(page);

await extraction.triggerExtraction(page);

});