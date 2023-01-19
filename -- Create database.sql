-- Create database
CREATE DATABASE react_books;

-- Create books table
CREATE TABLE `react_books`.`books`
(
    `id` int NOT NULL auto_increment,
    `title` varchar(50),
    `description` varchar(60),
    `rate` float,
    `created_at` timestamp, PRIMARY KEY (id)
);

-- Create reviews table
CREATE TABLE `react_books`.`reviews`
(
    `id` int NOT NULL auto_increment,
    `name` varchar(50),
    `comment` varchar(60),
    `rate` float,
    `created_at` timestamp, PRIMARY KEY (id)
);