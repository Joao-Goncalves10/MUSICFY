import * as SQLite from 'expo-sqlite';

let db = null;

// Inicializa o banco específico de reviews e cria a tabela caso ainda não exista.
async function initializeDatabase() {
  if (db) return db;
  
  try {
    db = await SQLite.openDatabaseAsync('musicfy.db');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        album_id INTEGER,
        rating REAL,
        review TEXT,
        status TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return db;
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    return null;
  }
}

// Cria uma nova review vinculada a um álbum com nota, texto e status.
export async function createReview(
  albumId,
  rating,
  review,
  status
) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    const result = await database.runAsync(
      `
      INSERT INTO reviews
      (album_id, rating, review, status)
      VALUES (?, ?, ?, ?)
      `,
      albumId,
      rating,
      review,
      status
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao criar review:', error);
    throw error;
  }
}

// Busca todas as reviews em ordem decrescente para exibir no perfil e em outras telas.
export async function getReviews() {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    const reviews = await database.getAllAsync(
      `
      SELECT *
      FROM reviews
      ORDER BY id DESC
      `
    );

    return reviews || [];
  } catch (error) {
    console.error('Erro ao buscar reviews:', error);
    return [];
  }
}

export async function getReviewByAlbumId(albumId) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    const review = await database.getFirstAsync(
      `
      SELECT *
      FROM reviews
      WHERE album_id = ?
      ORDER BY id DESC
      LIMIT 1
      `,
      albumId
    );

    return review || null;
  } catch (error) {
    console.error('Erro ao buscar review do álbum:', error);
    return null;
  }
}


// Atualiza os dados de uma review já existente.
export async function updateReview(
  id,
  rating,
  review,
  status
) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    await database.runAsync(
      `
      UPDATE reviews
      SET
        rating = ?,
        review = ?,
        status = ?
      WHERE id = ?
      `,
      rating,
      review,
      status,
      id
    );
  } catch (error) {
    console.error('Erro ao atualizar review:', error);
    throw error;
  }
}


// Remove uma review pelo id.
export async function deleteReview(id) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    await database.runAsync(
      `
      DELETE FROM reviews
      WHERE id = ?
      `,
      id
    );
  } catch (error) {
    console.error('Erro ao deletar review:', error);
    throw error;
  }
}