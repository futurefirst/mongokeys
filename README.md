mongokeys
=========

A command-line tool and library that extracts the names of keys from a
specified [MongoDB](https://www.mongodb.com/) collection. It iterates through
all documents in the collection and returns a sorted list of unique keys.

Currently only top-level keys are supported.

### Example
```bash
$ mongokeys -d test -c test
_id
keyA
keyB
keyC
$
```

### Usage
The module exports a function `getKeys`, which takes a Collection object and a
callback function that itself takes an error object and an array of strings.

The command-line tool `mongokeys` accepts the `db`, `collection` and `uri`
parameters. `collection` is required. The database can be specified either
with the `db` parameter, or as part of the `uri`
([connection string](https://docs.mongodb.com/manual/reference/connection-string/)).
If no `uri` is specified, localhost is assumed. Use `--help` or no parameters
for a more detailed explanation.
