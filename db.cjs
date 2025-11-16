const sdk = require('node-appwrite')
const { Query } = require('node-appwrite')

// init appwrite configs
const client = new sdk.Client();
const projectId = process.env.PROJECT_ID;
const databaseId = process.env.DATABASE_ID;
const tableId = process.env.TABLE_ID;
const employeeDb = new sdk.TablesDB(client);

const pageSize = 10;

client
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(projectId)
    .setKey(process.env.API_KEY);

async function doesEmailExist(email) {
    const row = await employeeDb.listRows({
        databaseId,
        tableId,
        queries: [
            Query.equal("email", email)
        ]
    })
    return row.total != 0
}

async function addRecord(fields) {
    try {
        const emailExists = await doesEmailExist(fields.email);
        if (emailExists) {
            return {
                success: false,
                message: "Email already exists."
            }
        }

        await employeeDb.createRow({
            databaseId,
            tableId,
            rowId: sdk.ID.unique(),
            data: fields,
        })

        return {
            success: true,
        }
    } catch (err) {
        let message = "Invalid Request"
        if (err?.response) {
            message = JSON.parse(err.response).message
        }
        return {
            success: false,
            message,
        }
    }
}

async function fetchRecords(page=1) {
    const records = await employeeDb.listRows({
        databaseId,
        tableId,
        queries: [
            Query.offset((page - 1) * pageSize),
            Query.limit(pageSize)
        ]
    })
    return {
        ...records,
        pageSize,
    };
}

module.exports = {
    addRecord,
    fetchRecords,
}