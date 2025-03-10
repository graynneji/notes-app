import databaseService from "./databaseService";

import { ID } from "react-native-appwrite";

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID ?? "";
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID ?? "";
const noteService = {
  // get notes
  async getNotes() {
    const response: any = await databaseService.listDocuments(dbId, colId);
    if (response.error) {
      return { error: response.error };
    }
    return { data: response };
  },

  //add new Notes
  async addNote(text: any) {
    if (!text) {
      return { error: "Note text cannot be empty" };
    }

    const data = {
      text: text,
      createdAt: new Date().toISOString(),
    };

    const response = await databaseService.createDocument(
      dbId,
      colId,
      ID.unique(),
      data
    );

    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },
};

export default noteService;
