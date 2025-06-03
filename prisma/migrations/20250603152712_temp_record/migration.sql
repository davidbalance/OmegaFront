-- CreateTable
CREATE TABLE `tbl_temp_record` (
    `temp_record` CHAR(36) NOT NULL,
    `temp_key` VARCHAR(255) NOT NULL,
    `temp_json` JSON NOT NULL,
    `temp_expires_at` DATETIME NOT NULL,

    UNIQUE INDEX `tbl_temp_record_temp_key_key`(`temp_key`),
    INDEX `tbl_temp_record_temp_key_idx`(`temp_key`),
    PRIMARY KEY (`temp_record`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
