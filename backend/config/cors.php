<?php

return [
    /*
     * Origens permitidas para requisições cross-origin.
     * Em produção: o domínio único unificado.
     * Em desenvolvimento: localhost (dev frontend em porta separada).
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://tcc-dashboard.onrender.com',  // Novo domínio único (frontend + backend unificados)
        'http://localhost:5173',                // Vite dev server (frontend)
        'http://localhost:3000',                // Express dev server (fallback)
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
