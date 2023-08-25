class CreateProduct {
    constructor(page,Discipline) {
        this.page = page;
        this.createNewProduct = page.getByText('Create a Product');
        this.scratchIcon = page.getByRole('heading', {name: 'From Scratch'});
        this.nextIconBtn = page.getByTestId('WizardActionButtonNext');
        this.producTitle = page.getByLabel('Product Name');
        this.ssoIsbn = page.getByLabel('SSO ISBN');
        this.eReaderIsbn = page.getByLabel('Cengage eReader ISBN');
        this.authors = page.getByLabel('Author');
        this.copyrightYear = page.getByLabel('Copyright Year');
        this.dropDown = page.getByTestId('selectTriggerButton');
        this.platformOption = page.getByRole('option', { name: 'MindTap', exact: true });
        this.disciplineOption = page.getByRole('option', { name: Discipline, exact: true });
        this.editionOption = page.getByRole('option', { name: '1st Edition', exact: true });
        this.selectOptionSetPracticeIt = page.getByText('Practice It');
        this.finishBtn =  page.getByRole('button', { name: /Finish/i });
    }

    async createProduct(ProductTitle, SSOISBN, Author, CopyrightYear, eReaderISBN) {
        await this.createNewProduct.click();
        await this.scratchIcon.click();
        await this.nextIconBtn.click();
        await this.producTitle.click();
        await this.producTitle.type(ProductTitle);
        await this.ssoIsbn.click();
        await this.ssoIsbn.type(SSOISBN);
        await this.eReaderIsbn.click();
        await this.eReaderIsbn.type(eReaderISBN);
        await this.authors.click();
        await this.authors.type(Author);
        await this.dropDown.first().click();
        await this.editionOption.click();
        await this.dropDown.nth(1).click();
        await this.platformOption.click();
        await this.dropDown.nth(2).click();
        await this.disciplineOption.click();        
        await this.copyrightYear.click();
        await this.copyrightYear.type(CopyrightYear);
        await this.nextIconBtn.click();
        await this.selectOptionSetPracticeIt.click();
        await this.finishBtn.click();
        //await this.page.pause();
    }
}
module.exports = { CreateProduct };