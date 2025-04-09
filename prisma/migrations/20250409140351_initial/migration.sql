-- CreateTable
CREATE TABLE `tbl_tokens` (
    `token_id` CHAR(36) NOT NULL,
    `token_email` VARCHAR(128) NOT NULL,
    `token_access` TEXT NULL,
    `token_refresh` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tbl_tokens_token_email_key`(`token_email`),
    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
