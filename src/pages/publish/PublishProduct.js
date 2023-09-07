const { expect } = require("@playwright/test");

class PublishProduct {
    constructor(page,SSOISBN) {
        this.page = page;
        this.publishStateUncommitted  = page.getByText('Uncommitted changes ');
        this.publishStatePublishing  = page.getByText('Publishing ');
        this.publishStateSubmitted  = page.getByText('Submitted');
        this.publishStatePublished  = page.getByText('All changes published');
        this.publishIcon = page.getByTestId('publish-btn');
        this.publishProductBtn =  page.getByTestId('modal-content').getByRole('button', { name: /Publish Product/i });
        this.verifyProductPublishSubmitMsg = page.getByText("Product '"+SSOISBN+"' has been submitted for publish");
        this.learningPathMenu =  page.getByRole('button', { name: /learning-path-menu/i });
        this.folderMenu =  page.getByRole('button', { name: /learning path node actions/i });
        this.addFolder = page.getByRole('menuitem', { name: 'Add Folder', exact: true });
        this.addActivity = page.getByRole('menuitem', { name: 'Add Activity', exact: true });
        this.deleteFolder = page.getByRole('menuitem', { name: 'Delete', exact: true });
        this.productStatusPlanning = page.getByText('Product status: Planning');     
        this.pencilIcon = page.locator('.css-1k1mc0e');
        this.reviewState = page.getByText('Review', {exact: true });  
        this.updateBtn = page.getByRole('button', { name: /Update/i });
        this.verifyProductUpdatedMsg = page.getByText("Product '"+SSOISBN+"' information updated successfully.");
        this.productStatusReview = page.getByText('Product status: Review');
    }

    async publishProduct(SSOISBN) {
        await expect(this.publishStateUncommitted).toHaveText("Uncommitted changes ");
        await expect(this.productStatusPlanning).toHaveText("Product status: Planning");
        await this.pencilIcon.click();
        await this.reviewState.click();
        await this.updateBtn.click();
        await expect(this.verifyProductUpdatedMsg).toHaveText("Product '"+SSOISBN+"' information updated successfully.");
        await expect(this.productStatusReview).toHaveText("Product status: Review");
        await this.publishIcon.click();
        await this.publishProductBtn.click();
        await expect(this.verifyProductPublishSubmitMsg).toHaveText("Product '"+SSOISBN+"' has been submitted for publish");
        await this.page.reload();
        await this.publishStatePublished.waitFor();
        await expect(this.publishStatePublished).toHaveText("All changes published");
        await this.learningPathMenu.click();
        await this.addFolder.click();
        await this.folderMenu.nth(1).click();
        await this.addActivity.click();
        await this.folderMenu.nth(1).click();
        await this.deleteFolder.click();
    }
}
module.exports = { PublishProduct };