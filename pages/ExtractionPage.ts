import { Page } from "@playwright/test";

export class ExtractionPage {

constructor(private page: Page) {}

async triggerExtraction() {

console.log('Triggering Extraction');
await this.page.getByRole('button', { name: 'Start Extraction Process', exact: true }).click();

console.log('Extraction Triggered');

}

}