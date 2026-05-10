#!/bin/bash
set -e

echo "==> Instalando dependências do Composer..."
composer install --no-dev --optimize-autoloader

echo "==> Limpando caches antigos..."
php artisan config:clear
php artisan route:clear

echo "==> Executando migrations..."
php artisan migrate --force

echo "==> Executando seeders (idempotente)..."
php artisan db:seed --class=DatabaseSeeder --force

echo "==> Otimizando para produção..."
php artisan config:cache
php artisan route:cache

echo "==> Build concluído com sucesso!"
