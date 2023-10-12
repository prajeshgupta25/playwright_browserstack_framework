const { expect } = require("@playwright/test");

class TaxonomyAssociateAndDiassociate {
    constructor(page,SSOISBN,TaxonomyType, TaxonomyType2, TaxonomyType3, TaxonomyOption,TaxonomyOption2, TaxonomyOption3, TaxonomyOption4,ChapterTaxonomyOption,ChapterTaxonomyType) {
        this.page = page;
        this.dropDown = page.getByTestId('caretDown');
        this.learningPathMenu =  page.getByRole('button', { name: /learning-path-menu/i });
        this.taxonomySettingOption =  page.getByRole('menuitem', { name: /Taxonomy Settings/i });
        this.selectTaxonomyType = page.getByRole('tab', { name: TaxonomyType, exact: true });
        this.selectTaxonomyType2 = page.getByRole('tab', { name: TaxonomyType2, exact: true });
        this.selectTaxonomyType3 = page.getByRole('tab', { name: TaxonomyType3, exact: true });
        this.taxonomyOption = page.getByText(TaxonomyOption, {exact: true } );
        this.taxonomyOption2 = page.getByText(TaxonomyOption2, {exact: true });
        this.taxonomyOption3 = page.getByText(TaxonomyOption3, {exact: true });
        this.taxonomyOption4 = page.getByText(TaxonomyOption4, {exact: true });
        this.taxonomyAssociated = page.getByRole('button', { name: TaxonomyOption});
        this.taxonomyAssociated2 = page.getByRole('button', { name: TaxonomyOption2});
        this.taxonomyAssociated3 = page.getByRole('button', { name: TaxonomyOption3});
        this.taxonomyAssociated4 = page.getByRole('button', { name: TaxonomyOption4});
        this.saveChangesBtn = page.getByRole('button', { name: /Save Changes/i });
        this.verifyProductTaxonomyUpdateMsg = page.getByText("Product "+SSOISBN+" taxonomies updated successfully.");
        this.deleteTaxonomyTag = page.getByRole('button', { name: "Delete "+TaxonomyOption2+" tag"});
        this.selectChapterTaxonomyType = page.getByRole('tab', { name: ChapterTaxonomyType, exact: true });
        this.selectChapterTaxonomyOption = page.getByText(ChapterTaxonomyOption, {exact: true } );
        this.chapterTaxonomyAssociated = page.getByRole('button', { name: ChapterTaxonomyOption});
    }

    async taxonomyAssociateAndDiassociate(SSOISBN,TaxonomyOption,TaxonomyOption2,TaxonomyOption3, TaxonomyOption4) {
        await this.dropDown.last().click();
        await this.taxonomySettingOption.click();
        await this.selectTaxonomyType.click();
        await this.taxonomyOption.click();
        await this.taxonomyOption2.click();
        await expect(this.taxonomyAssociated).toHaveText(TaxonomyOption);
        await expect(this.taxonomyAssociated2).toHaveText(TaxonomyOption2);
        await this.selectTaxonomyType2.click();
        await this.taxonomyOption3.click();
        await expect(this.taxonomyAssociated3).toHaveText(TaxonomyOption3);
        await this.selectTaxonomyType3.click();
        await this.taxonomyOption4.click();
        await expect(this.taxonomyAssociated4).toHaveText(TaxonomyOption4);
        await this.saveChangesBtn.click();
        await expect(this.verifyProductTaxonomyUpdateMsg).toHaveText("Product "+SSOISBN+" taxonomies updated successfully.");
        await this.page.reload();
        await this.learningPathMenu.waitFor();
        await this.dropDown.last().click();
        await this.taxonomySettingOption.click();
        await this.deleteTaxonomyTag.click();
        await this.saveChangesBtn.click();
        await expect(this.verifyProductTaxonomyUpdateMsg).toHaveText("Product "+SSOISBN+" taxonomies updated successfully.");
    }

    async associateTaxonomyForTagging(SSOISBN,ChapterTaxonomyOption) {
        await this.dropDown.last().click();
        await this.taxonomySettingOption.click();
        await this.selectChapterTaxonomyType.click();
        await this.selectChapterTaxonomyOption.click();
        await expect(this.chapterTaxonomyAssociated).toHaveText(ChapterTaxonomyOption);
        await this.saveChangesBtn.click();
        await expect(this.verifyProductTaxonomyUpdateMsg).toHaveText("Product "+SSOISBN+" taxonomies updated successfully.");
    }
}
module.exports = { TaxonomyAssociateAndDiassociate };