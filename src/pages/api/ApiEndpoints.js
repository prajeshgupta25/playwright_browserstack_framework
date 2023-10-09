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
    const fileType1 = responseJson.members[0].coords.fileType;
    const fileType2 = responseJson.members[1].coords.fileType;
    const fileType3 = responseJson.members[2].coords.fileType;
    const fileType4 = responseJson.members[3].coords.fileType;
    const fileType5 = responseJson.members[4].coords.fileType;
    const fileType6 = responseJson.members[5].coords.fileType;
    const fileType7 = responseJson.members[6].coords.fileType;
    const fileType8 = responseJson.members[7].coords.fileType;
    const fileType9 = responseJson.members[8].coords.fileType;
    const fileType10 = responseJson.members[9].coords.fileType;
    const fileType11 = responseJson.members[10].coords.fileType;   
    const File = [fileType1, fileType2, fileType3, fileType4, fileType5, fileType6, fileType7, fileType8, fileType9, fileType10, fileType11];
    console.log(File);
    let countCDFFile=0, countGDFFile=0, countNDFFile=0 ;
    for(let i=0; i<File.length; i++)
    {
        if(File[i]=="cdf")
        {
            countCDFFile= countCDFFile + 1;
        }
        if(File[i]=="gdf")
        {
            countGDFFile= countGDFFile + 1;
        }
        if(File[i]=="ndf")
        {
            countNDFFile= countNDFFile + 1;
        }
    }
    expect(countCDFFile).toBe(1);
    expect(countGDFFile).toBe(1);
    expect(countNDFFile).toBe(1);
    }

    async validateResourceWorkspaceCreatedFilesFromLCS(linkedResourceWorkspaceId)
    {
        const response = await this.apiContext.get(process.env.LCSEndPoint + "/lcs/v2/ws/workspaces/"+ linkedResourceWorkspaceId +"/inheritedRevisionCoords",
        {
            headers: {
                'accept': 'application/json',
            },
        })
    expect(response.ok()).toBeTruthy();
    const responseJson = await response.json();
    const fileType1 = responseJson.members[0].coords.fileType;
    const fileType2 = responseJson.members[1].coords.fileType;
    const fileType3 = responseJson.members[2].coords.fileType;
    const fileType4 = responseJson.members[3].coords.fileType;
    const fileType5 = responseJson.members[4].coords.fileType;
    const fileType6 = responseJson.members[5].coords.fileType;
    const fileType7 = responseJson.members[6].coords.fileType;
    const fileType8 = responseJson.members[7].coords.fileType;
    const File = [fileType1, fileType2, fileType3, fileType4, fileType5, fileType6, fileType7, fileType8];
    console.log(File);
    let countTxnFile=0, countActivityFile=0;
    for(let i=0; i<File.length; i++)
    {
        if(File[i]=="txn")
        {
            countTxnFile= countTxnFile + 1;
        }
        if(File[i]=="activity")
        {
            countActivityFile= countActivityFile + 1;
        }
    }
    expect(countTxnFile).toBe(3);
    expect(countActivityFile).toBe(5);
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
