# Запуск
```shell
npm i
npm start
```

# Сборка
```shell
npm i
npm run build
```

# Генерация контрактов для ручек
Теперь типы для ручек могут качаться прямо из сваггера.

Чтобы это сделать нужно выполнить последовательность действий:

```shell
sudo node scripts/generate-swagger/index
sudo chmod 777 src/api/
sudo chmod 777 src/api/schema.json
nvm use 16
sta -p ./src/api/schema.json -o ./src/api/
```

Типы сгенерятся в файл api/Api.ts.
