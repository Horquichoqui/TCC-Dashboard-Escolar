# ─── Stage 1: Compilar o frontend React ──────────────────────────────────────
FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY frontend/ .

# Remove .env.production para usar VITE_API_URL=/api (mesmo servidor)
RUN rm -f .env.production

RUN npm install --legacy-peer-deps
RUN VITE_API_URL=/api npm run build


# ─── Stage 2: PHP + Apache servindo Laravel + React ──────────────────
FROM php:8.3-apache

# Dependências do sistema e extensões PHP
RUN apt-get update && apt-get install -y \
    git curl unzip libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Habilitar módulos Apache necessários
RUN a2enmod rewrite headers

# Copiar configuração do Apache
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Copiar o backend
COPY backend/ /var/www/html/

# Copiar o frontend compilado para public/ do Laravel
COPY --from=frontend-builder /app/dist/ /var/www/html/public/

# Instalar dependências PHP
# Remove o composer.lock para forçar resolução com PHP 8.3 (Laravel 12 / Symfony 7)
WORKDIR /var/www/html
RUN rm -f composer.lock && composer install --no-dev --optimize-autoloader

# Permissões para Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Entrypoint
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
CMD ["/docker-entrypoint.sh"]
