require('dotenv').config();

const mongoString = process.env.DATABASE_URL;
const formDatabaseName = process.env.FORM_DATABASE_NAME;
const formCollectionName = process.env.FORM_COLLECTION_NAME;

module.exports = {
    mongoString,
    formDatabaseName,
    formCollectionName
};