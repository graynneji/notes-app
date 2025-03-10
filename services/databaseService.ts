import { database } from "./appwrite";
const databaseService = {
  //list document
  async listDocuments(dbId: string, colId: string) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error: any) {
      console.error("Error fetching documents:", error.message);
      return { error: error.message };
    }
  },

  //Create Document
  async createDocument(dbId: any, colId: any, data: any, id: any = null) {
    try {
      return await database.createDocument(dbId, colId, id || undefined, data);
    } catch (error: any) {
      console.error("Error creating documents", error.message);
      return {
        error: error.message,
      };
    }
  },
};

export default databaseService;
