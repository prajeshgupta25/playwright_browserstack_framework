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
        this.folderMenu =  page.getByRole('button', { name: /learning path node actions/i });
        this.deleteFolder = page.getByRole('menuitem', { name: 'Delete', exact: true });
    }

    async publishProduct(SSOISBN) {
        await expect(this.publishStateUncommitted).toHaveText("Uncommitted changes ");
        await this.publishIcon.click();
        await this.publishProductBtn.click();
        await expect(this.verifyProductPublishSubmitMsg).toHaveText("Product '"+SSOISBN+"' has been submitted for publish");
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        for(let i=0;i<7;++i) // Currently application is not dynamically refresing publish status, will remove this code once it's implemented
        {
            if(await this.publishStatePublishing.isVisible())
            {
                await this.page.reload(); 
                await this.page.waitForLoadState('networkidle');
                continue;
            }
            else if(await this.publishStateSubmitted.isVisible())
            {
                await this.page.reload(); 
                await this.page.waitForLoadState('networkidle');
                continue;
            }
            else {
                break;
            }     
        }
        await expect(this.publishStatePublished).toHaveText("All changes published");
        await this.folderMenu.first().click();
        await this.deleteFolder.click();
    }
}
module.exports = { PublishProduct };