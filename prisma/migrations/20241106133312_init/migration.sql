-- CreateTable
CREATE TABLE `tbl_session` (
    `session_id` INTEGER NOT NULL AUTO_INCREMENT,
    `session` VARCHAR(64) NOT NULL,
    `session_access` VARCHAR(1024) NOT NULL,
    `session_refresh` VARCHAR(1024) NOT NULL,

    UNIQUE INDEX `tbl_session_session_key`(`session`),
    INDEX `idx_session`(`session`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
