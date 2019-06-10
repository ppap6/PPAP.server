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
- 
- 用户关注表 user_fans_relation (考虑 mongodb)
- 用户订阅话题表 user_topic_relation (考虑 mongodb)
- 
- 私信表 chat
- 私信信息表 message (考虑 mongodb)


#### <span style="color:#009688"># </span>用户表 user

> 字段

```
id  - 用户ID(int)
name  - 姓名(varchar)
account  - 账号(varchar)
password  - 密码(varchar)
avatar  - 头像(varchar)
sex  - 性别(0为保密，1为男，2为女)(int)
email  - 邮箱(varchar)
mobile  - 手机号(varchar)
create_time  - 创建时间(datetime)
role_id  - 角色ID(int)
```

#### <span style="color:#009688"># </span>角色表 role

> 字段

```
id  - 角色ID(int)
name  - 角色名称(varchar)
create_time  - 创建时间(datetime)
description  - 角色描述(varchar)
```

#### <span style="color:#009688"># </span>权限表 access

> 字段

```
id  - 权限ID(int)
name  - 权限名称(varchar)
create_time  - 创建时间(datetime)
description  - 权限描述(varchar)
```

#### <span style="color:#009688"># </span>角色权限关联表 role_access_relation

> 字段

```
id  - 记录ID(int)
role_id  - 角色ID(int)
access_id  - 权限ID(int)
```

#### <span style="color:#009688"># </span>操作日志表 admin_log

> 字段

```
id  - 日志ID(int)
uid  - 操作人ID(int)
type  - 操作类型(1新增2修改3删除)(int)
tname_en  - 数据表英文字符串(','分割)(varchar)
tname_cn  - 数据表中文字符串(','分割)(varchar)
content  - 操作内容(如：修改用户密码)(varchar)
create_time  - 操作时间(datetime)
```

#### <span style="color:#009688"># </span>帖子表 post

> 字段

```
id  - 帖子ID(int)
uid  - 用户ID(int)
title  - 帖子标题(varchar)
content  - 帖子内容(varchar)
create_time  - 创建时间(datetime)
update_time  - 更新时间(datetime)
topic_id  - 话题ID(int)
reads  - 阅读数(int)
likes  - 点赞数(int)
collects  - 收藏数(int)
```

#### <span style="color:#009688"># </span>用户的帖子点赞收藏表 user_post_likes_collects_relation (考虑 mongodb)

> 字段

```
id  - 记录ID
uid  - 用户ID
like_posts  - (Arrays)点赞的帖子ID数组
collect_posts  - (Arrays)收藏的帖子ID数组
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

> 动态记录不会因为用户改变操作而删除

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

#### <span style="color:#009688"># </span>话题表 topic

> 字段

```
id  - 话题ID(int)
name  - 话题名称(varchar)
intro  - 话题简介(varchar)
create_time  - 创建时间(datetime)
update_time  - 更新时间(datetime)
posts  - 帖子总数(int)
followers  - 关注总数(int)
```

#### <span style="color:#009688"># </span>用户关注表 user_fans_relation (考虑 mongodb)

> 字段

```
id  - 记录ID
uid  - 用户ID
follow_uid  - 关注的偶像ID
create_time  - 关注时间
state  - 关注状态(1为关注，0为未关注)
```

#### <span style="color:#009688"># </span>用户订阅话题表 user_topic_relation (考虑 mongodb)

> 字段

```
id  - 记录ID
uid  - 用户ID
follow_topic_id  - 关注的话题ID
create_time  - 关注时间
state  - 关注状态(1为关注，0为未关注)
```

#### <span style="color:#009688"># </span>私信表 chat

> 用户 ID 字符串以 `_` 下划线分割，查询使用 LIKE 配合 % 模糊匹配  
如： `SELECT * FROM [chat] WHERE uid_str LIKE '%_12_'` 即可匹配到用户 ID 为 12 的用户全部私信记录

> 字段

```
id  - 私信ID(int)
uid_str  - 用户ID字符串(如: "_12_52_" 代表私信是由 ID 为 12 的用户与 ID 为 52 的用户建立的)(varchar)
create_time  - 创建时间(datetime)
```

#### <span style="color:#009688"># </span>私信信息表 message (考虑 mongodb)

> 字段

```
id  - 信息ID
uid  - 用户ID
cid  - 私信ID
content  - 私信内容
create_time  - 创建时间
```