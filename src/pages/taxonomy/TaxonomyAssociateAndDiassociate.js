const { expect } = require("@playwright/test");

class TaxonomyAssociateAndDiassociate {
    constructor(page,SSOISBN,TaxonomyType,TaxonomyOption) {
        this.page = page;
        this.dropDown = page.getByTestId('caretDown');
        this.taxonomySettingOption =  page.getByRole('menuitem', { name: /Taxonomy Settings/i });
        this.selectTaxonomyType = page.getByRole('tab', { name: TaxonomyType, exact: true });
        this.taxonomyOption = page.getByText(TaxonomyOption);
        this.taxonomyAssociated = page.getByRole('button', { name: TaxonomyOption });
        this.saveChangesBtn = page.getByRole('button', { name: /Save Changes/i });
        this.verifyProductTaxonomyUpdateMsg = page.getByText("Product "+SSOISBN+" taxonomies updated successfully.");
        this.deleteTaxonomyTag = page.getByRole('button', { name: "Delete "+TaxonomyOption+" tag" });
    }

    async taxonomyAssociateAndDiassociate(SSOISBN,TaxonomyOption) {
        await this.dropDown.last().click();
        await this.taxonomySettingOption.click();
        await this.selectTaxonomyType.click();
        await this.taxonomyOption.click();
        await expect(this.taxonomyAssociated).toHaveText(TaxonomyOption);
        await this.saveChangesBtn.click();
        await expect(this.verifyProductTaxonomyUpdateMsg).toHaveText("Product "+SSOISBN+" taxonomies updated successfully.");
        await this.dropDown.last().click();
        await this.taxonomySettingOption.click();
        await this.deleteTaxonomyTag.click();
        await this.saveChangesBtn.click();
        await expect(this.verifyProductTaxonomyUpdateMsg).toHaveText("Product "+SSOISBN+" taxonomies updated successfully.");
    }
}
module.exports = { TaxonomyAssociateAndDiassociate };