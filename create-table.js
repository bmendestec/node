import { sql } from './db.js';

sql`
    CREATE TABLE videos (
        id          TEXT PRIMARY KEY,
        title       TEXT,
        description TEXT,
        duration    INTEGER
    );
`.then(() => {
    console.log("Tabela criada com sucesso");
});

// sql `
//     drop table if exists videos;
// `.then(() => {
//     console.log("Tabela deletada com sucesso");
// });