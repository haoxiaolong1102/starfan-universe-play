# 0.20 角色与小片场素材

新增源由 `build_art.py` 使用 Blender 离线建模：25 个可独立切换的三维外围片场和 7 件带 UV 的成品道具。不是运行时几何占位或平面背景。模型按材质合并，当前外围/配件逐件三角数、哈希与 UV 状态见 manifest.json；旧地面分离记录见 ground-extraction.json。

`SF020ArtBuilder.Run()` 仅创建 Campaign020 目录内材料、预制体、动作与独立 Resources/StarFan020Assets.asset。复用已验收 019 成人、完整 Generic 骨架、蒙皮袖子、真实握持、音频。10 个命名小头目和 5 个精英变体只改衣装与真实配件，不缩放骨骼。25 场景保持中心移动区不新增碰撞；需要原生镜头复核，不能以生成脚本代替验收。

新增小头目包括二当家、牛魔监军、琛哥、琴魔、鹅头、擂台主厨、魔鬼队铁卫、魔鬼队门将、黑衣信使、装甲督察。擂台主厨、各队/特勤称呼等为本作改编身份；没有复制演员肖像、影视截图或电影音轨，也没有获得电影改编授权的声明。

许可边界：继承 Unity 官方 Boss Room 参考美术的原许可证与归属说明；自制环境、木琴、眼罩、帽、肩章、头盔、念珠、飞刀新增源保存在本目录。旧 art/campaign018、Film01、Fan019 原许可保留；不改写旧发布银行或资产。音频完全沿用 019 已记录合法来源，没有新第三方下载。

制作状态：首轮 Unity 导入、完整骨架断言和 25 场地/10 小头目截图已由主控执行。原图确认帽冠悬空、金色饰件离身、琴体偏细、地标被遮和气劲不透明叠加；本次源修订已完成，修后原生截图仍待主控验收。

地面修订：`extract_ground.py` 从原 `art/campaign018` 实际 Blender 文件中按完整连通网格岛提取地面，保留 UV 和原材料，不截取建筑底面。Kungfu/Food/Soccer/Spy 各一份 Ground1–4.fbx；大话西游由 Builder 只复制批准的沙地地形网格。25 新 FBX 不再带第二层地板，也不导入旧环境建筑。新独立牌匾和牛角降低高度，战场边界/碰撞未改。CaptainMedal 源作为未使用历史道具保留，角色已不装配。

气劲修订：仅 020 LionRoarWave 改用自有透明、无深度写入的粒子材质，使用原许可 T_Slash_01 贴图和原曲面粒子；旧 slashFX、动画、碰撞和伤害强度未改。

最终气劲遮罩修正：原许可 T_Slash_01 是16位灰度无alpha，Builder复制到仅020的Textures/LionRoarWave_Opacity.png，并通过Unity TextureImporter.FromGrayScale生成alpha/RGBA32。原文件未修改，新副本沿用原Boss Room许可。
