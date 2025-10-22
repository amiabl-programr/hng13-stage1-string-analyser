const db = {};

export function addString(id, data) {
  db[id] = data;
}

export function getString(id) {
  return db[id];
}

export function getAllStrings() {
  return db;
}

export function deleteString(id) {
  delete db[id];
}
