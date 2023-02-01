const fs = require('fs');
const { join } = require('path');
const fetch = require('node-fetch');

const ROOT = join(__dirname, '../..');
const FILENAME = 'schema.json';

const SCHEMA_URL =
    'https://app.swaggerhub.com/apiproxy/registry/NikitaLobaev/HandOver/1.2?resolved=true&flatten=true&pretty=true';

const generate = async () => {
    const API_FOLDER = join(ROOT, 'src', 'api');

    try {
        fs.mkdirSync(API_FOLDER);
        // eslint-disable-next-line no-empty
    } catch (err) {}

    // качаем схему
    const schema = await fetch(SCHEMA_URL)
        .then((response) => response.json())
        .catch(() => null);

    if (!schema) {
        console.error('Не удалось загрузить схему.');
        return;
    }

    // создаем файл со схемой и пишем внутрь
    const SCHEMA_PATH = join(API_FOLDER, FILENAME);
    fs.writeFileSync(SCHEMA_PATH, JSON.stringify(schema), {
        mode: 777,
        flag: 'w+',
        encoding: 'utf-8',
    });
};

generate();
