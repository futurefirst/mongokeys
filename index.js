#!/usr/bin/env node
'use strict';
const _ = require('lodash');
const mongodb = require('mongodb');
const yargs = require('yargs');

const argv = yargs
  .alias({
    db: 'd',
    collection: 'c',
  })
  .default({
    uri: 'mongodb://localhost:27017',
  })
  .demand(['collection'])
  .describe({
    db: 'Database to use',
    collection: 'Collection to use',
    uri: 'MongoDB connection string URI',
  })
  .epilogue('Finds all the keys used in a MongoDB collection, even if not in every document')
  .help()
  .string(['db', 'collection', 'uri'])
  .version()
  .wrap(yargs.terminalWidth() - 5)
  .argv;

const MongoClient = mongodb.MongoClient;
MongoClient.connect(argv.uri, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const coll = client.db(argv.db).collection(argv.collection);
  getKeys(coll, (err, keys) => {
    client.close();
    if (err) {
      console.error(err);
      process.exit(1);
    }

    keys.forEach(key => console.log(key));
  });
});

/**
 * Gets all unique top-level keys from the documents in a collection
 * @param {Collection} coll MongoDB Collection object
 * @param {Function}   cb   Callback function accepting an error object and a results array
 */
const getKeys = (coll, cb) =>
  coll.find().map(rec => Object.keys(rec)).toArray((err, recs) => err
    ? cb(err)
    : cb(null, _.sortedUniq(recs.reduce((acc, val) => acc.concat(val), []).sort())));

module.exports = { getKeys };
