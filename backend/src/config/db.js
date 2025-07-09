const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quadras',
  password: '061202',
  port: 5432,
});

pool.query('SELECT NOW()')
  .then(res => console.log('Conexão com PostgreSQL bem-sucedida:', res.rows[0]))
  .catch(err => {
    console.error('Falha na conexão com PostgreSQL:', err);
    process.exit(1);
  });

const criarTabelas = async () => {
    try {
      const client = await pool.connect();
      await client.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          senha VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          telefone VARCHAR(255) UNIQUE,
          cpf VARCHAR(255) UNIQUE NOT NULL
        );
  
        CREATE TABLE IF NOT EXISTS quadras (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          localizacao VARCHAR(255) NOT NULL,
          horarioInicio TIME NOT NULL,
          horarioFim TIME NOT NULL,
          id_usuario INTEGER NOT NULL,
          disponibilidade BOOLEAN NOT NULL,
          calendario VARCHAR(255) NOT NULL,
          descricao TEXT NOT NULL,
          horariosDisponiveis TEXT NOT NULL,
          FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
        );
  
        CREATE TABLE IF NOT EXISTS reservas (
          id SERIAL PRIMARY KEY,
          id_quadra INTEGER NOT NULL,
          id_usuario INTEGER NOT NULL,
          data DATE NOT NULL,
          horario TIME NOT NULL,
          FOREIGN KEY (id_quadra) REFERENCES quadras(id),
          FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
        );
  
        CREATE TABLE IF NOT EXISTS administradores (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(255) NOT NULL,
          senha VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          telefone VARCHAR(255) NOT NULL,
          cpf VARCHAR(255) NOT NULL
        );
      `);
      client.release();
      console.log('Tabelas criadas com sucesso!');
    } catch (err) {
      console.error('Erro crítico ao criar tabelas:', err);
      process.exit(1); // Encerra o aplicativo
    }
  };

  module.exports = {
    pool,
    criarTabelas,
  };