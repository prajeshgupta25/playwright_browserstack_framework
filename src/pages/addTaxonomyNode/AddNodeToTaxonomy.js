const { expect } = require("@playwright/test");

class AddNodeToTaxonomy {
    constructor(page) {
        this.page = page;
        this.taxonomyStatus = page.getByText('Taxonomy status');
        this.taxonomyStatusBtn = page.locator('.css-1k1mc0e');
        this.taxonomyStatusPlanning = page.getByText('Planning', { exact: true });
        this.taxonomyStatusReview = page.getByText('Review', { exact: true });
        this.taxonomyStatusComplete = page.getByText('Complete', { exact: true });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel', exact: true });
        this.taxonomyUpdateBtn = page.getByTestId('update-btn');
        this.taxonomyMenu = page.getByRole('button', { name: 'taxonomy-terms-menu' });
        this.addNode = page.getByRole('menuitem', { name: 'Add Node', exact: true });
        this.deleteNode = page.getByRole('menuitem', { name: 'Delete Node', exact: true });
        this.nodeName = page.getByLabel('Name*');
        this.nodeDescription = page.getByLabel('Description');
        this.saveBtn = page.getByRole('button', { name: 'Save', exact: true });
        this.nodeMenu = page.getByRole('button', { name: 'taxonomy node actions' });
        this.verifyNodeAddedMsg = page.getByText("Taxonomy term was successfully added!");
        this.verifyNodeDeletedMsg = page.getByText("Taxonomy term was successfully deleted!");
        this.verifyTaxonomyStatusChangeMsg = page.getByText("Taxonomy information was successfully edited!");
    }

    async addNodeToTaxonomy() {
        await expect(this.taxonomyStatus).toBeVisible(); 
        await this.taxonomyStatusBtn.click();
        const boolStatus = await this.taxonomyStatusPlanning.isChecked();
        console.log(boolStatus);
        if(boolStatus){
            await this.cancelBtn.click();
        }
        if(!boolStatus){
            await this.taxonomyStatusPlanning.check();
            await this.taxonomyUpdateBtn.click();
            await expect(this.verifyTaxonomyStatusChangeMsg).toHaveText("Taxonomy information was successfully edited!");
        }
        await this.taxonomyMenu.click();
        await this.addNode.click();
        await this.nodeName.click();
        await this.nodeName.clear();
        await this.nodeName.fill("Parent Node");
        await this.nodeDescription.click();
        await this.nodeDescription.clear();
        await this.nodeDescription.fill("Parent Description");
        await this.saveBtn.click();
        await expect(this.verifyNodeAddedMsg).toHaveText("Taxonomy term was successfully added!");
        await this.page.reload();
        await this.nodeMenu.last().click();
        await this.addNode.click();
        await this.nodeName.click();
        await this.nodeName.clear();
        await this.nodeName.fill("Child Node");
        await this.nodeDescription.click();
        await this.nodeDescription.clear();
        await this.nodeDescription.fill("Child Description");
        await this.saveBtn.click();
        await expect(this.verifyNodeAddedMsg).toHaveText("Taxonomy term was successfully added!");
        await this.taxonomyStatusBtn.click();
        await this.taxonomyStatusReview.check();
        await this.taxonomyUpdateBtn.click();
        await expect(this.verifyTaxonomyStatusChangeMsg).toHaveText("Taxonomy information was successfully edited!");
        await this.nodeMenu.nth(-2).click();
        await this.addNode.click();
        await this.nodeName.click();
        await this.nodeName.clear();
        await this.nodeName.fill("Child Node");
        await this.nodeDescription.click();
        await this.nodeDescription.clear();
        await this.nodeDescription.fill("Child Description");
        await this.saveBtn.click();
        await expect(this.verifyNodeAddedMsg).toHaveText("Taxonomy term was successfully added!");
        await this.taxonomyStatusBtn.click();
        await this.taxonomyStatusComplete.check();
        await this.taxonomyUpdateBtn.click();
        await expect(this.verifyTaxonomyStatusChangeMsg).toHaveText("Taxonomy information was successfully edited!");
        await this.nodeMenu.last().click();
        await expect(this.deleteNode).toBeHidden();
        await this.taxonomyStatusBtn.click();
        await this.taxonomyStatusReview.check();
        await this.taxonomyUpdateBtn.click();
        await expect(this.verifyTaxonomyStatusChangeMsg).toHaveText("Taxonomy information was successfully edited!");
        await this.nodeMenu.last().click();
        await this.deleteNode.click();
        await expect(this.verifyNodeDeletedMsg).toHaveText("Taxonomy term was successfully deleted!");
        await this.taxonomyStatusBtn.click();
        await this.taxonomyStatusComplete.check();
        await this.taxonomyUpdateBtn.click();
        await expect(this.verifyTaxonomyStatusChangeMsg).toHaveText("Taxonomy information was successfully edited!");
        await this.taxonomyMenu.click();
        await this.addNode.click();
        await this.nodeName.click();
        await this.nodeName.clear();
        await this.nodeName.fill("Parent Node");
        await this.nodeDescription.click();
        await this.nodeDescription.clear();
        await this.nodeDescription.fill("Parent Description");
        await this.saveBtn.click();
        await expect(this.verifyNodeAddedMsg).toHaveText("Taxonomy term was successfully added!");
    }
}
module.exports = { AddNodeToTaxonomy };