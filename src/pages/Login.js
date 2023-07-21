class Login {
    constructor(page) {
        this.page = page;
        this.myUsername = page.getByPlaceholder('');
        this.myPassword = page.locator("#okta-signin-password");
        this.nextBtn = page.locator("#idp-discovery-submit");
        this.signInBtn = page.locator("#okta-signin-submit");
    }

    async launchProductBuilderURL(PRODUCTBUILDER_URL) {
        await this.page.goto(PRODUCTBUILDER_URL);
        await this.page.waitForLoadState('networkidle');
    }

    async validLogin(username, password) {
        await this.myUsername.fill(username);
        await this.nextBtn.click();
        await this.myPassword.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async launchTaxmanURL(Taxman_URL) {
        await this.page.goto(Taxman_URL);
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { Login };