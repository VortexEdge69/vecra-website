
-- Vecra Hosting Referral-Tracking System
-- SQL Schema for MySQL/MariaDB

--
-- Table structure for table `referral_clicks`
--
-- This table logs each time a referral link is clicked.
--

CREATE TABLE `referral_clicks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ref` VARCHAR(100) NOT NULL,
  `utm` VARCHAR(100),
  `ip` VARCHAR(45),
  `user_agent` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--
-- Table structure for table `referral_conversions`
--
-- This table logs conversion events (e.g., signup, buy, contact).
--

CREATE TABLE `referral_conversions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ref` VARCHAR(100) NOT NULL,
  `action` VARCHAR(50) NOT NULL,
  `ip` VARCHAR(45),
  `user_agent` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
