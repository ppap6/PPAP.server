/*
 * @Author: jwchan1996
 * @Date: 2019-06-04 23:49:30
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-05 10:18:38
 */

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `name` VARCHAR(100) NOT NULL COMMENT '昵称',
    `account` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '账号',
    `password` VARCHAR(100) NOT NULL COMMENT '密码',
    `avatar` MEDIUMTEXT NULL COMMENT '头像',
    `bg` MEDIUMTEXT NULL COMMENT '背景',
    `title` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '个人头衔',
    `signature` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '个人签名',
    `sex` INT(10) NOT NULL DEFAULT 0 COMMENT '性别',
    `email` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '邮箱',
    `mobile` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '手机号',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `update_time` DATETIME NOT NULL COMMENT '更新时间',
    `fans` INT(10) NOT NULL DEFAULT 0 COMMENT '粉丝数',
    `follows` INT(10) NOT NULL DEFAULT 0 COMMENT '关注数',
    `lights` INT(10) NOT NULL DEFAULT 0 COMMENT '被点亮数',
    `role_id` INT(10) NOT NULL COMMENT '角色ID',
    `status` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '用户显示状态（0代表隐藏）',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';


DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
    `name` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '角色名称',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `update_time` DATETIME NOT NULL COMMENT '更新时间',
    `description` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '角色描述',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

INSERT INTO `role` (`id`, `name`, `create_time`, `update_time`, `description`) VALUES
(1, '超级管理员', '2019-06-06 10:31:00', '2019-06-06 10:34:00', ''),
(2, '管理员', '2019-06-06 10:32:00', '2019-06-06 10:34:00', '全站管理、权限：用户、帖子、话题全权限'),
(3, '运营', '2019-06-06 10:33:00', '2019-06-06 10:34:00', '管理版主与普通用户、权限：话题创建、用户标签认证、删除修改用户帖子、重置用户密码'),
(4, '版主', '2019-06-06 10:34:00', '2019-06-06 10:34:00', '负责管理话题板块、权限：删除用户帖子、修改用户帖子、合并帖子、更改帖子话题分区'),
(5, '普通用户', '2019-07-02 00:06:26', '2019-07-02 23:35:24', '不能删除帖子，只能编辑');


DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '权限ID',
    `sid` INT(10) UNSIGNED NOT NULL COMMENT '上级权限ID',
    `name` VARCHAR(100) NOT NULL COMMENT '权限名称',
    `code` VARCHAR(100) NOT NULL COMMENT '权限代码',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `update_time` DATETIME NOT NULL COMMENT '更新时间',
    `description` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '权限描述',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';

INSERT INTO `access` (`id`, `sid`, `name`, `code`, `create_time`, `update_time`, `description`) VALUES
(1, 0, '用户管理', '/user', '2019-07-03 00:11:59', '2019-07-03 00:11:59', ''),
(2, 1, '所有用户', '/user/list', '2019-07-03 00:15:24', '2019-07-03 00:15:24', ''),
(3, 1, '用户小黑屋', '/user/blacklist', '2019-07-04 23:10:13', '2019-07-04 23:12:16', '233'),
(4, 0, '话题管理', '/topic', '2019-07-03 00:11:59', '2019-07-03 00:11:59', ''),
(5, 4, '所有话题', '/topic/list', '2019-07-03 00:15:24', '2019-07-03 00:15:24', ''),
(6, 0, '帖子管理', '/post', '2019-07-03 00:11:59', '2019-07-03 00:11:59', ''),
(7, 6, '所有帖子', '/post/list', '2019-07-03 00:15:24', '2019-07-03 00:15:24', ''),
(8, 6, '帖子小黑屋', '/post/blacklist', '2019-07-04 23:10:13', '2019-07-04 23:12:16', ''),
(17, 0, '角色权限', '/role_access', '2019-07-03 00:11:59', '2019-07-03 00:11:59', ''),
(18, 17, '角色管理', '/role_access/role', '2019-07-03 00:11:59', '2019-07-03 00:11:59', ''),
(19, 17, '权限管理', '/role_access/access', '2019-07-03 00:11:59', '2019-07-03 00:11:59', '');


DROP TABLE IF EXISTS `role_access_relation`;
CREATE TABLE `role_access_relation` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '记录ID',
    `role_id` INT(10) UNSIGNED NOT NULL COMMENT '角色ID',
    `access_id` INT(10) UNSIGNED NOT NULL COMMENT '权限ID',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色权限关联表';

INSERT INTO `role_access_relation` (`id`, `role_id`, `access_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(13, 2, 5),
(12, 2, 4),
(11, 2, 7),
(10, 2, 2),
(14, 2, 8),
(15, 2, 6),
(16, 2, 3),
(17, 2, 1),
(18, 4, 6),
(19, 4, 7),
(20, 4, 8);


DROP TABLE IF EXISTS `admin_log`;
CREATE TABLE `admin_log` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '日志ID',
    `uid` INT(10) UNSIGNED NOT NULL COMMENT '操作人ID',
    `type` INT(10) UNSIGNED NOT NULL COMMENT '操作类型（1新增2修改3删除）',
    `tname_cn` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '数据表英文字符串',
    `tname_en` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '数据表中文字符串',
    `content` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '操作内容',
    `create_time` DATETIME NOT NULL COMMENT '操作时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';


DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '帖子ID',
  `uid` INT(10) UNSIGNED NOT NULL COMMENT '用户ID',
  `title` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '贴子标题',
  `content` MEDIUMTEXT NOT NULL COMMENT '帖子内容',
  `md` MEDIUMTEXT NOT NULL COMMENT '帖子内容markdown',
  `create_time` DATETIME NOT NULL COMMENT '创建时间',
  `update_time` DATETIME NOT NULL COMMENT '更新时间',
  `pv` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '阅读数',
  `likes` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞数',
  `collects` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '收藏数',
  `comments` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '评论数',
  `answers` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '回复数',
  `topic_id` INT(10) UNSIGNED NOT NULL COMMENT '话题ID',
  `last_answer_time` DATETIME NULL COMMENT '帖子最后回复时间',
  `status` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '帖子显示状态（0代表隐藏）',
  PRIMARY KEY (`id`),
  FULLTEXT (`title`, `content`) WITH PARSER ngram
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子表';


DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '话题ID',
    `sid` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级话题ID',
    `name` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '话题名称',
    `intro` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '话题简介',
    `icon` MEDIUMTEXT NOT NULL COMMENT '话题图标',
    `num` INT(10) NOT NULL COMMENT '序号',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `update_time` DATETIME NOT NULL COMMENT '更新时间',
    `posts` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '帖子总数',
    `followers` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '关注总数',
    `status` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '话题显示状态',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='话题表';


DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '私信ID',
    `uid_str` VARCHAR(100) NOT NULL COMMENT '用户ID字符串',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='私信表';