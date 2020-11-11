-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2020 at 03:19 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `description`, `content`, `created_at`) VALUES
(1, 'В России суд впервые признал геноцидом массовые убийства советских граждан в годы Великой Отечественной войны', 'Солецкий районный суд Новгородской области признал геноцидом массовые убийства мирных жителей нацистами в деревне Жестяная Горка в 1942-1943 годах. Это первый подобный случай в российской судебной практике, сообщает РИА «Новости».', '«Признать вновь выявленные преступления, совершённые в 1942-1943 годах в деревне Жестяная Горка солдатами „тайлькоманды“ в отношении не менее 2600 советских граждан военными преступлениями против человечества, геноцидом национальных и этнических групп, представлявших собой население СССР», — сказала судья.\r\n\r\nМассовое уничтожение людей в Жестяной Горке сочли «частью плана Германии отделаться от всего мирного населения Советского Союза путём изгнания населения для того, чтобы колонизировать освободившуюся территорию немцами».\r\n\r\nОснованием для возбуждения уголовного дела в мае 2019 года стало найденное в районе деревни Жестяная Горка захоронение с останками 42 мирных граждан. В их числе были дети и беременная женщина. После этого поисковики обнаружили останки ещё нескольких сотен человек.\r\n\r\nПо данным следствия, мирных жителей и военнопленных убивали и пытали члены «тайлькоманды», сформированной нацистами, в которую входили 33 выходца из Латвии. Группой руководил немецкий генерал Герцог Курт. Всего у Жестяной горки расстреляли более 2600 человек. В интересах потомков погибших прокурор потребовал признать массовое убийство геноцидом.\r\n\r\n#новости #суд #история', '2020-10-27 21:44:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
