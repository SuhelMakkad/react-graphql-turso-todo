ALTER TABLE `todos` RENAME COLUMN `title` TO `todo`;--> statement-breakpoint
DROP INDEX IF EXISTS `title_idx`;--> statement-breakpoint
CREATE INDEX `todo_idx` ON `todos` (`todo`);