#!/bin/bash

set -a
source .env
set +a

# Connection parameters
MYSQL_USER="root"
MYSQL_PASSWORD=$MYSQL_ROOT_PASSWORD
MYSQL_HOST=mysql
MYSQL_DATABASE=$MYSQL_DATABASE

# Backup directory
BACKUP_DIR="./backups"
DATE=$(date +\%F_%H-%M-%S)

# Create the backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Perform the backup
docker exec mysql sh -c "exec mysqldump -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE" > "$BACKUP_DIR/db_backup_$DATE.sql"

# Keep only the last 3 backup files and remove older ones
ls -t $BACKUP_DIR/db_backup_*.sql | tail -n +4 | xargs -r rm -- 2>/dev/null