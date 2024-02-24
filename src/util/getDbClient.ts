import path from "path";
import k from "knex";

let client: any = null;

export default function getClient() {
  if (client) {
    return client;
  }
  const filename = path.join(process.cwd(), "./palserver.db");
  const knex = k({
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename,
    },
  });
  if (!client) {
    client = knex;
  }
  return knex;
}
