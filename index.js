import express from 'express';

// const PORT = 3004;
const PORT = process.env.PORT || 3004;
// ...

let pgConnectionConfigs;

// test to see if the env var is set. Then we know we are in Heroku
if (process.env.DATABASE_URL) {
  // pg will take in the entire value and use it to connect
  pgConnectionConfigs = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  };
} else {
  // this is the same value as before
  pgConnectionConfigs = {
    user: 'grahamlim',
    host: 'localhost',
    database: 'grahamlim',
    port: 5432,
  };
}
const pool = new Pool(pgConnectionConfigs);

// ...
// Initialise Express
const app = express();

app.set('view engine', 'ejs');

app.get('/', (request, response) => {

  const responseText = `This is a random number: ${Math.random()}`;

  console.log('request came in', responseText);

  const data = { responseText };

  response.render('bananas', data);
});

app.listen(PORT);
