<!--
 * @Author: jwchan1996
 * @Date: 2019-05-25 09:07:20
 * @LastEditors: jwchan1996
 * @LastEditTime: 2019-09-28 23:31:37
 -->
### 数据表设计
- 用户表 user
- 角色表 role
- 权限表 access
- 角色权限关联表 role_access_relation
- 操作日志表 admin_log
- 
- 帖子表 post
- 
- 用户的点赞收藏点亮表 user_likes_collects_lights_relation (考虑 mongodb)
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
avatar  - 头像(mediumtext)
bg - 背景(mediumtext)
title - 个人头衔(varchar)
signature - 个人签名(varchar)
sex  - 性别(0为保密，1为男，2为女)(int)
email  - 邮箱(varchar)
mobile  - 手机号(varchar)
create_time  - 创建时间(datetime)
update_time  - 更新时间(datetime)
fans  - 粉丝数(int)
follows  - 关注数(int)
lights  - 被点亮数(int)
role_id  - 角色ID(int)
status  - 用户显示状态(int)
```

#### <span style="color:#009688"># </span>角色表 role

> 字段

```
id  - 角色ID(int)
name  - 角色名称(varchar)
create_time  - 创建时间(datetime)
update_time  - 更新时间(datetime)
description  - 角色描述(varchar)
```

#### <span style="color:#009688"># </span>权限表 access

> 字段

```
id  - 权限ID(int)
sid  - 上级权限ID(int)(0代表没有上级)
name  - 权限名称(varchar)
code  - 权限代码(varchar)
create_time  - 创建时间(datetime)
update_time  - 更新时间(datetime)
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
title  - 帖子标题(varchar)(全文索引)
content  - 帖子内容(mediumtext)(全文索引)
md  - 帖子内容markdown(mediumtext)
create_time  - 创建时间(datetime)
update_time  - 更新时间(datetime)
pv  - 阅读数(int)
likes  - 点赞数(int)
collects  - 收藏数(int)
comments  - 评论数(int)
answers  - 回复数(int)
topic_id  - 话题ID(int)
last_answer_time - (帖子最后回复时间)(datetime)
status  - 帖子显示状态(int)
```

#### <span style="color:#009688"># </span>用户的点赞收藏点亮表 user_likes_collects_lights_relation (考虑 mongodb)

> 字段

```
_id  - 记录ID
uid  - 用户ID
like_posts  - (Arrays)点赞的帖子ID数组
collect_posts  - (Arrays)收藏的帖子ID数组
light_comments  - (Arrays)亮了的评论ID数组
light_answers - (Arrays)亮了的回复ID数组
```

#### <span style="color:#009688"># </span>帖子评论表 comment (考虑 mongodb)

> 字段

```
_id  - 评论ID
uid  - 用户ID
pid  - 帖子ID
content  - 评论内容
create_time  - 创建时间
update_time  - 更新时间
lights  - 点亮数
status  - 评论显示状态
```

#### <span style="color:#009688"># </span>评论回复表 answer (考虑 mongodb)

> 字段

```
根据回复类型 type 区分  
1 => 对评论的回复
2 => 对回复的回复
```

- 对评论的回复
```
_id  - 回复ID
type  - 回复类型值 1
pid  - 帖子ID
comment_id  - 目标评论的ID
requestor_id  - 发起人ID
targetor_id  - 目标人ID
content  - 回复内容
create_time  - 创建时间
update_time  - 更新时间
lights  - 点亮数
status  - 回复显示状态
```

- 对回复的回复
```
_id  - 回复ID
type  - 回复类型值 2
pid  - 帖子ID
comment_id  - 目标评论的ID
target_answer_id  - 目标回复的ID
requestor_id  - 发起人ID
targetor_id  - 目标人ID
content  - 回复内容
create_time  - 创建时间
update_time  - 更新时间
lights  - 点亮数
status  - 回复显示状态
```

#### <span style="color:#009688"># </span>用户动态表 user_log (考虑 mongodb)

> 动态记录不会因为用户改变操作而删除

> 字段

```
根据动态类型 type 区分  
1 => 评论
2 => 回复
3 => 关注他人
4 => 点赞
5 => 收藏
6 => 关注话题
7 => 发布帖子
```

- 评论类型动态
```
_id  - 动态ID
type  - 动态类型值 1
uid  - 用户ID
pid  - 帖子ID
post_owner_id  - 帖子发表人ID
comment_id  - 评论ID
create_time  - 创建时间
update_time  - 更新时间
```

- 回复类型动态
```
_id  - 动态ID
type  - 动态类型值 2
uid  - 用户ID
pid  - 帖子ID
targetor_id  - 回复目标人ID
answer_id  - 回复ID
create_time  - 创建时间
update_time  - 更新时间
```

- 关注他人类型动态
```
_id  - 动态ID
type  - 动态类型值 3
uid  - 用户ID
follow_people_id  - 关注的人ID
create_time  - 创建时间
update_time  - 更新时间
```

- 点赞类型动态
```
_id  - 动态ID
type  - 动态类型值 4
uid  - 用户ID
pid  - 帖子ID
post_owner_id  - 帖子发表人ID
create_time  - 创建时间
update_time  - 更新时间
```

- 收藏类型动态
```
_id  - 动态ID
type  - 动态类型值 5
uid  - 用户ID
pid  - 帖子ID
post_owner_id  - 帖子发表人ID
create_time  - 创建时间
update_time  - 更新时间
```

- 关注话题类型动态
```
_id  - 动态ID
type  - 动态类型值 6
uid  - 用户ID
follow_topic_id  - 关注的话题ID
create_time  - 创建时间
update_time  - 更新时间
```

- 发布帖子类型动态
```
_id  - 动态ID
type  - 动态类型值 7
uid  - 用户ID
pid  - 帖子ID
create_time  - 创建时间
update_time  - 更新时间
```

#### <span style="color:#009688"># </span>话题表 topic

> 字段

```
id  - 话题ID(int)
sid  - 上级话题ID(int)(0代表没有上级)
name  - 话题名称(varchar)
intro  - 话题简介(varchar)
icon  - 话题图标(mediumtext)
num  - 序号(int)
create_time  - 创建时间(datetime)
update_time  - 更新时间(datetime)
posts  - 帖子总数(int)
followers  - 关注总数(int)
status  - 话题显示状态(int)(0代表隐藏)
```

#### <span style="color:#009688"># </span>用户关注表 user_fans_relation (考虑 mongodb)

> 字段

```
_id  - 记录ID
uid  - 用户ID
follow_uid  - 关注的偶像ID
create_time  - 关注时间
state  - 关注状态(1为关注，0为未关注)
```

#### <span style="color:#009688"># </span>用户订阅话题表 user_topic_relation (考虑 mongodb)

> 字段

```
_id  - 记录ID
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
_id  - 信息ID
uid  - 用户ID
cid  - 私信ID
content  - 私信内容
create_time  - 创建时间
```