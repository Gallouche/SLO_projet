-- -
-- File:        slo.sql
-- Authors:     Guillaume Blanco, Lucas Elisei, Théo Gallandat, David Truan
-- Created on:  17.06.2017
-- Description: SQL script for granting rights to 'slo_user'. Must be executed by root user.
-- -

-- Grants for 'slo_user'@'localhost'
GRANT USAGE ON *.* TO 'slo_user'@'localhost' IDENTIFIED BY PASSWORD '*196BDEDE2AE4F84CA44C47D54D78478C7E2BD7B7';
GRANT DELETE, INSERT, SELECT, UPDATE ON `slo_schema`.* TO 'slo_user'@'localhost';

-- Delete 'test' schema if it exists.
DROP DATABASE IF EXISTS test;

-- Create 'users' table.
USE slo_schema;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `hash` varchar(128) NOT NULL,
  `salt` varchar(32) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
);
