const { Client } = require("node-appwrite");

const dotenv = require("dotenv");
const {
  createUser,
  createDatabase,
  createStorage,
  createCollection,
  createAttribute,
} = require("./utils");

dotenv.config({ path: ".env.local" });

const client = new Client()
  .setEndpoint(process.env.APPWRITE_END_POINT) // Your Appwrite Endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
  .setKey(process.env.APPWRITE_API_KEY); // Your secret API key

const main = async () => {
  const user = await createUser(client, {
    name: "Testing1",
    email: "testing1@g.com",
    password: "testing1",
  });

  const storage = await createStorage(client, {
    name: process.env.APPWRITE_BUCKET_ID,
    id: process.env.APPWRITE_BUCKET_ID,
  });

  const db = await createDatabase(client, {
    name: process.env.APPWRITE_DATABSE_ID_TODOS,
    id: process.env.APPWRITE_DATABSE_ID_TODOS,
  });

  const collUsers = await createCollection(client, {
    dbId: db.$id,
    collectionId: process.env.APPWRITE_COLLECTION_ID_USERS,
    name: process.env.APPWRITE_COLLECTION_ID_USERS,
  });

  const attrEmail = await createAttribute(client, {
    dbId: db.$id,
    collectionId: collUsers.$id,
    name: "email",
    type: "string",
    defaultValue: "",
    size: 50,
    required: true,
  });

  const collTodos = await createCollection(client, {
    dbId: db.$id,
    collectionId: process.env.APPWRITE_COLLECTION_ID_TODOS,
    name: process.env.APPWRITE_COLLECTION_ID_TODOS,
  });

  const attrContent = await createAttribute(client, {
    dbId: db.$id,
    collectionId: collTodos.$id,
    name: "content",
    type: "string",
    defaultValue: "",
    size: 50,
    required: true,
  });

  const attrCompleted = await createAttribute(client, {
    dbId: db.$id,
    collectionId: collTodos.$id,
    name: "isComplete",
    type: "boolean",
    defaultValue: false,
  });

  const attrUserId = await createAttribute(client, {
    dbId: db.$id,
    collectionId: collTodos.$id,
    name: "userId",
    type: "string",
    required: true,
    size: 36,
  });
};

main();
