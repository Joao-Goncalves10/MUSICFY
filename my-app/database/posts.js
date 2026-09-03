import * as SQLite from 'expo-sqlite';

let db = null;

async function initializeDatabase() {
  if (db) return db;
  
  try {
    db = await SQLite.openDatabaseAsync('musicfy.db');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        content TEXT,
        album_id INTEGER,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return db;
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    return null;
  }
}

export async function createPost(
  username,
  content,
  albumId
) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    const result = await database.runAsync(
      `
      INSERT INTO posts
      (username, content, album_id)
      VALUES (?, ?, ?)
      `,
      username,
      content,
      albumId
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw error;
  }
}

export async function getPosts() {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    const posts = await database.getAllAsync(
      `
      SELECT *
      FROM posts
      ORDER BY id DESC
      `
    );

    return posts || [];
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
}


export async function updatePost(
  id,
  content
) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    await database.runAsync(
      `
      UPDATE posts
      SET content = ?
      WHERE id = ?
      `,
      content,
      id
    );
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    throw error;
  }
}


export async function deletePost(id) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    await database.runAsync(
      `
      DELETE FROM posts
      WHERE id = ?
      `,
      id
    );
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    throw error;
  }
}