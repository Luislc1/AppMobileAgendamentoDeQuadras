exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('usuarios', {
    id: 'id',
    nome: { type: 'varchar(255)', notNull: true },
    senha: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    telefone: { type: 'varchar(255)', notNull: true, unique: true },
    cpf: { type: 'varchar(255)', notNull: true, unique: true },
  });

  pgm.createTable('quadras', {
    id: 'id',
    nome: { type: 'varchar(255)', notNull: true },
    localizacao: { type: 'varchar(255)', notNull: true },
    horarioInicio: { type: 'time', notNull: true },
    horarioFim: { type: 'time', notNull: true },
    id_usuario: { type: 'integer', notNull: true, references: 'usuarios' },
    disponibilidade: { type: 'boolean', notNull: true },
    calendario: { type: 'varchar(255)', notNull: true },
    descricao: { type: 'text', notNull: true },
    horariosDisponiveis: { type: 'text', notNull: true },
  });

  pgm.createTable('reservas', {
    id: 'id',
    id_quadra: { type: 'integer', notNull: true, references: 'quadras' },
    id_usuario: { type: 'integer', notNull: true, references: 'usuarios' },
    data: { type: 'date', notNull: true },
    horario: { type: 'time', notNull: true },
  });

  pgm.createTable('administradores', {
    id: 'id',
    nome: { type: 'varchar(255)', notNull: true },
    senha: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    telefone: { type: 'varchar(255)', notNull: true },
    cpf: { type: 'varchar(255)', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('administradores');
  pgm.dropTable('reservas');
  pgm.dropTable('quadras');
  pgm.dropTable('usuarios');
};
