CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`todo` text NOT NULL,
	`completed` integer DEFAULT false,
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`updated_at` integer DEFAULT (cast (unixepoch () as int)),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` integer DEFAULT (cast (unixepoch () as int)),
	`updated_at` integer DEFAULT (cast (unixepoch () as int))
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `todos` (`user_id`);--> statement-breakpoint
CREATE INDEX `todo_idx` ON `todos` (`todo`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_password_idx` ON `users` (`password`);--> statement-breakpoint
CREATE INDEX `first_name_last_name_idx` ON `users` (`first_name`,`last_name`);