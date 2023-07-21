const { expect } = require("@playwright/test");

class BuildLearningPath {

    constructor(page) {
        this.page = page;
        this.learningPathMenu =  page.getByRole('button', { name: /learning-path-menu/i });
        this.folderMenu =  page.getByRole('button', { name: /learning path node actions/i });
        this.addFolder = page.getByRole('menuitem', { name: 'Add Folder', exact: true });
        this.addActivity = page.getByRole('menuitem', { name: 'Add Activity', exact: true });
        this.activityStub = page.getByText('Activity Stub', {exact: true });
        this.renameActivityStub = page.getByRole('menuitem', { name: 'Rename', exact: true });
        this.renameStubText = page.locator('.css-3ji70b');
        this.createActivityBtn = page.getByText('Create activity');
        const framesPage = page.frameLocator('.css-zho6g0');
        this.createItem = framesPage.locator("button[data-authorapi-tooltip='Create item']");
        this.addNew = framesPage.getByRole('button', { name: /Add new/i });
        this.multipleChoiceItem = framesPage.getByText("Multiple choice – standard");
        this.selectAnswer = framesPage.locator('.lrn-mcq-option').first();
        this.saveBtn = framesPage.getByRole('button', { name: /Save/i });
        this.itemAddedMsg = framesPage.getByText("Item successfully added to the Activity");
        this.stubColor = page.locator('.css-1if258x');
        this.backBtn = framesPage.getByRole('button', { name: /Back/i });
        this.createdItem = framesPage.locator('.lrn-list-view-item.lrn-flyout-wrapper');
        this.searchActivitiesBtn = page.getByRole('button', { name: /Search activities/i });
        this.addToLearningPathBtn = framesPage.getByRole('button', { name: /ADD TO LEARNING PATH/i });
        this.verifyActivityAddedMsg = page.getByText("Activity was successfully added");
        this.verifyActivitySaveMsg = page.getByText("Activity was successfully saved");
        this.detailTab = framesPage.locator("[data-authorapi-tooltip='Details']");
        this.referenceId = framesPage.locator("#Reference");   
    }

    async addNodesToLearningPath() {
        await this.learningPathMenu.click();
        await this.addFolder.click();
        await this.folderMenu.click();
        await this.addActivity.click();
        const initialColor = await this.stubColor.nth(1).evaluate((el) => {
            return getComputedStyle(el).backgroundColor;
        });
        console.log(initialColor);
        await this.activityStub.click();
        await this.createActivityBtn.click();
        await this.createItem.click();
        await this.addNew.click();
        await this.multipleChoiceItem.click();
        await this.selectAnswer.click();
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        const changedColor = await this.stubColor.nth(1).evaluate((el) => {
            return getComputedStyle(el).backgroundColor;
        });
        console.log(changedColor);
        expect(initialColor).toBe("rgb(205, 222, 255)")
        expect(changedColor).toBe("rgb(255, 255, 255)") 
        await this.backBtn.click();
        const bool = await this.createdItem.isVisible();
        expect(bool).toBeTruthy();
        await this.detailTab.click();
        const activityReferenceId = await this.referenceId.getAttribute('value');
        console.log(activityReferenceId);       
        await this.folderMenu.nth(1).click();
        await this.renameActivityStub.click();
        await this.renameStubText.click();
        await this.renameStubText.type(" Test Activity 1");
        await this.folderMenu.first().click();
        await this.renameActivityStub.click();
        await this.renameStubText.click();
        await this.renameStubText.type(" Test Folder 1");
        await this.folderMenu.nth(1).click();
        await this.folderMenu.first().click();
        await this.addActivity.click();
        await this.searchActivitiesBtn.click();
        await this.addToLearningPathBtn.first().click();
        await this.verifyActivityAddedMsg.hover();
        await expect(this.verifyActivityAddedMsg).toHaveText("Activity was successfully added");
        const stubColor = await this.stubColor.nth(2).evaluate((el) => {
            return getComputedStyle(el).backgroundColor;
        });
        console.log(stubColor);
        expect(stubColor).toBe("rgb(255, 255, 255)")
    }
}
module.exports = { BuildLearningPath };