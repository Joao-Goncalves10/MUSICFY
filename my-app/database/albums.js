import * as SQLite from 'expo-sqlite';

let db = null;

export async function initializeDatabase() {
  if (db) return db;

  try {
    db = await SQLite.openDatabaseAsync('musicfy.db');

    // Activa chaves estrangeiras
    await db.execAsync('PRAGMA foreign_keys = ON;');

    // Criar tabelas se não existirem
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS albums (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        year INTEGER,
        cover TEXT
      );

      CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        album_id INTEGER UNIQUE NOT NULL,
        rating REAL CHECK (rating >= 0 AND rating <= 5),
        review TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (album_id) REFERENCES albums (id) ON DELETE CASCADE
      );
    `);

    return db;
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    return null;
  }
}

// ----------------------------------------------------
// CREATE (Álbum)
// ----------------------------------------------------
export async function createAlbum(title, artist, year, cover) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    const result = await database.runAsync(
      `
      INSERT INTO albums (title, artist, year, cover)
      VALUES (?, ?, ?, ?)
      `,
      title,
      artist,
      year,
      cover
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao criar álbum:', error);
    throw error;
  }
}

// ----------------------------------------------------
// READ (Todos os Álbuns)
// ----------------------------------------------------
export async function getAlbums() {
  try {
    const database = await initializeDatabase();
    if (!database) return [];

    const albums = await database.getAllAsync(
      'SELECT * FROM albums ORDER BY id DESC;'
    );

    return albums || [];
  } catch (error) {
    console.error('Erro ao buscar álbuns:', error);
    return [];
  }
}

// ----------------------------------------------------
// READ (Biblioteca com Avaliações do Usuário)
// ----------------------------------------------------
export async function getUserLibrary() {
  try {
    const database = await initializeDatabase();
    if (!database) return [];

    const library = await database.getAllAsync(
      `
      SELECT 
        a.id,
        a.title,
        a.artist,
        a.year,
        a.cover,
        r.rating,
        r.review,
        r.updated_at as ratedAt
      FROM albums a
      INNER JOIN ratings r ON a.id = r.album_id
      ORDER BY r.updated_at DESC;
      `
    );

    return library || [];
  } catch (error) {
    console.error('Erro ao buscar biblioteca do usuário:', error);
    return [];
  }
}

// ----------------------------------------------------
// UPDATE (Álbum)
// ----------------------------------------------------
export async function updateAlbum(id, title, artist, year, cover) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    await database.runAsync(
      `
      UPDATE albums
      SET title = ?, artist = ?, year = ?, cover = ?
      WHERE id = ?
      `,
      title,
      artist,
      year,
      cover,
      id
    );
  } catch (error) {
    console.error('Erro ao atualizar álbum:', error);
    throw error;
  }
}

// ----------------------------------------------------
// DELETE (Álbum)
// ----------------------------------------------------
export async function deleteAlbum(id) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    await database.runAsync('DELETE FROM albums WHERE id = ?', id);
  } catch (error) {
    console.error('Erro ao deletar álbum:', error);
    throw error;
  }
}

// ----------------------------------------------------
// AVALIAÇÕES (Adicionar / Modificar Nota)
// ----------------------------------------------------
export async function rateAlbum(albumId, rating, review = '') {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    await database.runAsync(
      `
      INSERT INTO ratings (album_id, rating, review, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(album_id) DO UPDATE SET
        rating = excluded.rating,
        review = excluded.review,
        updated_at = CURRENT_TIMESTAMP;
      `,
      albumId,
      rating,
      review
    );
  } catch (error) {
    console.error('Erro ao avaliar álbum:', error);
    throw error;
  }
}