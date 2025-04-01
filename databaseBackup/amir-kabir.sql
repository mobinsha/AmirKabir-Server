-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2025 at 02:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amir-kabir`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `likes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `content`, `author_id`, `created_at`, `updated_at`, `likes`) VALUES
(4, 'سلام خوش اومدین به این مقاله جدید', 'در این مقاله میخوام یک چیزی رو تست کنم', 1, '2025-01-31 13:07:48', '2025-02-01 13:15:23', 0),
(11, 'آموزش HTML، CSS و JavaScript (از صفر تا صد)33', 'اگر قصد دارید طراحی و توسعه وب را یاد بگیرید، یادگیری سه زبان HTML، CSS و JavaScript ضروری است. این سه زبان پایه و اساس تمام وب‌سایت‌هایی هستند که در اینترنت مشاهده می‌کنید. در این آموزش، از مفاهیم ابتدایی تا تکنیک‌های پیشرفته را پوشش خواهیم داد.', 1, '2025-01-31 13:26:28', '2025-01-31 13:26:28', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `permission` enum('admin','manager','owner') NOT NULL DEFAULT 'admin',
  `status` enum('active','inactive','banned','suspended') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userName`, `password`, `permission`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2a$11$BdLII0dK0Hllxdqdfe7RGexrmgpw6kbolPgo8ImxbtmGNMp5d01eG', 'owner', 'active', '2025-01-25 12:44:55', '2025-01-25 12:45:09'),
(2, 'Mobin87', '$2a$11$1wUWNQ9EI5gPJBbhLl39we4A30O2rZBu2fiFKc9vHi4VI77ugkwAC', 'owner', 'active', '2025-01-25 12:44:55', '2025-01-25 12:45:09'),
(4, 'sohail234', '$2a$11$NJc8iT5jhfUo7rNNxaAttOv6xokU4uJ6wemZnzwwQa6EHG/bMfTWS', 'admin', 'active', '2025-02-01 12:06:51', '2025-02-01 12:06:51'),
(5, 'sohail2335', '$2a$11$PsunXO.wj4riMK/DrbD4z.zIaoFLH9Jz92qt2MLu/7wZdDnJcnctG', 'manager', 'active', '2025-02-01 12:42:57', '2025-02-01 12:42:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
