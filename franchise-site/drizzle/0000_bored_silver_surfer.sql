CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`region` text NOT NULL,
	`model` text NOT NULL,
	`experience` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`consent_at` text NOT NULL,
	`created_at` text NOT NULL
);
