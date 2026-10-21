# 0.18 五片连续旅程美术

新增后四片的完整立体布景：功夫城寨连排楼/洗衣晾绳；食神厨房食摊/蒸笼/炒锅/餐桌；少林足球草场/球门网/看台；国产凌凌漆码头仓库/卷帘门/货箱/吊杆。第一片复用已验收的月寨环境。

`build_stage_art.py` 用 Blender 4.5.9 离线作者建模、倒角、UV、合并材质批次后导出 16 个 FBX；所有 source/blend 都保留。四环境分别 77,096 / 104,904 / 36,752 / 64,512 三角面，6–9 个材质组，每次仅激活当前片环境。中心 ±10.6 米无凸起道具，装饰集中在外围；球场白线只是地面涂装，非危害提示。没有从电影截图提取人物/场景。中文立体字使用 OFL Noto Sans CJK SC。

`SF018ArtBuilder.Run()` 在 Unity Editor 导入这些源文件并保存 URP 材质、环境和 16 个敌人服装变体，写现有 Film01 bank 的 `chapterArt[5]`。不修改原 source FBX、旧场景、角色动画和玩家。四片人形敌人从完整已批准骨架与连袖网格派生，换无胡须人类头；帽、围裙、运动发带、护目镜及手持物为真实新网格。牛角、牛鼻不会出现在后四片 Boss。原 Generic 绑定路径与 Animator 保留。

静态 API：`SF018StageVisuals.Attach(game)`；`PrefabFor(bank,role,film)`；`ProjectileFor(bank,film)`。选择敌人 prefab 必须在 `SFActor.Initialize` 之前；玩家永远返回原 bank.player，跨片不重置披袍/已持棍。投射物分别为旧炸罐、斧、肉丸、足球、子弹，飞行和伤害由原战斗代码负责。

当前状态：Blender 导出和 Python 格式检查已完成；主控已实际完成 Unity 编译/导入和 Builder，报告见 `artifacts/unity-0-18/art-builder.json`，5 环境 / 16 骨架服装变体已绑定。正常镜头识别和动作握点仍需主控实图验收，不能把资产构建报告当通过实玩。美术子任务没有启动 Unity，也没有修改或删除既有包/缓存。
