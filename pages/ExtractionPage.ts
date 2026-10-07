import { Page } from "@playwright/test";

export class ExtractionPage {

constructor(private page: Page) {}

async triggerExtraction() {

console.log('Triggering Extraction');
await this.page.getByRole('button', { name: 'Start Extraction Process', exact: true }).click();

console.log('Extraction Triggered');

}

async getStatuses() {

const stageStatus = await this.page.locator("td[id^='stageStatus_']").textContent();

const segregationStatus = await this.page.locator("td[id^='segregationStatus_']").textContent();

const settlementStatus = await this.page.locator("td[id^='setlStatus_']").textContent();

const reportStatus = await this.page.locator("td[id^='extStatus_']").textContent();

return {
stageStatus,
segregationStatus,
settlementStatus,
reportStatus
};
}

async waitForCompletion() {

let isCompleted = false;
while (!isCompleted) {
const statuses = await this.getStatuses();

console.log(statuses);

const values = [
statuses.stageStatus,
statuses.segregationStatus,
statuses.settlementStatus,
statuses.reportStatus
];

if (values.includes('Running')) {
console.log('Process Running...');
await this.page.waitForTimeout(10000);
await this.page.getByRole('button',{ name: 'Refresh' }).click();
continue;
}
isCompleted = true;
}
}

async captureStageCount() {

await this.page.locator('td[id^="stageStatus_"]').click();

const count = await this.page.locator('tr').filter({ has: this.page.locator('strong:text("Data Count")') })
.locator('td').nth(1).textContent();

console.log(`Stage Count = ${count}`);

return Number(count);
}

}