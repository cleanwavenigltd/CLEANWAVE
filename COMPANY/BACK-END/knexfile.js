// // Update with your config settings.

// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  *
//  */
// require('dotenv').config();

// module.exports = {

//   // development: {
//   //   client: 'sqlite3',
//   //   connection: {
//   //     filename: './dev.sqlite3'
//   //   }
//   // },

//   development: {
//     client: 'postgresql',
//     connection: {
//       database: process.env.DB_NAME,
//       user:     process.env.DB_USER || 'postgres',
//       password: process.env.DB_PASSWORD || 'password',
//       port : process.env.DB_PORT || 5432,
//       host : process.env.DB_HOST || 'localhost',
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'pg',
//     connection: {
//       database: process.env.DB_NAME,
//       user:     process.env.DB_USER,
//       password: process.env.DB_PASSWORD
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };

require("dotenv").config();

module.exports = {
  development: {
    client: "pg", // 'pg' is the standard for PostgreSQL in Knex
    connection: {
      // For local work, you can still use separate variables or a local string
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "cleanwave_dev",
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      // This is the "Magic" part for Railway + Supabase
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Required for Supabase production
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
