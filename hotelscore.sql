/*
Navicat MySQL Data Transfer

Source Server         : 11
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : hotelscore

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2019-11-13 15:23:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hotel
-- ----------------------------
DROP TABLE IF EXISTS `hotel`;
CREATE TABLE `hotel` (
  `hotelid` int(16) NOT NULL AUTO_INCREMENT,
  `hotelname` varchar(32) NOT NULL,
  `introduction` varchar(32) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `pic` varchar(255) NOT NULL,
  `score` int(1) NOT NULL,
  `price` double(16,0) NOT NULL,
  `kind` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `flag` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`hotelid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotel
-- ----------------------------
INSERT INTO `hotel` VALUES ('1', '千峰', '舒服', '富贵路', '13709394666', 'uploadFiles/b09852e7030945fb97d271603c40fc86_06.png', '4', '360', '商务', '大保健', '1');
INSERT INTO `hotel` VALUES ('2', '2bacd', 'dada', 'adas', '1233', 'uploadFiles/3f766bf693d940bba2d4897c9c990ef0_h1.jpg', '3', '5', '55', '性爱', '0');
INSERT INTO `hotel` VALUES ('3', 'abc', 'dada', 'adas', '1233', 'uploadFiles/cfa279ca017947108a1e22ca9f10e0ed_h2.jpg', '3', '4', '2dsada', 'asdasdas', '0');
INSERT INTO `hotel` VALUES ('4', '大富豪', '爽歪歪', '小路', '123', 'uploadFiles/c3241853c36c43a0a3dedfd1c39d37e2_h3.jpg', '5', '25', '好', '好好好', '0');
INSERT INTO `hotel` VALUES ('5', '大富豪', '爽歪歪', '小路', '123', '333', '5', '25', '好', '好好', '0');
INSERT INTO `hotel` VALUES ('6', '小符号', '2313', '2131132', '1231231', '123123', '6', '312', '33', '33', '1');
INSERT INTO `hotel` VALUES ('7', '1', '23', '12312', '213123', '213121', '5', '31212', '21312', '12312', '1');
INSERT INTO `hotel` VALUES ('8', '2312', '12312', '13212', '21321', '123123', '1', '2', '', '', '0');
INSERT INTO `hotel` VALUES ('9', 'adsa', 'asdada', 'sdaasa', 'dasasdas', 'sadsada', '3', '4', 'dsadaas', 'dadaa', '0');
INSERT INTO `hotel` VALUES ('10', '321211', '12321321', '12312312', '123121', '12321312', '2', '2', '23112', '2131', '0');
INSERT INTO `hotel` VALUES ('11', '21321', '123213', '32113', '312131', '21', '3', '3', '213112', '1233121', '0');
INSERT INTO `hotel` VALUES ('12', '1322131', '12313', '21321', '12312', '2', '3', '4', '1231231', '3211212', '0');
