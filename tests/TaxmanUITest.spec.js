const {test} = require('../fixture');
const { Login } = require('../src/pages/Login');
const { SearchNavigateOrCreateNewTaxonomy } = require('../src/pages/taxonomy/SearchNavigateOrCreateNewTaxonomy');
const { AddNodeToTaxonomy } = require('../src/pages/addTaxonomyNode/AddNodeToTaxonomy');

test(`@Taxman_UI_Scnario Validate to update taxonomy and add new node`, async ({ page }) => {

    const Log = new Login(page);
    const SearchAndCreateTaxonomy =  new SearchNavigateOrCreateNewTaxonomy(page,process.env.TaxonomyOption,process.env.TaxonomyType,process.env.Discipline);
    const AddNodeTaxonomy = new AddNodeToTaxonomy(page);
    //Launch the Taxman URL
    await Log.launchTaxmanURL(process.env.Taxman_URL);
    //Login with Valid credentials
    await Log.validLogin(process.env.USER_NAME, process.env.PASSWORD);
    //Search and Navigate to Taxonaomy if exists, if not exist create new Taxonomy
    await SearchAndCreateTaxonomy.searchNavigateOrCreateTaxonomy(process.env.TaxonomyOption);
    //Add node to the Taxonomy
    await AddNodeTaxonomy.addNodeToTaxonomy();  
});
