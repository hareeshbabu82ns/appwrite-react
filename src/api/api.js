import {
  Client,
  Graphql,
  Storage,
  Databases,
  Account,
  Permission,
  Role,
} from "appwrite";
import { Server } from "../utils/config";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let client = new Client();
    client.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(client);
    const storage = new Storage(client);
    const database = new Databases(client);
    const graphql = new Graphql(client);

    api.sdk = { storage, account, database, graphql };
    return api.sdk;
  },

  login: async (email, password) => {
    try {
      return api.provider().account.createEmailSession(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  logout: async () => {
    try {
      return api.provider().account.deleteSession("current");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  register: async (email, password) => {
    try {
      return api.provider().account.create("unique()", email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  loginWith: async (provider) => {
    try {
      return api.provider().account.createOAuth2Session(provider);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getUserData: async () => {
    try {
      return api.provider().account.get();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create("unique()", email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  getSession(id) {
    return api.provider().account.getSession(id);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  // Files API

  createFile: (bucketId, file) => {
    return api.provider().storage.createFile(bucketId, "unique()", file);
  },

  listFiles: (bucketId) => {
    return api.provider().storage.listFiles(bucketId);
  },

  getFilePreview: (bucketId, fileId, width) => {
    return api.provider().storage.getFilePreview(bucketId, fileId, width);
  },

  getFileView: (bucketId, fileId) => {
    return api.provider().storage.getFileView(bucketId, fileId);
  },

  makeFilePublic: async (bucketId, fileId, ownerId) => {
    return api
      .provider()
      .storage.updateFile(bucketId, fileId, [
        Permission.read(Role.user(ownerId)),
        Permission.update(Role.user(ownerId)),
        Permission.delete(Role.user(ownerId)),
        Permission.read(Role.users()),
      ]);
  },

  makeFilePrivate: async (bucketId, fileId, ownerId) => {
    return api
      .provider()
      .storage.updateFile(bucketId, fileId, [
        Permission.read(Role.user(ownerId)),
        Permission.update(Role.user(ownerId)),
        Permission.delete(Role.user(ownerId)),
      ]);
  },

  deleteFile: (bucketId, fileId) => {
    return api.provider().storage.deleteFile(bucketId, fileId);
  },

  // Documents API

  createDocument: (databaseId, collectionId, data, permissions) => {
    return api
      .provider()
      .database.createDocument(
        databaseId,
        collectionId,
        "unique()",
        data,
        permissions
      );
  },

  listDocuments: (databaseId, collectionId) => {
    return api.provider().database.listDocuments(databaseId, collectionId);
  },

  updateDocument: (databaseId, collectionId, documentId, data) => {
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  deleteDocument: (databaseId, collectionId, documentId) => {
    return api
      .provider()
      .database.deleteDocument(databaseId, collectionId, documentId);
  },
};

export default api;
