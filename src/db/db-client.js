const path = require('path');
const fs = require('fs');
const Collection = require('./models/collection.model');
const { jsonStringify } = require('./utils');
const pathToDb = path.resolve(__dirname, './db.json');

let dbObject = {};

async function reset() {
  const data = jsonStringify({});
  return write(data);
}

async function collection(name) {
  let candidate = dbObject[name];
  if (!candidate) {
    candidate = dbObject[name] = new Collection();
    await synchronize();
  }
  return candidate;
}

async function connect() {
  let readData = await read();
  if (!readData) {
    await reset();
  }
  readData = await read();
  const parsedData = JSON.parse(readData);
  for (const [key, value] of Object.entries(parsedData)) {
    dbObject[key] = new Collection(value);
  }
  console.log('Successfully connected to db');
}

async function read() {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(pathToDb);
    let result;
    stream.on('data', data => {
      result = data;
    });
    stream.on('close', () => {
      resolve(result ? result.toString() : null);
    });
  });
}

async function synchronize() {
  const rawData = {};
  for (const [key, value] of Object.entries(dbObject)) {
    rawData[key] = value.raw();
  }
  const data = jsonStringify(rawData);
  await write(data);
}

async function write(data) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(pathToDb);
    stream.write(data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  reset,
  collection,
  connect,
  read,
  synchronize,
  write
};
