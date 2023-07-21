class SearchAndNavigateToProduct {
    constructor(page,ProductTitle) {
        this.page = page;
        this.searchBar = page.getByPlaceholder('Search product title or SSO ISBN');
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.productBox = page.getByText(ProductTitle);
    }

    async searchAndNavigateToProduct(SSOISBN) {
        await this.searchBar.click();
        await this.searchBar.fill(SSOISBN);
        await this.searchBtn.click();
        await this.productBox.click();
    }
}
module.exports = { SearchAndNavigateToProduct };