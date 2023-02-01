#!/bin/bash
ll
sudo node scripts/generate-swagger/index
sudo chmod 777 src/api/
sudo chmod 777 src/api/schema.json
sta -p ./src/api/schema.json -o ./src/api/
