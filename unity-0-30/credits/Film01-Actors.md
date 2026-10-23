# 第一章演员与持械改装

首轮检查曾发现原素材的悬空手风格被带入新角色，不能验收。修订增加了实际肩—肘—腕三骨蒙皮褶袖（完整 UV、连续混合权重），手掌/武器原局部位姿保留；牛魔增加独立宽厚吻部、鼻孔凹面和嘴线。首轮失败截图保留在 `artifacts/film01-actors-before-arm-muzzle-fix`。修订仍须逐张验收。

此目录由 `StarFan.EditorTools.FilmActorBuilder.Build()` 通过 Unity Editor API 生成。不得手工编辑 prefab/mesh 的 Unity YAML。现有 `Art/Prefabs` 和 `Art/Source` 保留作来源；此目录不是从影片中提取的模型，也不代表电影官方授权。

- `Abao`：沿用完整 Player 骨架和 Animator；移除可见红胡子头发、重甲躯干与盾牌，换用 CharacterSet 的 Rogue 男头、去山羊胡的独立黑发与 Mage 男布袍蒙皮网格；新布袍分区为麻布、红腰带、裤腿和鞋。基础武器为有金属端箍与缠布握柄的行者木棍。
- `AbaoAscended`：同一骨架与人物，增加双卷金箍、红色蒙皮战袍和如意见习棍。普通 `Abao` 内相同 `Film01Ascended_*` 子物件默认隐藏，分别挂在头部和原 cloak bones，不能整体挂到武器上。
- `BullDemon`：沿用 Boss 完整骨架/披风和原攻击动画；派生头部网格改下颚/口鼻，新增闭合弯角与鼻环。长柄兵器保留原雕制斧刃模型，连接新雕纹长柄。
- 三类妖怪分别使用已有完整 Melee/Ranged/Charger 骨架，改变头角/服装材质与轮廓。
- `RuyiTrainingStaff` 是纯视觉替换武器。挂点仍为 `Tank_Weapon_Boy`，原局部变换保留；新棍的握点依据实际右手网格中心在挂点中的坐标生成。

曲面角、金箍、缠柄和雕纹长棍是新建闭合网格，没有可见的 Unity `CreatePrimitive` 占位。身体/头/眼/手/披风/斧刃基于 Unity 官方 Boss Room 的真实网格，保留其原许可证与出处于 `Art/Licenses`。这些派生素材仍受原素材许可约束，不能宣称为完全独立原创模型。

`Capture()` 对真实模型采样原动画，并通过 URP 输出检查图到项目 `artifacts/film01-actors`。生成、编译、正常镜头外观、握持、全动作变形需要分别验收；只有生成代码不等于视觉验收通过。
