import postgres from 'postgres';

function validateEnvironment() {
  for (const key of ["POSTGRES_HOST", "POSTGRES_USER", "POSTGRES_PASSWORD"]) {
    if (!(key in process.env)) {
      return false;
    }
  }
  return true;
}

if (!validateEnvironment()) {
  throw new Error("Unconfigured environment variables for database connection.");
}

const sql = postgres({
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export default sql;