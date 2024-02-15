USE technical_test;

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `phone` char(10) NOT NULL UNIQUE,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `clients` (`name`, `email`, `phone`) VALUES
('Juanito Perez', 'example@test.com', '1234567890'),
('Filomeno Pancrasio', 'example2@test.com', '1234567899'),
('Panfilo Gonzalez', 'example3@test.com', '1234567898'),
