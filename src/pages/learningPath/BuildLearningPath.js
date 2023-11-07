const { expect } = require("@playwright/test");

class BuildLearningPath {

    constructor(page,ReadingStubOption,SSOISBN) {
        this.page = page;
        this.learningPathMenu =  page.getByRole('button', { name: /learning-path-menu/i });
        this.folderMenu =  page.getByRole('button', { name: /learning path node actions/i });
        this.addFolder = page.getByRole('menuitem', { name: 'Add Folder', exact: true });
        this.addActivity = page.getByRole('menuitem', { name: 'Add Activity', exact: true });
        this.addReading = page.getByRole('menuitem', { name: 'Add Reading', exact: true });
        this.addLTI = page.getByRole('menuitem', { name: 'Add LTI', exact: true });
        this.addSCORM = page.getByRole('menuitem', { name: 'Add SCORM', exact: true });
        this.activityStub = page.getByText('Activity Stub', {exact: true });
        this.activityTitleStub = page.getByText(/ActivityTitle Test Activity/i);
        this.renameActivityStub = page.getByRole('menuitem', { name: 'Edit name & description', exact: true });
        this.renameFolderStub = page.getByRole('menuitem', { name: 'Edit name', exact: true });
        this.renameStubText = page.getByLabel('Name *');
        this.stubDescriptionText = page.getByTestId('Edit name & description').getByLabel('Description', {exact: true });
        this.createActivityBtn = page.getByText('Create activity');
        this.createItem = page.locator("button[data-authorapi-tooltip='Create item']");
        this.addNew = page.getByRole('button', { name: /Add new/i });
        this.multipleChoiceItem = page.getByText("Multiple choice – standard");
        this.selectAnswer = page.locator('.lrn-mcq-option').first();
        this.saveBtn = page.getByRole('button', { name: /Save/i });
        this.saveAndNextBtn = page.getByRole('button', { name: /Save And Next/i });
        this.itemAddedMsg = page.getByText("Item successfully added to the Activity");
        this.stubColor = page.locator('.css-zbgv8c');
        this.backBtn = page.getByRole('button', { name: /Back/i });
        this.createdItem = page.locator('.lrn-list-view-item.lrn-flyout-wrapper');
        this.searchActivitiesBtn = page.getByRole('button', { name: /Search activities/i });
        this.addToLearningPathBtn = page.getByRole('button', { name: /ADD TO LEARNING PATH/i });
        this.verifyActivityAddedMsg = page.getByText("Activity was successfully added");
        this.verifyActivitySaveMsg = page.getByText("Activity was successfully saved");
        this.detailTab = page.getByRole('button', { name: 'Details Tab', exact: true });
        this.tagsTab = page.locator("[data-authorapi-tooltip='Tags']");
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
        this.activityTitle = page.getByPlaceholder('Say something about this activity');
        this.addReadingBtn = page.getByRole('button', { name: 'add a reading', exact: true });
        this.nodeDropDown = page.getByRole('button', { name: 'Expand reading activity node', exact: true });
        this.readingUnitOption = page.getByText(ReadingStubOption, {exact: true });
        this.addToStubBtn = page.getByRole('button', { name: 'Add to Stub', exact: true });
        this.verifyReadingStubAddMsg = page.getByText("Reading was successfully added to stub");
        this.verifyLTIStubAddMsg = page.getByText("LTI Activity was successfully added to stub");
        this.verifySCORMStubAddMsg = page.getByText("SCORM Activity was successfully added to stub");
        this.dropDown = page.getByTestId('selectedItemText');
        this.practiceItOption = page.getByRole('option', { name: 'Practice It', exact: true });
        this.verifyReadingStubText = page.getByText(ReadingStubOption, {exact: true });
        this.generalSettings = page.getByText('General Settings', {exact: true });
        this.searchBar = page.getByPlaceholder('Find by content');
        this.searchBtn = page.getByRole('button', { name: 'Search', exact: true });
        this.inUse = page.getByText('In Use', {exact: true });
        this.activityTitleBtn = page.locator("[data-authorapi-selector='open-activity']");
        this.saveDropDownBtn = page.locator('.lrn-btn-save-dropdown');
        this.duplicateActivityBtn = page.getByRole('button', { name: 'Duplicate Activity', exact: true });
        this.verfiyDuplicateActivityHeading = page.getByRole('heading', { name: 'Duplicate Activity?', exact: true });
        this.duplicateBtn = page.getByRole('button', { name: 'Duplicate', exact: true });
        this.verfiyDuplicateActivityNameHeading = page.getByRole('heading', { name: 'Give Duplicated Activity a New Name', exact: true });
        this.duplicateActivityName = page.getByLabel('Activity Name *');
        this.saveDuplicateActivity = page.getByTestId('duplicate-activity-title-button');
        this.duplicateActivityMsg = page.getByText("Your activity has been successfully duplicated. You can begin editing the duplicated activity below (click to dismiss).");
        this.addCGID = page.getByTestId('externalAppActivityId');
        this.verfiyLTIStubHeading = page.getByRole('heading', { name: 'LTI Stub', exact: true });
        this.verfiySCORMStubHeading = page.getByRole('heading', { name: 'SCORM Stub', exact: true });
        this.productStatusPlanning = page.getByText('Product status: Planning');     
        this.pencilIcon = page.locator('.css-1k1mc0e');
        this.authoringState = page.getByText('Authoring', {exact: true });  
        this.planningState = page.getByText('Planning', {exact: true });  
        this.updateBtn = page.getByRole('button', { name: /Update/i });
        this.verifyProductUpdatedMsg = page.getByText("Product '"+SSOISBN+"' information updated successfully.");
        this.productStatusAuthoring = page.getByText('Product status: Authoring');
        this.structureChangesDisabledBtn = page.getByTestId('structure-changes-disabled');
        this.deleteFolder = page.getByRole('menuitem', { name: 'Delete', exact: true });
        this.composeQuestion = page.getByRole('textbox');
        this.verfiyActivityTagsHeading = page.getByRole('heading', { name: 'Activity Tags', exact: true });
        this.caretDown = page.getByTestId('caretDown');
        this.taxonomyOption = page.getByRole('option', { name: /Medical Assisting: Administrative and Clinical Competencies/i });
        this.tagOption = page.getByText('Unit 1. Introduction to Health Care', {exact: true });
        this.tagOptionRemove = page.getByTestId('remove-term-Unit 1. Introduction to Health Care');
        this.itemTitleBtn = page.getByRole('button', { name: 'Untitled', exact: true });
        this.itemSettingBtn = page.locator("[data-authorapi-selector='settings']");
        this.itemTagsTabBtn = page.getByRole('button', { name: 'Tags', exact: true });
        this.verfiyItemTagsHeading = page.getByRole('heading', { name: 'Item Tags', exact: true });
        this.applyBtn = page.getByRole('button', { name: 'APPLY', exact: true });
        this.crossBtn = page.locator("[data-authorapi-selector='item-settings-exit-button']");
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
        await this.generalSettings.waitFor();
        await this.dropDown.click();
        await this.practiceItOption.click();
        await this.saveAndNextBtn.click();
        await this.createItem.waitFor();
        await this.activityTitle.click();
        await this.activityTitle.type("ActivityTitle");
        await this.authorMultipleChoiceStandardActivityItem();
        await this.detailTab.click();
        const activityReferenceId = await this.referenceId.getAttribute('value');
        console.log(activityReferenceId);
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
        await this.renameStubText.type(" Test Activity "+ Date.now());
        await this.stubDescriptionText.click();
        await this.stubDescriptionText.type("Test Description Activity "+ Date.now());
        await this.saveBtn.nth(1).click();
        await this.folderMenu.first().click();
        await this.renameFolderStub.click();
        await this.renameStubText.click();
        await this.renameStubText.clear();
        await this.renameStubText.type("Test Folder "+ Date.now());
        await this.saveBtn.click();
        await this.folderMenu.nth(1).click();
        await this.addReadingStub();
        await this.addExistingActivityByDuplicateToLPN(activityReferenceId);
        await this.addLTIStub();
        await this.addSCORMStub();
    }

    async authorMultipleChoiceStandardActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.multipleChoiceItem.click();
        await this.composeQuestion.first().click();
        await this.composeQuestion.first().clear();
        await this.composeQuestion.first().type("Testing MCQ");
        await this.selectAnswer.waitFor();
        await this.selectAnswer.click();
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.backBtn.click();
        const bool = await this.createdItem.isVisible();
        expect(bool).toBeTruthy();
    }

    async authorFillInTheBlankClozeWithTextActivityItem() {
        await this.createItem.click();
        await this.addNew.click();
        await this.fillInTheBlankClozeOption.click();
        await this.fillInTheBlankClozeWithTextItem.click();
        await this.composeQuestion.first().click();
        await this.composeQuestion.first().clear();
        await this.composeQuestion.first().type("Testing Fill In The Blank Cloze With Text");
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
        await this.composeQuestion.first().click();
        await this.composeQuestion.first().clear();
        await this.composeQuestion.first().type("Testing Match List");
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
        await this.composeQuestion.first().click();
        await this.composeQuestion.first().clear();
        await this.composeQuestion.first().type("Testing Essay With Text");
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
        await this.composeQuestion.first().click();
        await this.composeQuestion.first().clear();
        await this.composeQuestion.first().type("Testing Token Highlight");
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
        await this.composeQuestion.first().click();
        await this.composeQuestion.first().clear();
        await this.composeQuestion.first().type("Testing Cloze Math");
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
        await this.composeQuestion.first().click();
        await this.composeQuestion.first().clear();
        await this.composeQuestion.first().type("Testing Cloze Chemistry");
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
        await this.composeQuestion.first().click();
        await this.composeQuestion.first().clear();
        await this.composeQuestion.first().type("Testing Rating");
        await this.saveBtn.click();
        await expect(this.itemAddedMsg).toHaveText("Item successfully added to the Activity");
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await this.backBtn.click();
        const bool7 = await this.createdItem.nth(7).isVisible();
        expect(bool7).toBeTruthy();
    }

    async addExistingActivityByDuplicateToLPN(activityReferenceId){
        await this.folderMenu.first().click();
        await this.addActivity.click();
        await this.searchActivitiesBtn.click();
        await this.searchBar.click();
        await this.searchBar.fill(activityReferenceId);
        await this.searchBtn.click();
        await expect(this.inUse.nth(1)).toBeVisible();
        await this.activityTitleBtn.first().click();
        await this.saveDropDownBtn.click();
        await this.duplicateActivityBtn.click();
        await expect(this.verfiyDuplicateActivityHeading).toHaveText("Duplicate Activity?");        
        await this.duplicateBtn.click();
        await expect(this.verfiyDuplicateActivityNameHeading).toHaveText("Give Duplicated Activity a New Name");   
        await this.duplicateActivityName.click();
        await this.duplicateActivityName.type("Test Duplicate Activity "+ Date.now());
        await this.saveDuplicateActivity.click();
        await expect(this.duplicateActivityMsg).toHaveText("Your activity has been successfully duplicated. You can begin editing the duplicated activity below (click to dismiss).");
        await this.detailTab.click();
        const duplicateActivityReferenceId = await this.referenceId.getAttribute('value');
        console.log(duplicateActivityReferenceId);
        expect(duplicateActivityReferenceId).not.toBe(activityReferenceId);
        await this.backBtn.click();
        await this.searchBar.click();
        await this.searchBar.fill(duplicateActivityReferenceId);
        await this.searchBtn.click();        
        await this.addToLearningPathBtn.first().click();
        await this.verifyActivityAddedMsg.hover();
        await expect(this.verifyActivityAddedMsg).toHaveText("Activity was successfully added");
        const stubColor = await this.stubColor.nth(3).evaluate((el) => {
            return getComputedStyle(el).backgroundColor;
        });
        console.log(stubColor);
        expect(stubColor).toBe("rgb(255, 255, 255)")  
    }

    async addReadingStub() {
        await this.folderMenu.first().click();
        await this.addReading.click();
        await this.addReadingBtn.click();
        await this.nodeDropDown.first().click();
        await this.readingUnitOption.click();
        await this.addToStubBtn.click();
        await expect(this.verifyReadingStubAddMsg).toHaveText("Reading was successfully added to stub");
    }

    async addLTIStub() {
        await this.folderMenu.first().click();
        await this.addLTI.click();
        await this.addCGID.click();
        await this.addCGID.type("C40YZG1QGBYNRH8RME569AY45ZNNZZDJ");
        await this.saveBtn.click();  
        await expect(this.verifyLTIStubAddMsg).toHaveText("LTI Activity was successfully added to stub");
        await expect(this.verfiyLTIStubHeading).toHaveText("LTI Stub");
    }

    async addSCORMStub() {
        await this.folderMenu.first().click();
        await this.addSCORM.click();
        await this.addCGID.click();
        await this.addCGID.type("ZZ8QEL1RC1A4T3JEXA9ZHXEX8RCJCYQ4");
        await this.saveBtn.click();     
        await expect(this.verifySCORMStubAddMsg).toHaveText("SCORM Activity was successfully added to stub"); 
        await expect(this.verfiySCORMStubHeading).toHaveText("SCORM Stub");
    }

    async lockLearningPathStructure(SSOISBN){
        await expect(this.productStatusPlanning).toHaveText("Product status: Planning");
        await this.pencilIcon.click();
        await this.authoringState.click();
        await this.updateBtn.click();
        await expect(this.verifyProductUpdatedMsg).toHaveText("Product '"+SSOISBN+"' information updated successfully.");
        await expect(this.productStatusAuthoring).toHaveText("Product status: Authoring");
        await expect(this.structureChangesDisabledBtn).toBeVisible();
        await this.folderMenu.first().click();
        await expect(this.addActivity).toBeDisabled();
        await expect(this.deleteFolder).toBeDisabled(); 
        await this.pencilIcon.click();
        await this.planningState.click();
        await this.updateBtn.click();  
        await expect(this.verifyProductUpdatedMsg).toHaveText("Product '"+SSOISBN+"' information updated successfully.");
        await expect(this.productStatusPlanning).toHaveText("Product status: Planning");
    }

    async associateActivityTag(){
        await this.activityTitleStub.click();
        await this.createItem.waitFor();
        await this.tagsTab.click();
        await expect(this.verfiyActivityTagsHeading).toHaveText("Activity Tags");
        await this.caretDown.last().click();
        await this.taxonomyOption.click();
        await this.tagOption.click();
        await this.saveBtn.click();
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");
        await expect(this.tagOptionRemove).toBeVisible();
        await this.itemsTab.click(); 
    }

    async associateItemTag(){
        await this.itemTitleBtn.first().click(); 
        await this.itemSettingBtn.first().click(); 
        await this.itemTagsTabBtn.click();
        await expect(this.verfiyItemTagsHeading).toHaveText("Item Tags");
        await this.caretDown.last().click();
        await this.taxonomyOption.click();
        await this.tagOption.click();
        await expect(this.tagOptionRemove).toBeVisible();
        await this.applyBtn.click();
        await this.saveBtn.click();
        await expect(this.verifyActivitySaveMsg).toHaveText("Activity was successfully saved");  
        await this.itemSettingBtn.first().click();       
        await this.itemTagsTabBtn.click();
        await expect(this.tagOptionRemove).toBeVisible();
        await this.crossBtn.click();
        await this.backBtn.click();        
    }

}
module.exports = { BuildLearningPath };