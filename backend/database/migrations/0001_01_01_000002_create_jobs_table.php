<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement("
            CREATE TABLE IF NOT EXISTS jobs (
                id BIGSERIAL PRIMARY KEY,
                queue VARCHAR(255),
                payload TEXT,
                attempts SMALLINT,
                reserved_at INTEGER,
                available_at INTEGER,
                created_at INTEGER
            )
        ");

        \DB::statement("CREATE INDEX IF NOT EXISTS jobs_queue_index ON jobs(queue)");

        \DB::statement("
            CREATE TABLE IF NOT EXISTS job_batches (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255),
                total_jobs INTEGER,
                pending_jobs INTEGER,
                failed_jobs INTEGER,
                failed_job_ids TEXT,
                options TEXT,
                cancelled_at INTEGER,
                created_at INTEGER,
                finished_at INTEGER
            )
        ");

        \DB::statement("
            CREATE TABLE IF NOT EXISTS failed_jobs (
                id BIGSERIAL PRIMARY KEY,
                uuid VARCHAR(255) UNIQUE,
                connection TEXT,
                queue TEXT,
                payload TEXT,
                exception TEXT,
                failed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }

    public function down(): void
    {
        \DB::statement("DROP TABLE IF EXISTS failed_jobs CASCADE");
        \DB::statement("DROP TABLE IF EXISTS job_batches CASCADE");
        \DB::statement("DROP TABLE IF EXISTS jobs CASCADE");
    }
};
