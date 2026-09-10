import * as SQLite from 'expo-sqlite';

// Guarda a conexão com o banco de dados para reaproveitar a mesma instância em toda a app.
let db = null;

// Inicializa o banco e garante que a tabela 'reviews' exista.
async function initializeDatabase() {
  // Se o banco já foi aberto antes, evita abrir outra conexão desnecessária.
  if (db) return db;

  try {
    // Abre/cria o arquivo do banco SQLite chamado 'musicfy.db'.
    db = await SQLite.openDatabaseAsync('musicfy.db');

    // Cria a tabela de avaliações somente se ela ainda não existir.
    // Cada review guarda: id, album_id, nota, texto da avaliação, status e data de criação.
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

// Cria uma nova avaliação no banco para um álbum específico.
export async function createReview(
  albumId,
  rating,
  review,
  status
) {
  try {
    // Garante que a conexão com o banco esteja ativa antes de inserir os dados.
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    // Insere os dados na tabela 'reviews'.
    // Os '?' evitam SQL injection e representam os valores em ordem.
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

    // Retorna o id do registro criado para uso em outras telas.
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao criar review:', error);
    throw error;
  }
}

// Busca todas as avaliações cadastradas e retorna em ordem decrescente de id.
export async function getReviews() {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    // Seleciona todos os registros da tabela e ordena pelos mais recentes primeiro.
    const reviews = await database.getAllAsync(
      `
      SELECT *
      FROM reviews
      ORDER BY id DESC
      `
    );

    // Garante que sempre devolva um array, mesmo que não haja registros.
    return reviews || [];
  } catch (error) {
    console.error('Erro ao buscar reviews:', error);
    return [];
  }
}

// Atualiza uma avaliação existente com novos dados.
export async function updateReview(
  id,
  rating,
  review,
  status
) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    // Atualiza apenas a linha cujo id corresponde ao item que queremos alterar.
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

// Remove uma avaliação pelo seu id.
export async function deleteReview(id) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    // Deleta a linha da tabela que tem o id informado.
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