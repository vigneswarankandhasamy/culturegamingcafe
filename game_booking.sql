-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 03, 2025 at 02:28 PM
-- Server version: 10.11.10-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u518383203_culturegaming`
--

-- --------------------------------------------------------

--
-- Table structure for table `game_booking`
--

CREATE TABLE `game_booking` (
  `id` int(11) NOT NULL,
  `session` varchar(150) DEFAULT NULL,
  `session_date` date DEFAULT NULL,
  `session_from_time` varchar(150) DEFAULT NULL,
  `session_to_time` varchar(150) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_booking`
--

INSERT INTO `game_booking` (`id`, `session`, `session_date`, `session_from_time`, `session_to_time`, `created_at`, `updated_at`) VALUES
(38, 'Soapy Foot Ball', '2025-07-07', '3:12 P.M', '4:12 P.M', '2025-07-05 09:42:20', '2025-07-05 09:42:20'),
(39, 'Soapy Foot Ball', '2025-07-06', '3:13 P.M', '5:15 P.M', '2025-07-05 09:43:17', '2025-07-05 09:43:17'),
(40, 'Soapy Foot Ball', '2025-07-13', '5:00 P.M', '6:00 P.M', '2025-07-06 12:22:44', '2025-07-06 12:22:44'),
(41, 'Soapy Foot Ball', '2025-07-19', '12:00 P.M', '1:20 P.M', '2025-07-15 07:51:35', '2025-07-15 07:51:35'),
(42, 'Soapy Foot Ball', '2025-07-19', '4:00 P.M', '5:00 P.M', '2025-07-18 17:16:50', '2025-07-18 17:16:50'),
(43, 'Soapy Foot Ball', '2025-07-21', '4:00 P.M', '5:00 P.M', '2025-07-18 17:17:42', '2025-07-18 17:17:42'),
(44, 'Soapy Foot Ball', '2025-07-30', '7:37 P.M', '8:37 P.M', '2025-07-20 14:05:33', '2025-07-20 14:05:33'),
(45, 'Soapy Foot Ball', '2025-07-31', '5:37 P.M', '7:37 P.M', '2025-07-20 14:08:03', '2025-07-20 14:08:03'),
(46, 'Soapy Foot Ball', '2025-07-31', '5:35 A.M', '6:50 A.M', '2025-07-20 14:15:14', '2025-07-20 14:15:14'),
(47, 'Soapy Foot Ball', '2025-07-20', '8:30 P.M', '9:45 P.M', '2025-07-20 14:28:32', '2025-07-20 14:28:32'),
(48, 'Soapy Foot Ball', '2025-07-20', '8:30 A.M', '9:45 A.M', '2025-07-20 14:29:50', '2025-07-20 14:29:50'),
(49, 'Soapy Foot Ball', '2025-07-20', '8:30 P.M', '9:30 P.M', '2025-07-20 14:30:27', '2025-07-20 14:30:27'),
(50, 'Soapy Foot Ball', '2025-07-27', '4:05 P.M', '5:05 P.M', '2025-07-22 03:38:23', '2025-07-22 03:38:23'),
(51, 'Soapy Foot Ball', '2025-07-27', '11:00 A.M', '12:00 P.M', '2025-07-23 09:24:18', '2025-07-23 09:24:18'),
(52, 'Soapy Foot Ball', '2025-07-27', '12:00 P.M', '1:00 P.M', '2025-07-23 09:24:34', '2025-07-23 09:24:34'),
(53, 'Soapy Foot Ball', '2025-07-27', '2:00 P.M', '3:00 P.M', '2025-07-23 09:24:49', '2025-07-23 09:24:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game_booking`
--
ALTER TABLE `game_booking`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game_booking`
--
ALTER TABLE `game_booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
