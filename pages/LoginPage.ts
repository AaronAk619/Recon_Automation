import { Page } from '@playwright/test';

export class LoginPage {

constructor(private page: Page) {}

async login(app_username: string, app_password: string, app_loginAs: string) {

await this.page.getByRole('link', { name: 'Login', exact: true }).click();

await this.page.locator('[name="userid"]').fill(app_username);
await this.page.locator('[name="password"]').fill(app_password);

await this.page.locator('[name="loginas"]').fill(app_loginAs);
await this.page.getByRole('button', { name: 'Submit' }).click();

}

}