import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// putDb should add the content to the database
export const putDb = async (content) => {
  const db = await openDB("jate", 1);

  const text = db.transaction("jate", "readwrite");

  const store = text.objectStore("jate");

  const adding = await store.add(content );

  const result = adding;
 
  console.log("added to database" , result);

};

// getDb should return all the content in the database
export const getDb = async (content) => {
  
  const db = await openDB("jate", 1);

  const text = db.transaction("jate", "readonly");

  const store = text.objectStore("jate");

  const result = await store.getAll();

  return result;
};

initdb();