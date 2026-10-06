import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { config } from '../../config/appConfig';

test('Login', async ({ page }) => {

const login = new LoginPage(page);

await page.goto(config.appUrl!);

await login.login(config.username!, config.password!, config.loginAs!);
await expect(page.getByText('Welcome SIT User')).toBeVisible();

});