import * as SQLite from 'expo-sqlite';

// Guarda a instância do banco para reutilizar a conexão em toda a aplicação.
let db = null;

// Cria a conexão com o banco e garante que a tabela de posts exista.
async function initializeDatabase() {
  // Se o banco já foi inicializado, não abre outro.
  if (db) return db;

  try {
    // Abre o arquivo SQLite 'musicfy.db'.
    db = await SQLite.openDatabaseAsync('musicfy.db');

    // Cria a tabela 'posts' somente se ela ainda não existir.
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

// Cria um novo post com nome do usuário, texto e álbum relacionado.
export async function createPost(
  username,
  content,
  albumId
) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    // Inserção do post na tabela.
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

    // Retorna o id do post criado.
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw error;
  }
}

// Busca todos os posts e os retorna em ordem mais recente primeiro.
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

// Atualiza o conteúdo de um post específico.
export async function updatePost(
  id,
  content
) {
  try {
    const database = await initializeDatabase();
    if (!database) throw new Error('Database not initialized');

    // Altera apenas o texto do post cujo id foi informado.
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

// Deleta um post pelo seu id.
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