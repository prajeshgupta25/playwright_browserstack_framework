const { expect } = require("@playwright/test");

class AddNodeToTaxonomy {
    constructor(page) {
        this.page = page;
        this.taxonomyMenu = page.getByRole('button', { name: 'taxonomy-terms-menu' });
        this.addNode = page.getByRole('menuitem', { name: 'Add Node', exact: true });
        this.nodeName = page.getByLabel('Name*');
        this.nodeDescription = page.getByLabel('Description');
        this.saveBtn = page.getByRole('button', { name: 'Save', exact: true });
        this.nodeMenu = page.getByRole('button', { name: 'taxonomy node actions' });
        this.verifyNodeAddedMsg = page.getByText("Taxonomy term was successfully added!");
    }

    async addNodeToTaxonomy() {
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
    }
}
module.exports = { AddNodeToTaxonomy };