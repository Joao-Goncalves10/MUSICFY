import * as SQLite from 'expo-sqlite';

// Cria a conexão síncrona do banco SQLite com o nome 'musicfy.db'.
const db = SQLite.openDatabaseSync('musicfy.db');

// Inicializa o banco e cria as tabelas principais da aplicação.
export async function initDatabase() {
  // Configura o modo de gravação do SQLite para melhorar desempenho e consistência.
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    // Tabela de álbuns: guarda informações básicas do disco/album.
    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      year INTEGER,
      cover TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    // Tabela de reviews: guarda a avaliação de um álbum por usuário.
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      album_id INTEGER NOT NULL,
      rating REAL NOT NULL,
      review TEXT,
      status TEXT DEFAULT 'ouvido',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (album_id) REFERENCES albums(id)
    );

    // Tabela de posts: guarda publicações/Comentários do usuário sobre álbuns.
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      content TEXT,
      album_id INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (album_id) REFERENCES albums(id)
    );
  `);
}