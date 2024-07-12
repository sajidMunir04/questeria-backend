require('dotenv').config({path:'./.env'});

const mongoString = process.env.MONGODB_URL;
const formDatabaseName = process.env.FORM_DATABASE_NAME;
const formCollectionName = process.env.FORM_COLLECTION_NAME;
const userDatabaseLink = process.env.PSQL_URL;
const formUserDataCollection = process.env.FORM_USER_DATA_COLLECTION_NAME;

module.exports = {
    mongoString,
    formDatabaseName,
    formCollectionName,
    userDatabaseLink,
    formUserDataCollection
};