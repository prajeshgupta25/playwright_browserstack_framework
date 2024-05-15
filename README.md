Summary:
This Test Automation Framework serves the purpose of automating the test cases and getting the tests results. Please refer the below mentioned guidelines/prerequisites for the same.

System Requirement:
* Node js 14 or above
* Visual Studio Code or IDE of choice in case there is need to update the script.

Setup:
* Clone the repo
* Install dependencies automatically using the following command in your terminal: `npm install`

To Setup BrowserStack Configuration:
1. You have to download the BrowserStack Local binary from the links below (depending on your environment): https://www.browserstack.com/docs/local-testing/releases-and-downloads
2. Once you have downloaded and unzipped the file, you can initiate the binary by running the command(Using Command-line Interface): `BrowserStackLocal.exe --key YOUR_ACCESS_KEY`
3. Once you see the terminal say "[SUCCESS]" You can now access your local server(s) in our remote browser”, your local testing connection is considered established.
4. Now, You can run the test locally using Test Execution commands.
## Additional Resources ##
Documentation for writing Automate test scripts with BrowserStack: https://www.browserstack.com/docs/automate/playwright

## Run Test Execution local:
## On Mac:
* DEV
export BASE_URL='https://pb-dev.cengage.com'; export Taxman_URL='https://taxman-dev.cengage.com'; export SSOISBN='1111000200705'; export eReaderISBN='9781111111152' ; export BrowserAndVersion='chrome@latest'; export OS='OSX Big Sur'; export Server='local'; export USER_NAME='mast_e2e_auto_internaluser@cloud.cengage.com'; export PASSWORD='Password@01'; npm run env:dev

* QA
export BASE_URL='https://pb-qa.cengage.com'; export Taxman_URL='https://taxman-qa.cengage.com'; export SSOISBN='1111000190707'; export eReaderISBN='9781111111101' ; export BrowserAndVersion='chrome@latest'; export OS='OSX Big Sur'; export Server='local'; export USER_NAME='mast_e2e_auto_internaluser@cloud.cengage.com'; export PASSWORD='Password@01'; npm run env:qa

* STAGE
export BASE_URL='https://pb-stage.cengage.com'; export Taxman_URL='https://taxman-stage.cengage.com'; export SSOISBN='1111000250701'; export eReaderISBN='9781111111172' ; export BrowserAndVersion='chrome@latest'; export OS='OSX Big Sur'; export Server='local'; export USER_NAME='mast_e2e_auto_internaluser@cloud.cengage.com'; export PASSWORD='Password@01'; npm run env:stage

* PERF
export BASE_URL='https://pb-perf.cengage.com'; export Taxman_URL='https://taxman-perf.cengage.com'; export SSOISBN='1111000160701'; export eReaderISBN='9781111111113' ; export BrowserAndVersion='chrome@latest'; export OS='OSX Big Sur'; export Server='local'; export USER_NAME='mast_e2e_auto_internaluser@cloud.cengage.com'; export PASSWORD='Password@01'; npm run env:perf

## On Window:
* DEV
$Env:BASE_URL='https://pb-dev.cengage.com'; $Env:Taxman_URL='https://taxman-dev.cengage.com'; $Env:SSOISBN='1111000200705'; $Env:eReaderISBN='9781111111152' ;$Env:BrowserAndVersion='chrome@latest'; $Env:OS='Windows 11'; $Env:Server='local'; $Env:USER_NAME='mast_e2e_auto_internaluser@cloud.cengage.com'; $Env:PASSWORD='Password@01'; npm run env:dev

* QA
$Env:BASE_URL='https://pb-qa.cengage.com'; $Env:Taxman_URL='https://taxman-qa.cengage.com'; $Env:SSOISBN='1111000190707'; $Env:eReaderISBN='9781111111101'; $Env:BrowserAndVersion='chrome@latest'; $Env:OS='Windows 11'; $Env:Server='local'; $Env:USER_NAME='mast_e2e_auto_internaluser@cloud.cengage.com'; $Env:PASSWORD='Password@01'; npm run env:qa

* STAGE
$Env:BASE_URL='https://pb-stage.cengage.com'; $Env:Taxman_URL='https://taxman-stage.cengage.com'; $Env:SSOISBN='1111000250701'; $Env:eReaderISBN='9781111111172'; $Env:BrowserAndVersion='chrome@latest'; $Env:OS='Windows 11'; $Env:Server='local'; $Env:USER_NAME='mast_e2e_auto_internaluser@cloud.cengage.com'; $Env:PASSWORD='Password@01'; npm run env:stage

* PERF
$Env:BASE_URL='https://pb-perf.cengage.com'; $Env:Taxman_URL='https://taxman-perf.cengage.com'; $Env:SSOISBN='1111000160701'; $Env:eReaderISBN='9781111111113'; $Env:BrowserAndVersion='chrome@latest'; $Env:OS='Windows 11'; $Env:Server='local'; $Env:USER_NAME='mast_e2e_auto_internaluser@cloud.cengage.com'; $Env:PASSWORD='Password@01'; npm run env:perf

1. Set the BrowserAndVersion Example: $Env:BrowserAndVersion='chrome@latest'
# For more BrowserAndVersion refer to the following options:
* 'playwright-firefox@latest'
* 'playwright-webkit@latest'
* 'edge@latest'

2. Set the OS Example: $Env:OS='Windows 10'
# For more OS refer to the following options:
* 'Windows 11'
* 'OSX Big Sur'

3. Set the System to run on browserstack Example: $Env:Server='browserstack'

# For more environment refer to the following options:

* For Dev Env: npm run env:dev
* For Qa Env: npm run env:qa
* For Stage Env: npm run env:Stage
* For Perf Env: npm run env:Perf
* For Prod Env: npm run env:Prod

Guidelines for basic code practice and review: https://wiki.cengage.com/pages/viewpage.action?spaceKey=PQA&title=Basic+Code+Practice
Please use the playwright locator "https://playwright.dev/docs/locators" whenever possible.

Result Files:
The Test Execution Results will be stored in the playwright-report/index.html once the test has completed.

Sample Jobs: https://jenkins-qa-automation.cengage.info/job/MAST_QA/job/PBS_UI_Integration_QA/

**Note:** By default headless mode is true. 
