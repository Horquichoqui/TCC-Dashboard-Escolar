#!/bin/bash
set -e

echo "Installing dependencies..."
composer install --no-dev --optimize-autoloader

echo "Running migrations..."
php artisan migrate --force

echo "Seeding database..."
php artisan db:seed --class=DatabaseSeeder

echo "Build completed!"
