import { Page } from "@playwright/test";

export class HomePage {

constructor(private page: Page) {}

async navigateToUpiNtsl() {

console.log('Opening Extraction Menu');
await this.page.getByRole('link', { name: 'Extraction ', exact: true }).click();

console.log('Opening UPI Menu');
await this.page.getByRole('link', { name: 'UPI', exact: true }).click();

console.log('Opening UPI NTSL Screen');
await this.page.getByRole('link', { name: 'UPI NTSL', exact: true }).click();

}
}