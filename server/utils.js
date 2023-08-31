const {
  ID,
  Users,
  Query,
  Databases,
  Storage,
  Permission,
  Role,
} = require("node-appwrite");

const createAttribute = async (
  client,
  {
    dbId,
    collectionId,
    name,
    type = "string",
    size,
    required = false,
    defaultValue,
    array,
  }
) => {
  const db = new Databases(client);
  const attr = await db.listAttributes(dbId, collectionId, [
    Query.equal("key", name),
  ]);
  if (attr.total > 0 && attr.attributes.findIndex((a) => a.key === name) >= 0) {
    console.log(attr);
    console.log("attribute exists already", name);
    return attr.attributes[0];
  }

  if (type === "string") {
    const res = await db.createStringAttribute(
      dbId,
      collectionId,
      name,
      size,
      required,
      defaultValue,
      array
    );
    console.log(res);
    console.log("attribute created", name);
    return res;
  } else if (type == "boolean") {
    const res = await db.createBooleanAttribute(
      dbId,
      collectionId,
      name,
      required,
      defaultValue,
      array
    );
    console.log(res);
    console.log("attribute created", name);
    return res;
  }
};

const createCollection = async (client, { dbId, collectionId, name }) => {
  const db = new Databases(client);
  try {
    const coll = await db.getCollection(dbId, collectionId);
    if (coll) {
      console.log("collection exists already", name);
      return coll;
    }
  } catch (ex) {
    const res = await db.createCollection(
      dbId,
      collectionId,
      name,
      [
        Permission.create(Role.users()),
        // Permission.read(Role.users()),
        // Permission.update(Role.users()),
        // Permission.delete(Role.users()),
      ],
      true
    );
    console.log(res);
    console.log("collection created", name);
    return res;
  }
};

const createDatabase = async (client, { name, id }) => {
  const db = new Databases(client);
  const res = await db.list([Query.equal("$id", id)]);
  if (res.total) {
    console.log("db exists already", name);
    return res.databases[0];
  }

  const resDb = await db.create(id, name);
  // console.log(res);
  console.log("db created", name);
  return resDb;
};

const createUser = async (client, { name, email, password }) => {
  const users = new Users(client);

  const res = await users.list([Query.equal("email", email)]);
  // console.log(res);

  if (res.total > 0) {
    console.log("user exists already", name);
    return res.users[0];
  }

  const resUser = await users.create(ID.unique(), email, null, password, name);

  console.log("user created", name);
  return resUser;
};

const createStorage = async (client, { name, id }) => {
  const db = new Storage(client);
  const res = await db.listBuckets([Query.equal("$id", id)]);
  if (res.total) {
    console.log("storage exists already", name);
    return res.buckets[0];
  }

  const resDb = await db.createBucket(id, name);
  // console.log(res);
  console.log("storage created", name);
  return resDb;
};

module.exports = {
  createUser,
  createDatabase,
  createStorage,
  createCollection,
  createAttribute,
};
