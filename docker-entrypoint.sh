#!/bin/bash
set -e

cd /var/www/html

echo "==> Aguardando banco de dados ficar disponível..."
MAX_RETRIES=12
COUNT=0
until php -r "
\$host = getenv('DB_HOST');
\$port = getenv('DB_PORT') ?: '5432';
\$db   = getenv('DB_DATABASE');
\$user = getenv('DB_USERNAME');
\$pass = getenv('DB_PASSWORD');
\$ssl  = getenv('DB_SSLMODE') ?: 'require';
\$dsn  = \"pgsql:host=\$host;port=\$port;dbname=\$db;sslmode=\$ssl\";
new PDO(\$dsn, \$user, \$pass, [PDO::ATTR_TIMEOUT => 5]);
echo 'ok';
" 2>/dev/null | grep -q 'ok'; do
    COUNT=$((COUNT + 1))
    if [ "$COUNT" -ge "$MAX_RETRIES" ]; then
        echo "ERRO: Banco de dados não respondeu após $MAX_RETRIES tentativas."
        exit 1
    fi
    echo "    Tentativa $COUNT/$MAX_RETRIES — aguardando 5s..."
    sleep 5
done
echo "    Banco de dados disponível!"

echo "==> Registrando providers dos pacotes..."
php artisan package:discover --ansi

echo "==> Limpando caches..."
php artisan config:clear
php artisan route:clear

echo "==> Executando migrations..."
php artisan migrate --force

echo "==> Populando dados iniciais..."
php artisan db:seed --force && echo "    Seeders executados com sucesso." || echo "    AVISO: Seeders falharam. Continuando..."

echo "==> Otimizando para produção..."
php artisan config:cache
php artisan route:cache

echo "==> Iniciando Apache..."
exec apache2-foreground
