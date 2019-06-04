/*
 * @Author: jwchan1996
 * @Date: 2019-06-04 23:49:30
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-06-04 23:49:30
 */

DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `name` VARCHAR(30) NOT NULL DEFAULT '' COMMENT '昵称',
    `account` VARCHAR(20) NOT NULL COMMENT '账号',
    `password` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '昵称',
    `avatar` VARCHAR(200) NOT NULL DEFAULT '' COMMENT '头像',
    `sex` INT NOT NULL DEFAULT 0 COMMENT '性别',
    `email` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '邮箱',
    `mobile` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '头像',
    `create_time` DATETIME NOT NULL COMMENT '创建时间',
    `role_id` INT(10) NOT NULL DEFAULT '' COMMENT '角色ID',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='用户表';