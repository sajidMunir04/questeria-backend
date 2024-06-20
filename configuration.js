require('dotenv').config();

export const mongoString = process.env.DATABASE_URL;
export const formDatabaseName = process.env.FORM_DATABASE_NAME;
export const formCollectionName = process.env.FORM_COLLECTION_NAME;
