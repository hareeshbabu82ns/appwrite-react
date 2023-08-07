export const Server = {
  endpoint: import.meta.env.VITE_APPWRITE_URL,
  project: import.meta.env.VITE_APPWRITE_PROJECT,
  loginurl: import.meta.env.VITE_APPWRITE_LOGINURL,
  userImagesBucket: import.meta.env.VITE_APPWRITE_BUCKET_ID_USER_IMAGES,
  trackingDB: import.meta.env.VITE_APPWRITE_DATABSE_ID_TRACKING,
  todosDB: import.meta.env.VITE_APPWRITE_DATABSE_ID_TODOS,
  todosCollection: import.meta.env.VITE_APPWRITE_COLLECTION_ID_TODOS,
};
