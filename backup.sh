#!/bin/bash

set -a
source .env
set +a

# Параметры подключения
MYSQL_USER="root"
MYSQL_PASSWORD=$MYSQL_ROOT_PASSWORD
MYSQL_HOST=mysql
MYSQL_DATABASE=test

# Папка для хранения бекапов
BACKUP_DIR="./backups"
DATE=$(date +\%F_%H-%M-%S)

# Создание директории для бекапов, если ее нет
mkdir -p $BACKUP_DIR

# Выполнение резервного копирования
docker exec mysql sh -c "exec mysqldump -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE" > "$BACKUP_DIR/db_backup_$DATE.sql"