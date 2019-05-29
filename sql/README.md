### 数据表设计
- 用户表 user
- 角色表 role
- 权限表 access
- 角色权限关联表 role_access_relation
- 操作日志表 admin_log
- 
- 帖子表 post
- 
- 用户帖子点赞收藏表 user_post_likes_collects_relation (考虑 mongodb)
- 帖子评论表 comment (考虑 mongodb)
- 评论回复表 answer (考虑 mongodb)
- 用户动态表 user_log (考虑 mongodb)
-
- 话题表 topic
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

#### <span style="color:#009688"># </span>操作日志表 admin_log

> 字段

```
id  - 日志ID
type  - 操作类型
content  - 操作内容
uid  - 操作人ID
create_time  - 操作时间
```

#### <span style="color:#009688"># </span>帖子表 post

> 字段

```
id  - 记录ID
pid  - 帖子ID
uid  - 用户ID
title  - 帖子标题
content  - 帖子内容
create_time  - 创建时间
update_time  - 更新时间
reads  - 阅读数
likes  - 点赞数
collects  - 收藏数
```

#### <span style="color:#009688"># </span>用户帖子点赞收藏表 user_post_likes_collects_relation (考虑 mongodb)

> 字段

```
id  - 记录ID
uid  - 用户ID
like_posts  - (Arrays)点赞的帖子数组
collect_posts  - (Arrays)收藏的帖子数组
```

#### <span style="color:#009688"># </span>帖子评论表 comment (考虑 mongodb)

> 字段

```
id  - 评论ID
uid  - 用户ID
pid  - 帖子ID
content  - 评论内容
create_time  - 创建时间
update_time  - 更新时间
```

#### <span style="color:#009688"># </span>评论回复表 answer (考虑 mongodb)

> 字段

```
id  - 回复ID
pid  - 帖子ID
requestor_id  - 发起人ID
targetor_id  - 目标人ID
content  - 回复内容
create_time  - 创建时间
update_time  - 更新时间
```

#### <span style="color:#009688"># </span>用户动态表 user_log (考虑 mongodb)

> 字段

```
根据动态类型 type 区分  
1 => 评论
2 => 回复
3 => 关注
4 => 点赞
```

- 评论类型动态
```
id  - 动态ID
type  - 动态类型值 1
uid  - 用户ID
pid  - 帖子ID
post_owner_id  - 帖子发表人ID
create_time  - 创建时间
```

- 回复类型动态
```
id  - 动态ID
type  - 动态类型值 2
uid  - 用户ID
pid  - 帖子ID
targetor_id  - 回复目标人ID
create_time  - 创建时间
```

- 关注类型动态
```
id  - 动态ID
type  - 动态类型值 3
uid  - 用户ID
follow_people_id  - 关注的人ID
create_time  - 创建时间
```

- 点赞类型动态
```
id  - 动态ID
type  - 动态类型值 4
uid  - 用户ID
pid  - 帖子ID
post_owner_id  - 帖子发表人ID
create_time  - 创建时间
```