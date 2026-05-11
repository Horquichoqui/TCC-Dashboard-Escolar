<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::statement('CREATE TABLE IF NOT EXISTS jobs (
            id BIGSERIAL PRIMARY KEY,
            queue VARCHAR(255),
            payload TEXT,
            attempts SMALLINT,
            reserved_at INTEGER,
            available_at INTEGER,
            created_at INTEGER
        )');

        Schema::statement('CREATE INDEX IF NOT EXISTS jobs_queue_index ON jobs(queue)');

        Schema::statement('CREATE TABLE IF NOT EXISTS job_batches (
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
        )');

        Schema::statement('CREATE TABLE IF NOT EXISTS failed_jobs (
            id BIGSERIAL PRIMARY KEY,
            uuid VARCHAR(255) UNIQUE,
            connection TEXT,
            queue TEXT,
            payload TEXT,
            exception TEXT,
            failed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
    }
};
