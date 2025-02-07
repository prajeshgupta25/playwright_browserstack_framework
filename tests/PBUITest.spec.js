const {test} = require('../fixture');
const { request } = require('@playwright/test');
const { Login } = require('../src/pages/Login');
const { CreateProduct } = require('../src/pages/product/CreateProduct');
const { BuildLearningPath } = require('../src/pages/learningPath/BuildLearningPath');
const { SearchAndNavigateToProduct } = require('../src/pages/searchProduct/SearchAndNavigateToProduct');
const { TaxonomyAssociateAndDiassociate } = require('../src/pages/taxonomy/TaxonomyAssociateAndDiassociate');
const { PublishProduct } = require('../src/pages/publish/PublishProduct');
const { ApiEndpoints } = require('../src/pages/api/ApiEndpoints');
const VerifyWorkspacePayload = { labels: [{ type: 'ssoIsbn', value: process.env.SSOISBN }] };

let token;
let session;

test.beforeAll(async({browser}) => {
    const context = await browser.newContext();  
    const page = await context.newPage();
    const Log = new Login(page);
    //Fetch PB token and session cookie id
    await Log.loginToFetchPBTokenAndSession(process.env.BASE_URL,process.env.USER_NAME, process.env.PASSWORD);
    const cookie = await context.cookies(process.env.BASE_URL);
    for(let i=0;i<12;i++)
    {
        if(cookie[i].name==="PBS-X-XSRF-TOKEN")
        {
            token = cookie[i].value;
            console.log(token);
            continue;
        }
        if(cookie[i].name==="SESSION")
        {
            session = cookie[i].value;
            console.log(session);
            break;
        }
        else
        {
            continue;
        }
    }
    await page.close();
    });

test(`@PBS_Integration_Scenarios Verify PBS product with SSOISBN and delete it if exists`, async () => {
    const apiContext = await request.newContext();
    const apiEndpoints = new ApiEndpoints(apiContext);
    // Verify Product
    const statusCode = await apiEndpoints.verifyProduct(token,session);
    if (statusCode == "200") {
        // Delete Product
        await apiEndpoints.deleteProduct(token,session);
    }
});

test(`@PBS_Integration_Scenarios Verify PBS product workspace on LCS with SSOISBN and delete it if exists`, async () => {
    const apiContext = await request.newContext();
    const apiEndpoints = new ApiEndpoints(apiContext,VerifyWorkspacePayload);
    //Verify Product Workspace
    const responseJson = await apiEndpoints.verifyProductWorkspace();
    if (responseJson.workspaces[0] !== undefined) {
        const courseMasterWorkspaceId = responseJson.workspaces[0].id;
        console.log("Course Master Workspace Id: "+courseMasterWorkspaceId);
        //Fetch the linked workspace
        const linkedResourceWorkspaceId = await apiEndpoints.fetchLinkedWorkspace(courseMasterWorkspaceId);
        console.log("Linked Resource Workspace Id: "+linkedResourceWorkspaceId);
        // Delete the linked resource workspace
        await apiEndpoints.deleteWorkspace(linkedResourceWorkspaceId);
        // Delete the course master workspace
        await apiEndpoints.deleteWorkspace(courseMasterWorkspaceId);
    }
});

test(`@PBS_Integration_Scenarios PB_UI Create Product, add nodes to learning path and add activity & items`, async ({ page }) => {

    const Log = new Login(page);
    const CreateProd = new CreateProduct(page,process.env.Discipline);
    const SearchProd = new SearchAndNavigateToProduct(page,process.env.ProductTitle);
    const BuildLPN = new BuildLearningPath(page,process.env.ReadingStubOption,process.env.SSOISBN);
    const Taxonomy = new TaxonomyAssociateAndDiassociate(page,process.env.SSOISBN,process.env.TaxonomyType,process.env.TaxonomyType2,process.env.TaxonomyOption,process.env.TaxonomyOption2,process.env.TaxonomyOption3);
    //Launch the PB URL
    await Log.launchProductBuilderURL(process.env.BASE_URL);
    //Login with Valid credentials
    await Log.validLogin(process.env.USER_NAME, process.env.PASSWORD);
    //Create a new Product
    await CreateProd.createProduct(process.env.ProductTitle, process.env.SSOISBN, process.env.Author, process.env.CopyrightYear, process.env.eReaderISBN);
    //Add nodes to Learning Path
    await BuildLPN.addNodesToLearningPath();
    //Associate Activity Tag
    await BuildLPN.associateActivityTag();
     //Associate Item Tag
     await BuildLPN.associateItemTag();
    //Validate Locked Learning path
    await BuildLPN.lockLearningPathStructure(process.env.SSOISBN);
});

