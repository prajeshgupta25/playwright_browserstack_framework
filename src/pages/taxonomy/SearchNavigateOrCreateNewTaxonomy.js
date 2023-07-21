const { expect } = require("@playwright/test");

class SearchNavigateOrCreateNewTaxonomy {
    constructor(page, TaxonomyOption, TaxonomyType, Discipline) {
        this.page = page;
        this.searchBar = page.getByPlaceholder('Search by taxonomy name');
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.taxonomyBox = page.getByText(TaxonomyOption, {exact: true });
        this.createTaxonomyBtn = page.getByRole('button', { name: 'Create a Taxonomy' });
        this.dropDown1 = page.getByText('Choose One');
        this.dropDown2 = page.getByPlaceholder('Choose at least one');
        this.typeOption = page.getByRole('option', { name: TaxonomyType, exact: true });
        this.taxonomyName = page.getByLabel('Name*');
        this.taxonomyDescription = page.getByLabel('Description');
        this.taxonomyDiscipline = page.getByRole('option', { name: Discipline, exact: true });
        this.nextBtn = page.getByRole('button', { name: 'Next', exact: true });
        this.createBtn = page.getByRole('button', { name: 'Create', exact: true }); 
        this.taxonomyNotFound = page.getByText("There aren’t any taxonomies here yet");  
    }

    async searchNavigateOrCreateTaxonomy(TaxonomyOption) {
        await this.searchBar.click();
        await this.searchBar.fill(TaxonomyOption);
        await this.searchBtn.click();
        await expect((this.taxonomyBox).or(this.taxonomyNotFound)).toBeVisible(); 
        const bool = await this.taxonomyBox.isVisible();
        console.log(bool);
        if(bool===true) {     
            await this.taxonomyBox.click();
        }
        else {
            await this.createTaxonomy(TaxonomyOption);
        }
    }

    async createTaxonomy(TaxonomyOption) {
        await this.createTaxonomyBtn.click();
        await this.page.waitForLoadState('networkidle');
        await this.taxonomyName.click();
        await this.taxonomyName.fill(TaxonomyOption);
        await this.dropDown1.click();
        await this.typeOption.click(); 
        await this.dropDown2.click();
        await this.taxonomyDiscipline.click();
        await this.taxonomyDescription.click();
        await this.taxonomyDescription.fill("Automation_Test_Data");        
        await this.nextBtn.click();
        await this.createBtn.click();        
    }
}
module.exports = { SearchNavigateOrCreateNewTaxonomy };