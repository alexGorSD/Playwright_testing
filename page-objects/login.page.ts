import { Locator, type Page } from "playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {

    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;


    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }


}