test(`@PBS_Integration_Scenarios Validate associate and diassociate taxonomy`, async ({ page }) => {

    const Log = new Login(page);
    const SearchProd = new SearchAndNavigateToProduct(page,process.env.ProductTitle);
    const Taxonomy = new TaxonomyAssociateAndDiassociate(page,process.env.SSOISBN,process.env.TaxonomyType,process.env.TaxonomyType2,process.env.TaxonomyOption,process.env.TaxonomyOption2,process.env.TaxonomyOption3);
    //Launch the PB URL
    await Log.launchProductBuilderURL(process.env.BASE_URL);
    //Login with Valid credentials
    await Log.validLogin(process.env.USER_NAME, process.env.PASSWORD);
    //Search and Navigate to the existing Product
    await SearchProd.searchAndNavigateToProduct(process.env.SSOISBN);
    //Associate and diassociate taxonomy
    await Taxonomy.taxonomyAssociateAndDiassociate(process.env.SSOISBN,process.env.TaxonomyOption,process.env.TaxonomyOption2,process.env.TaxonomyOption3);
});


test(`@PBS_Integration_Scenarios Validate Publish product and created files on CM & RS Workspace`, async ({ page }) => {

    const Log = new Login(page);
    const SearchProd = new SearchAndNavigateToProduct(page,process.env.ProductTitle);
    const BuildLPN = new BuildLearningPath(page,process.env.ReadingStubOption,process.env.SSOISBN);
    const Publish = new PublishProduct(page,process.env.SSOISBN);
    //Launch the PB URL
    await Log.launchProductBuilderURL(process.env.BASE_URL);
    //Login with Valid credentials
    await Log.validLogin(process.env.USER_NAME, process.env.PASSWORD);
    //Search and Navigate to the existing Product
    await SearchProd.searchAndNavigateToProduct(process.env.SSOISBN);
    //Validate Publish product
    await Publish.publishProduct(process.env.SSOISBN);
    //Validate files on CM and RS Workspace
    const apiContext = await request.newContext();
    const apiEndpoints = new ApiEndpoints(apiContext,VerifyWorkspacePayload);
    //Verify Product Workspace
    const responseJson = await apiEndpoints.verifyProductWorkspace();
    const courseMasterWorkspaceId = responseJson.workspaces[0].id;
    console.log(courseMasterWorkspaceId);
    //Fetch the linked workspace
    const linkedResourceWorkspaceId = await apiEndpoints.fetchLinkedWorkspace(courseMasterWorkspaceId);
    console.log(linkedResourceWorkspaceId);
    //Validate the created cdf, gdf, ndf, txn, activity and mmap files from the latest checkpoint on LCS
    await apiEndpoints.validateCourseMasterWorkspaceCreatedFilesFromLCS(courseMasterWorkspaceId);
    //Validate the CM workspace is deployed successfully
    await apiEndpoints.validateWorkspaceDeployedFromLCS(courseMasterWorkspaceId);
    //Validate create activity from activity Bank and add created activity to LPN
    await BuildLPN.createActivityViaActivityBankAndAddToLPN();
    // Add and Delete Folder
    await Publish.addAndDeleteFolder();
    //Validate micro publish product  
    await Publish.microPublishProduct(process.env.SSOISBN);
    //Validate the created cdf, gdf, ndf, txn, activity and mmap files from the latest checkpoint on LCS
    await apiEndpoints.validateCourseMasterWorkspaceCreatedFilesFromLCSAfterMicroPublish(courseMasterWorkspaceId);
    //Validate the CM workspace is deployed successfully
    await apiEndpoints.validateWorkspaceDeployedFromLCS(courseMasterWorkspaceId);
});

