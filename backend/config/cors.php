<?php

return [
    /*
     * Origens permitidas para requisições cross-origin.
     * Em produção: o frontend estático no Render.
     * Em desenvolvimento: localhost do Vite.
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://tcc-dashboard-frontend.onrender.com',
        'http://localhost:5173',
        'http://localhost:3000',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
