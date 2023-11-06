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

    async validateCourseMasterWorkspaceCreatedFilesFromLCS(courseMasterWorkspaceId)
    {
        const response = await this.apiContext.get(process.env.LCSEndPoint + "/lcs/v2/ws/workspaces/"+ courseMasterWorkspaceId +"/inheritedRevisionCoords",
        {
            headers: {
                'accept': 'application/json',
            },
        })
    expect(response.ok()).toBeTruthy();
    const responseJson = await response.json();
    const File = new Array();
    const map = {};
    for(let i=0; i<13; i++)
    {
        File.push(responseJson.members[i].coords.fileType);      
    }
    console.log(File);
    for(let i=0;i<File.length;i++)
    {
        if(map[File[i]]){
            map[File[i]]+=1
        }
        else{
            map[File[i]]=1
        }
    }
    console.log(map);
    expect(map.cdf).toBe(1);
    expect(map.gdf).toBe(1);
    expect(map.ndf).toBe(1);
    expect(map.txn).toBe(3);
    expect(map.activity).toBe(5);
    expect(map.mmap).toBe(2);
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
    const systemId = responseJson.deployments[0].systemId;
    const status = responseJson.deployments[0].status;
    console.log(status);
    expect(systemId).toBe("gopher");
    expect(status).toBe("Success");
    }
    
}

module.exports = { ApiEndpoints };
