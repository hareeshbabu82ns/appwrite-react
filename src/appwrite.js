import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

export default client;

export const getUserData = async () => {
  try {
    const account = new Account(client);
    return account.get();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const account = new Account(client);
    return account.createEmailSession(email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    const account = new Account(client);
    return account.deleteSession("current");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (email, password) => {
  try {
    const account = new Account(client);
    return account.create("unique()", email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};
