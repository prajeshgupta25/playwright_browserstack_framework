const {FullConfig} = require ('@playwright/test');
console.log(process.env.test_env + "testing");
async function globalSetup() {
    if (process.env.test_env) {
        require('dotenv').config({
            path: `helper/env/.env.${process.env.test_env}`,
            override: true
        });
    }

}
module.exports = globalSetup ;