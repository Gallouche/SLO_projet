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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `hash` varchar(128) NOT NULL,
  `salt` varchar(32) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
);

-- Create test users
INSERT INTO `users` VALUES (1,'admin','546bb7a8fce3889e8cd128321cb9e9adb18b05bb2460e8a0f6305d4cbb563e1d6e754f329c111b21b84e8ba1669cc91d99d5592c6e215f2aadc8a43bb7b39ec6','6f4c6bfb7754d2f0f38a2dfb7bf8eb27',1),
(2,'test','ef49a13e06447cae079a9f76c8374cfe4461f9dcd4f8ad9cc70e7d72a78693eefbfd0c4fe1a52938de8cd819df12f7c9ec7461435b91a82fe53a146b45b9a994','9d4afff9a2c466624ccec497644cac87',0);
