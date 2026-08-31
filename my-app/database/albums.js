import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('musicfy.db');

// CREATE
export async function createAlbum(title, artist, year, cover) {
  const result = await db.runAsync(
    `
    INSERT INTO albums
    (title, artist, year, cover)
    VALUES (?, ?, ?, ?)
    `,
    title,
    artist,
    year,
    cover
  );

  return result.lastInsertRowId;
}

// READ
export async function getAlbums() {
  const albums = await db.getAllAsync(
    `
    SELECT *
    FROM albums
    ORDER BY id DESC
    `
  );

  return albums;
}

// UPDATE
export async function updateAlbum(
  id,
  title,
  artist,
  year,
  cover
) {
  await db.runAsync(
    `
    UPDATE albums
    SET
      title = ?,
      artist = ?,
      year = ?,
      cover = ?
    WHERE id = ?
    `,
    title,
    artist,
    year,
    cover,
    id
  );
}

// DELETE
export async function deleteAlbum(id) {
  await db.runAsync(
    `
    DELETE FROM albums
    WHERE id = ?
    `,
    id
  );
}