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

  const request = store.put({ id: 1 , value: content});

  const result = await request;
 
  console.log("added to database" , result);
};

// getDb should return all the content in the database
export const getDb = async (content) => {
  
  const db = await openDB("jate", 1);

  const text = db.transaction("jate", "readonly");

  const store = text.objectStore("jate");

  const result = await store.get(1);

  await text.done;

  return result?.value;
};

initdb();