-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2016 a las 10:36:03
-- Versión del servidor: 5.5.53-0ubuntu0.14.04.1
-- Versión de PHP: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `shacu`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetocultura`
--

CREATE TABLE IF NOT EXISTS `objetocultura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enlacecontenido` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `tipocontenido` enum('texto','imagen','audio','archivo') COLLATE utf8_unicode_ci NOT NULL,
  `id_usuario` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_validacion` date NOT NULL,
  `qr_asociado` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `objetocultura`
--

INSERT INTO `objetocultura` (`id`, `enlacecontenido`, `tipocontenido`, `id_usuario`) VALUES
(1, 'http://www.shacu.com/contenido1.png', 'imagen', '110169484474386276334'),
(2, 'www.shacu.com/dondesea.wav', 'audio', '120668444274486276338'),
(3, 'http://www.shacu.com/archivo.zip', 'archivo', '120668444274486276338'),
(4, 'http://www.shacu.com/citacelebre.txt', 'texto', '110169484474386276334'),
(5, 'http://www.shacu.com/gato.jpg', 'imagen', '120668444274486276338');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntoqr`
--

CREATE TABLE IF NOT EXISTS `puntoqr` (
  `id` int(11) NOT NULL,
  `longitud` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `latitud` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `enlaceweb` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `descripcionlocalizacion` text COLLATE utf8_unicode_ci NOT NULL,
  `id_objetocultura` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_objetocultura` (`id_objetocultura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `puntoqr`
--

INSERT INTO `puntoqr` (`longitud`, `latitud`, `enlaceweb`, `descripcionlocalizacion`, `id_objetocultura`) VALUES
(1, '-16.321945', '28.478774', 'qr018Fw', 'Entrada de la facultad de Farmacia', 3),
(2, '-16.322340', '28.482815', 'qr01af3', 'Tablon de la cafeteria de la ETSII', 4),
(3, '-16.322121', '28.483206', 'qr51af2', 'Cerca del aula 1.5 de la ETSII', 1),
(4, '-16.316471', '28.482243', 'qr75a54', 'Facultad de Educacion (Puerta principal)', 2),
(5, '-16.320369', '28.479917', 'qrye6s', 'Tablon de reprografia de Biologia', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'El nombre del usuario',
  `idgoogle` varchar(30) COLLATE utf8_unicode_ci NOT NULL COMMENT 'El ID de Google del usuario',
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'El email del usuario',
  PRIMARY KEY (`idgoogle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`nombre`, `idgoogle`, `email`) VALUES
('Alfredo Kraus', '110169484474386276334', 'alu0100884444@ull.edu.es'),
('Pedro Rodriguez', '120668444274486276338', 'alu0110884448@ull.edu.es');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `objetocultura`
--
ALTER TABLE `objetocultura`
  ADD CONSTRAINT `fk_idusuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`idgoogle`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `puntoqr`
--
ALTER TABLE `puntoqr`
  ADD CONSTRAINT `fkobjetocultura` FOREIGN KEY (`id_objetocultura`) REFERENCES `objetocultura` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
