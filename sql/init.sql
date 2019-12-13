/*
 * @Author: jwchan1996
 * @Date: 2019-06-04 23:49:30
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-05 10:18:38
 */

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `name` VARCHAR(100) NOT NULL COMMENT '昵称',
    `account` VARCHAR(20) NOT NULL COMMENT '账号',
    `password` VARCHAR(100) NOT NULL COMMENT '密码',
    `avatar` VARCHAR(200) NOT NULL DEFAULT 'https://i.loli.net/2019/11/12/9fbF4wGvU6jYBXA.png' COMMENT '头像',
    `sex` INT NOT NULL DEFAULT 0 COMMENT '性别',
    `email` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '邮箱',
    `mobile` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '手机号',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `update_time` DATETIME NOT NULL COMMENT '更新时间',
    `role_id` INT NOT NULL COMMENT '角色ID',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户表';


DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
    `name` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '角色名称',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `update_time` DATETIME NOT NULL COMMENT '更新时间',
    `description` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '角色描述',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='角色表';


DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '权限ID',
    `sid` INT UNSIGNED NOT NULL COMMENT '上级权限ID',
    `name` VARCHAR(100) NOT NULL COMMENT '权限名称',
    `code` VARCHAR(100) NOT NULL COMMENT '权限代码',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `update_time` DATETIME NOT NULL COMMENT '更新时间',
    `description` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '权限描述',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='权限表';


DROP TABLE IF EXISTS `role_access_relation`;
CREATE TABLE `role_access_relation` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '记录ID',
    `role_id` INT UNSIGNED NOT NULL COMMENT '角色ID',
    `access_id` INT UNSIGNED NOT NULL COMMENT '权限ID',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='角色权限关联表';


DROP TABLE IF EXISTS `admin_log`;
CREATE TABLE `admin_log` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '日志ID',
    `uid` INT UNSIGNED NOT NULL COMMENT '操作人ID',
    `type` INT UNSIGNED NOT NULL COMMENT '操作类型（1新增2修改3删除）',
    `tname_cn` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '数据表英文字符串',
    `tname_en` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '数据表中文字符串',
    `content` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '操作内容',
    `create_time` DATETIME NOT NULL COMMENT '操作时间',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='操作日志表';


DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
<<<<<<< HEAD
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '帖子ID',
    `uid` INT UNSIGNED NOT NULL COMMENT '用户ID',
    `title` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '贴子标题',
    `content` TEXT NOT NULL DEFAULT '' COMMENT '帖子内容',
    `md` TEXT NOT NULL DEFAULT '' COMMENT '帖子内容markdown',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `update_time` DATETIME NOT NULL COMMENT '更新时间',
    `topic_id` INT UNSIGNED NOT NULL COMMENT '话题ID',
    `pv` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '阅读数',
    `likes` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞数',
    `collects` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '收藏数',
    `status` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '帖子显示状态',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='帖子表';
=======
  `id` int(10) UNSIGNED NOT NULL COMMENT '帖子ID',
  `uid` int(10) UNSIGNED NOT NULL COMMENT '用户ID',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '贴子标题',
  `content` text NOT NULL COMMENT '帖子内容',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  `pv` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '阅读数',
  `likes` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞数',
  `collects` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '收藏数',
  `topic_id` int(10) UNSIGNED NOT NULL COMMENT '话题ID',
  `status` int(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '帖子显示状态（0代表隐藏）'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COMMENT='帖子表';
>>>>>>> 5520c9abcf789eccaae02c00db1bb014399b9264


DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '话题ID',
    `sid` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级话题ID',
    `name` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '话题名称',
    `intro` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '话题简介',
    `icon` VARCHAR(255) NOT NULL DEFAULT 'https://files.catbox.moe/ggkfkb.png' COMMENT '话题图标',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `update_time` DATETIME NOT NULL COMMENT '更新时间',
    `posts` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '帖子总数',
    `followers` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '关注总数',
    `status` INT UNSIGNED NOT NULL DEFAULT 1 COMMENT '话题显示状态',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='话题表';


DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '私信ID',
    `uid_str` VARCHAR(100) NOT NULL COMMENT '用户ID字符串',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='私信表';