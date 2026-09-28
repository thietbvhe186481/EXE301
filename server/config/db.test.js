import test from 'node:test';
import assert from 'node:assert/strict';
import { mongoUriFromEnvironment } from './db.js';

test('builds an Atlas URI while encoding database credentials', () => {
  const uri = mongoUriFromEnvironment({
    MONGODB_USERNAME: 'portfolio_app',
    MONGODB_PASSWORD: 'p@ss:/#?word',
    MONGODB_HOST: 'portfolio-prod.dfh3ilg.mongodb.net',
    MONGODB_DATABASE: 'portfolio_career'
  });
  assert.equal(uri, 'mongodb+srv://portfolio_app:p%40ss%3A%2F%23%3Fword@portfolio-prod.dfh3ilg.mongodb.net/portfolio_career?retryWrites=true&w=majority');
});

test('prefers a configured URI and refuses incomplete split credentials', () => {
  assert.equal(mongoUriFromEnvironment({ MONGODB_URI: 'mongodb://example/test' }), 'mongodb://example/test');
  assert.equal(mongoUriFromEnvironment({ MONGODB_USERNAME: 'portfolio_app', MONGODB_HOST: 'portfolio-prod.dfh3ilg.mongodb.net' }), null);
});
