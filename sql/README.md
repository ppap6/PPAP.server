### 数据表设计
- 用户表 user
- 角色表 role
- 权限表 access
- 角色权限关联表 role_access_relation
- 操作日志表 log
- 
- 帖子表 post
- 话题表 topic
- 评论表 comment
- 文章评论关联表 topic_comment
- 文章动态记录表 post_record (对文章：记录用户点赞、收藏、评论、时间等)
- 用户文章关联表 user_post
- 用户动态记录表 user_record (对用户：记录用户关注、回复)
- 私信信息表？ chat_message


#### <span style="color:#009688"># </span>用户表 user

> 字段

```
id  - 用户ID
name  - 姓名
account  - 账号
password  - 密码
avatar  - 头像
sex  - 性别
email  - 邮箱
mobile  - 手机号
create_time  - 创建时间
role_id  - 角色ID
```

#### <span style="color:#009688"># </span>角色表 role

> 字段

```
id  - 角色ID
name  - 角色名称
create_time  - 创建时间
description  - 角色描述
```

#### <span style="color:#009688"># </span>权限表 access

> 字段

```
id  - 权限ID
name  - 权限名称
create_time  - 创建时间
description  - 权限描述
```

#### <span style="color:#009688"># </span>角色权限关联表 role_access_relation

> 字段

```
id  - 记录ID
role_id  - 角色ID
access_id  - 权限ID
```

#### <span style="color:#009688"># </span>操作日志表 log

> 字段

```
id  - 日志ID
type  - 操作类型
content  - 操作内容
user_id  - 操作人ID
create_time  - 操作时间
```

#### <span style="color:#009688"># </span>帖子表 post

> 字段

```
id  - 帖子ID
user_id  - 用户ID
title  - 帖子标题
content  - 帖子内容
create_time  - 创建时间
update_time  - 更新时间
```