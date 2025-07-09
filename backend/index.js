const { pool, criarTabelas } = require('./src/config/db');

pool.query('SELECT NOW()', async (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err);
    process.exit(1);
  } else {
    console.log('Conexão com PostgreSQL bem-sucedida:', res.rows[0]);
    try {
      await criarTabelas();
      iniciarServidor();
    } catch (err) {
      console.error('Falha ao inicializar o banco de dados:', err);
      process.exit(1);
    }
  }
});

function iniciarServidor() {
  const cors = require('cors');
  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 3001;
  

  const corsOptions = {
    origin: [
      'http://localhost:3001',
      'http://10.0.2.2:3001',       // Emulador Android
      'http://192.168.100.7:3001'   // Seu IP local
    ],
    methods: "GET,POST,PUT,DELETE"
  };

  const usuarioRoutes = require('./src/routes/usuarioRoutes');
  const quadraRoutes = require('./src/routes/quadraRoutes');
  const reservaRoutes = require('./src/routes/reservaRoutes');
  const administradorRoutes = require('./src/routes/administradorRoutes');



  app.use(cors(corsOptions));
  app.use(express.json());

  app.use('/usuarios', usuarioRoutes);
  app.use('/quadras', quadraRoutes);
  app.use('/reservas', reservaRoutes);
  app.use('/administradores', administradorRoutes);


  app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
  });
}
