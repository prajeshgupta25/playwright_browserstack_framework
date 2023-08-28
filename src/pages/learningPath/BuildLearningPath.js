const { expect } = require("@playwright/test");

class BuildLearningPath {

    constructor(page) {
        this.page = page;
        this.learningPathMenu =  page.getByRole('button', { name: /learning-path-menu/i });
        this.folderMenu =  page.getByRole('button', { name: /learning path node actions/i });
        this.addFolder = page.getByRole('menuitem', { name: 'Add Folder', exact: true });
        this.addActivity = page.getByRole('menuitem', { name: 'Add Activity', exact: true });
        this.addReading = page.getByRole('menuitem', { name: 'Add Reading', exact: true });
        this.activityStub = page.getByText('Activity Stub', {exact: true });
        this.renameActivityStub = page.getByRole('menuitem', { name: 'Rename', exact: true });
        this.renameStubText = page.locator('.css-3ji70b');
        this.createActivityBtn = page.getByText('Create activity');
        this.createItem = page.locator("button[data-authorapi-tooltip='Create item']");
        this.addNew = page.getByRole('button', { name: /Add new/i });
        this.multipleChoiceItem = page.getByText("Multiple choice – standard");
        this.selectAnswer = page.locator('.lrn-mcq-option').first();
        this.saveBtn = page.getByRole('button', { name: /Save/i });
        this.itemAddedMsg = page.getByText("Item successfully added to the Activity");
        this.stubColor = page.locator('.css-1if258x');
        this.backBtn = page.getByRole('button', { name: /Back/i });
        this.createdItem = page.locator('.lrn-list-view-item.lrn-flyout-wrapper');
        this.searchActivitiesBtn = page.getByRole('button', { name: /Search activities/i });
        this.addToLearningPathBtn = page.getByRole('button', { name: /ADD TO LEARNING PATH/i });
        this.verifyActivityAddedMsg = page.getByText("Activity was successfully added");
        this.verifyActivitySaveMsg = page.getByText("Activity was successfully saved");
        this.detailTab = page.locator("[data-authorapi-tooltip='Details']");
        this.itemsTab =  page.getByRole('button', { name: /Items Tab/i });
        this.referenceId = page.locator("#Reference"); 
        this.fillInTheBlankClozeOption = page.getByText('Fill in the Blanks (Cloze)', {exact: true });
        this.fillInTheBlankClozeWithTextItem = page.getByText("Cloze with text", {exact: true }); 
        this.responseField = page.locator('.lrn_cloze_response').first();
        this.classifyMatchAndOrderOption = page.getByText('Classify, Match & Order', {exact: true });
        this.matchListItem = page.getByText("Match list", {exact: true }); 
        this.matchListChoiceA = page.locator("[aria-label='[Choice A]']");
        this.matchListChoiceB = page.locator("[aria-label='[Choice B]']");
        this.matchListChoiceC = page.locator("[aria-label='[Choice C]']"); 
        this.matchListBox = page.locator('.lrn-dragdrop-empty'); 
        this.writtenAndRecordedOption = page.getByText('Written & Recorded', {exact: true });
        this.essayWithTextItem = page.getByText("Essay with plain text", {exact: true }); 
        this.textBox = page.getByRole('textbox', { name: /[This is the stem.]/i });
        this.highlightAndDrawingOption = page.getByText('Highlight and Drawing', {exact: true });
        this.tokenHighlightItem = page.getByText("Token highlight", {exact: true }); 
        this.highlightAnswer = page.getByRole('button', { name: /Risus et tincidunt turpis facilisis./i });
        this.mathOption = page.getByText('Math', {exact: true });
        this.clozeMathItem = page.getByText("Cloze math", {exact: true });
        this.responseDropdown = page.getByText("Response  1", {exact: true });
        this.responseValue = page.locator('.lrn_math_editable.mq-editable-field.mq-math-mode'); 
        this.chemistryOption = page.getByText('Chemistry', {exact: true });
        this.clozeChemistryItem = page.getByText("Cloze chemistry", {exact: true });
        this.otherOption = page.getByText('Other', {exact: true });
        this.ratingItem = page.getByText("Rating", {exact: true });
        this.activityTitle = page.locator("#Title");
        this.addReadingBtn = page.getByRole('button', { name: 'add a reading', exact: true });
        this.readingUnitOption = page.getByText("Unit 3. Business Communications", {exact: true });
        this.addToStubBtn = page.getByRole('button', { name: 'Add to Stub', exact: true });
        this.dropDown = page.getByTestId('selectedItemText');
        this.practiceItOption = page.getByRole('option', { name: 'Practice It', exact: true });
        this.verifyReadingStubText = page.getByText('Unit 3. Business Communications', {exact: true });
        this.generalSettings = page.getByText('General Settings', {exact: true });
        this.searchBar = page.getByPlaceholder('Find by content');
        this.searchBtn = page.getByRole('button', { name: 'Search' });
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
        await this.authorMultipleChoiceStandardActivityItem();
        await this.detailTab.click();
        await this.activityTitle.click();
        await this.activityTitle.type("ActivityTitle");
        const activityReferenceId = await this.referenceId.getAttribute('value');
        console.log(activityReferenceId);
        await this.saveBtn.click();
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.itemsTab.click();
        const changedColor = await this.stubColor.nth(1).evaluate((el) => {
            return getComputedStyle(el).backgroundColor;
        });
        console.log(changedColor);
        expect(initialColor).toBe("rgb(205, 222, 255)")
        expect(changedColor).toBe("rgb(255, 255, 255)")         
        await this.authorFillInTheBlankClozeWithTextActivityItem();
        await this.authorMatchListActivityItem(); 
        await this.authorEssayWithTextActivityItem();  
        await this.authorTokenHighlightActivityItem();
        await this.authorClozeMathActivityItem();
        await this.authorClozeChemistryActivityItem();
        await this.authorRatingActivityItem();       
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
        await this.addReading.click();
        await this.addReadingBtn.click();
        await this.readingUnitOption.click();
        await this.addToStubBtn.click();
        await this.folderMenu.first().click();
        await this.addActivity.click();
        await this.searchActivitiesBtn.click();
        await this.searchBar.click();
        await this.searchBar.fill(activityReferenceId);
        await this.searchBtn.click();
        await this.addToLearningPathBtn.first().click();
        await this.generalSettings.waitFor();
        await this.dropDown.click();
        await this.practiceItOption.click();
        await this.saveBtn.click();
        await this.verifyActivityAddedMsg.hover();
        await expect(this.verifyActivityAddedMsg).toHaveText("Activity was successfully added");
        const stubColor = await this.stubColor.nth(3).evaluate((el) => {
            return getComputedStyle(el).backgroundColor;
        });
        console.log(stubColor);
        expect(stubColor).toBe("rgb(255, 255, 255)")        
    }

    async authorMultipleChoiceStandardActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.multipleChoiceItem.click();
        await this.selectAnswer.waitFor();
        await this.selectAnswer.click();
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await this.backBtn.click();
        const bool = await this.createdItem.isVisible();
        expect(bool).toBeTruthy();
    }

    async authorFillInTheBlankClozeWithTextActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.fillInTheBlankClozeOption.click();
        await this.fillInTheBlankClozeWithTextItem.click();
        await this.responseField.waitFor();
        await this.responseField.click();
        await this.responseField.type("xyz");
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.backBtn.click();
        const bool1 = await this.createdItem.nth(1).isVisible();
        expect(bool1).toBeTruthy();
    }

    async authorMatchListActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.classifyMatchAndOrderOption.click();
        await this.matchListItem.click();
        await this.matchListChoiceA.first().waitFor();
        await this.matchListChoiceA.first().click();
        await this.matchListBox.first().click();
        await this.matchListChoiceB.first().click();
        await this.matchListBox.first().click();
        await this.matchListChoiceC.first().click();
        await this.matchListBox.first().click();
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.backBtn.click();
        const bool2 = await this.createdItem.nth(2).isVisible();
        expect(bool2).toBeTruthy();
    }

    async authorEssayWithTextActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.writtenAndRecordedOption.click();
        await this.essayWithTextItem.click();
        await this.textBox.click();
        await this.textBox.clear();
        await this.textBox.type("Write an essay");
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.backBtn.click();
        const bool3 = await this.createdItem.nth(3).isVisible();
        expect(bool3).toBeTruthy();
    }

    async authorTokenHighlightActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.highlightAndDrawingOption.click();
        await this.tokenHighlightItem.click();
        await this.highlightAnswer.first().click();
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.backBtn.click();
        const bool4 = await this.createdItem.nth(4).isVisible();
        expect(bool4).toBeTruthy();
    }

    async authorClozeMathActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.mathOption.click();
        await this.clozeMathItem.click();
        await this.responseDropdown.click();
        await this.responseValue.first().waitFor();
        await this.responseValue.first().click();
        await this.responseValue.first().type("b + a");
        await this.responseDropdown.click();
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.backBtn.click();
        const bool5 = await this.createdItem.nth(5).isVisible();
        expect(bool5).toBeTruthy();
    }

    async authorClozeChemistryActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.chemistryOption.click();
        await this.clozeChemistryItem.click();
        await this.responseDropdown.click();
        await this.responseValue.first().waitFor();
        await this.responseValue.first().click();
        await this.responseValue.first().type("6CO2 + 6H2O");
        await this.responseDropdown.click();
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.backBtn.click();
        const bool6 = await this.createdItem.nth(6).isVisible();
        expect(bool6).toBeTruthy();
    }

    async authorRatingActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.otherOption.click();
        await this.ratingItem.click();
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.backBtn.click();
        const bool7 = await this.createdItem.nth(7).isVisible();
        expect(bool7).toBeTruthy();
    }
}
module.exports = { BuildLearningPath };