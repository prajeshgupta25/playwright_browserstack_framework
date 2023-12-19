const { expect } = require("@playwright/test");
class ApiEndpoints
{
    constructor(apiContext,VerifyWorkspacePayload)
    {
        this.apiContext = apiContext;
        this.VerifyWorkspacePayload = VerifyWorkspacePayload;
    }
    async verifyProduct(token,session)
    {
        const response1 = await this.apiContext.get(process.env.PBSEndPoint + "/api/v1/products/" + `${process.env.SSOISBN}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Cookie' : "PBS-X-XSRF-TOKEN="+token+"; SESSION="+session+"",
            },
        })
    const responseJson = await response1.json();
    const statusCode = response1.status();
    return statusCode;
    }

    async deleteProduct(token,session)
    {
        const res2 = await this.apiContext.delete(process.env.PBSEndPoint + "/api/v1/products/" + `${process.env.SSOISBN}`,
            {
                headers: {
                    'accept': 'text/plain',
                    'PBS-X-XSRF-TOKEN' : token,
                    'Cookie' : "PBS-X-XSRF-TOKEN="+token+"; SESSION="+session
                },
            })
        expect(res2.ok()).toBeTruthy();
    }

    async verifyProductWorkspace()
    {
        const response = await this.apiContext.post(process.env.LCSEndPoint + "/lcs/v2/ws/workspaces/byLabels",
        {
            data: this.VerifyWorkspacePayload,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    const responseJson = await response.json();
    expect(response.ok()).toBeTruthy();
    return responseJson;
    }

    async fetchLinkedWorkspace(courseMasterWorkspaceId)
    {
        const response2 = await this.apiContext.get(process.env.LCSEndPoint + "/lcs/v2/ws/workspaces/" + courseMasterWorkspaceId + "/linksFrom",
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        const responseJson2 = await response2.json();
        expect(response2.ok()).toBeTruthy();
        const linkedResourceWorkspaceId = responseJson2.links[0].toWorkspaceId;
        return linkedResourceWorkspaceId;
    }

    async deleteWorkspace(workspaceId)
    {
        const response3 = await this.apiContext.delete(process.env.LCSEndPoint + "/lcs/v2/ws/workspaces/" + workspaceId + "/delete",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'cengage-sso-guid': 'cengage-sso-guid'
                },
            })
        expect(response3.ok()).toBeTruthy();
    }

    async validateCourseMasterWorkspaceCreatedFilesFromLCS(courseMasterWorkspaceId) {
        const response = await this.apiContext.get(process.env.LCSEndPoint + "/lcs/v2/ws/workspaces/" + courseMasterWorkspaceId + "/inheritedRevisionCoords",
            {
                headers: {
                    'accept': 'application/json',
                },
            })
        expect(response.ok()).toBeTruthy();
        const responseJson = await response.json();
        const fileType = new Array();
        const fileTypeCount = {};
        for (let i = 0; i < responseJson.members.length; i++) {
            const reponseObjectValue = responseJson.members[i].coords;
            fileType.push(reponseObjectValue.fileType);
        }
        console.log(fileType);
        for (let i = 0; i < fileType.length; i++) {
            if (fileTypeCount[fileType[i]]) {
                fileTypeCount[fileType[i]] += 1
            }
            else {
                fileTypeCount[fileType[i]] = 1
            }
        }
        console.log(fileTypeCount);
        expect(fileTypeCount.cdf).toBe(1);
        expect(fileTypeCount.gdf).toBe(1);
        expect(fileTypeCount.ndf).toBe(1);
        expect(fileTypeCount.txn).toBe(3);
        expect(fileTypeCount.activity).toBe(4);
        expect(fileTypeCount.mmap).toBe(2);
    }

    async validateCourseMasterWorkspaceCreatedFilesFromLCSAfterMicroPublish(courseMasterWorkspaceId) {
        const response = await this.apiContext.get(process.env.LCSEndPoint + "/lcs/v2/ws/workspaces/" + courseMasterWorkspaceId + "/inheritedRevisionCoords",
            {
                headers: {
                    'accept': 'application/json',
                },
            })
        expect(response.ok()).toBeTruthy();
        const responseJson = await response.json();
        const fileType = new Array();
        const fileTypeCount = {};
        for (let i = 0; i < responseJson.members.length; i++) {
            const reponseObjectValue = responseJson.members[i].coords;
            fileType.push(reponseObjectValue.fileType);
        }
        console.log(fileType);
        for (let i = 0; i < fileType.length; i++) {
            if (fileTypeCount[fileType[i]]) {
                fileTypeCount[fileType[i]] += 1
            }
            else {
                fileTypeCount[fileType[i]] = 1
            }
        }
        console.log(fileTypeCount);
        expect(fileTypeCount.cdf).toBe(1);
        expect(fileTypeCount.gdf).toBe(1);
        expect(fileTypeCount.ndf).toBe(1);
        expect(fileTypeCount.txn).toBe(3);
        expect(fileTypeCount.activity).toBe(5);
        expect(fileTypeCount.mmap).toBe(2);
    }

    async validateWorkspaceDeployedFromLCS(courseMasterWorkspaceId)
    {
        const response = await this.apiContext.get(process.env.LCSDeployer + "/lcs/v2/ds/workspaces/"+ courseMasterWorkspaceId +"/deployments",
        {
            headers: {
                'accept': 'application/json',
            },
        })
    expect(response.ok()).toBeTruthy();
    const responseJson = await response.json();
        for (let i = 0; i < responseJson.deployments.length; i++) {
            const systemId = responseJson.deployments[i].systemId;
            const status = responseJson.deployments[i].status;
            console.log(systemId);
            console.log(status);
            if ((systemId === "gopher") || (systemId === "CCS")) {
                expect(status).toBe("Success");
            }
        }
    }    
}

module.exports = { ApiEndpoints };
