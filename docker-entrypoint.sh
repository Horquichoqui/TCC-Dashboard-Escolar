#!/bin/bash
set -e

cd /var/www/html

echo "==> Aguardando banco de dados ficar disponível..."
MAX_RETRIES=10
COUNT=0
until php artisan migrate:status > /dev/null 2>&1; do
    COUNT=$((COUNT + 1))
    if [ "$COUNT" -ge "$MAX_RETRIES" ]; then
        echo "ERRO: Banco de dados não respondeu após $MAX_RETRIES tentativas."
        exit 1
    fi
    echo "    Tentativa $COUNT/$MAX_RETRIES — aguardando 5s..."
    sleep 5
done
echo "    Banco de dados disponível!"

echo "==> Limpando caches..."
php artisan config:clear
php artisan route:clear

echo "==> Executando migrations..."
php artisan migrate --force

echo "==> Populando dados iniciais..."
php artisan db:seed --force && echo "    Seeders executados com sucesso." || echo "    AVISO: Seeders falharam (dados podem já existir ou houve erro). Continuando..."

echo "==> Otimizando para produção..."
php artisan config:cache
php artisan route:cache

echo "==> Iniciando Apache..."
exec apache2-foreground
