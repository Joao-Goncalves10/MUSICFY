import * as SQLite from 'expo-sqlite';

// Guarda a conexão do banco para reutilizar a mesma instância em toda a aplicação.
let db = null;

// Inicializa o banco e cria as tabelas de álbum e avaliação, caso ainda não existam.
export async function initializeDatabase() {
  // Se o banco já foi aberto antes, reutiliza a conexão atual.
  if (db) return db;

  try {
    // Abre/cria o arquivo do banco SQLite  
    db = await SQLite.openDatabaseAsync('musicfy.db');

    // Ativa as chaves estrangeiras para manter a integridade dos dados.
    await db.execAsync('PRAGMA foreign_keys = ON;');

    // Cria a tabela de álbuns e a tabela de avaliações se ainda não existirem.
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
// Cria um novo álbum no banco com título, artista, ano e capa.
export async function createAlbum(title, artist, year, cover) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    // Insere os dados na tabela 'albums'.
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

    // Retorna o id do álbum recém-criado para ser usado em outras telas.
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao criar álbum:', error);
    throw error;
  }
}

// ----------------------------------------------------
// READ (Todos os Álbuns)
// ----------------------------------------------------
// Busca todos os álbuns salvos para exibir na lista da aplicação.
export async function getAlbums() {
  try {
    const database = await initializeDatabase();
    if (!database) return [];

    // Seleciona todos os registros da tabela e ordena pelo mais recente primeiro.
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
// Junta os dados de álbuns e ratings para montar a biblioteca do usuário.
export async function getUserLibrary() {
  try {
    const database = await initializeDatabase();
    if (!database) return [];

    // Faz um INNER JOIN entre albums e ratings para trazer título + artista + nota + review.
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
// Atualiza os dados de um álbum existente com base no id.
export async function updateAlbum(id, title, artist, year, cover) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    // Altera as informações do álbum que tem o id correspondente.
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
// Remove um álbum do banco usando o id.
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
// Salva ou atualiza a avaliação do usuário sobre um álbum.
export async function rateAlbum(albumId, rating, review = '') {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    // Se já existe avaliação para esse album_id, altera; se não existe, cria uma nova.
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