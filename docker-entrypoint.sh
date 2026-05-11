#!/bin/bash
set -e

cd /var/www/html

echo "==> Regenerando autoloader..."
composer dump-autoload --no-dev --optimize

echo "==> Limpando caches..."
php artisan config:clear
php artisan route:clear

echo "==> Executando migrations..."
php artisan migrate --force

echo "==> Executando seeders..."
php artisan db:seed --force

echo "==> Otimizando para produção..."
php artisan config:cache
php artisan route:cache

echo "==> Iniciando Apache..."
exec apache2-foreground
