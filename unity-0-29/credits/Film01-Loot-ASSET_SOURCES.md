# Alpha 0.17 拾取物与音效

此目录是新增成品网格与声音，不覆盖 0.16 的角色、持棍动作或原始素材。

## 可执行入口

主控在停止 Play 后执行 `StarFan.EditorTools.FilmLootBuilder.Run()`。它导入 14 个离线 Blender FBX，创建 URP Lit 材质和 prefab，配置 12 段短 WAV，更新 `StarFanFilm01Assets`。不修改战斗数值、拾取规则、场景或动作库。

- 三档回血药珠：0.42 / 0.56 / 0.74 米，朱红透明壳、红晶内核、铜质盘纹。不是雪球。
- 武器 5 品质：真实木棍、铜箍、缠绳和宝石；绿蓝紫金红，并增加 1–5 道纹环。
- 护符 5 品质：玉牌、铜边、宝石、实体符印和流苏；同五色、1–5 道符印。
- 灵伴：完整三维灵鲤（有眼、须、鳍、尾和铜饰），尾鳍与双侧胸鳍为独立带厚度网格和真实枢轴，由运行时曲线驱动游动；头朝 +Z，整体不自转，跟随朝向由战斗根节点控制。采用刚性部件动画，不冒称骨骼蒙皮动画。
- 蛤蟆妖兵：从 MountainRaider 另存 FrogSoldier，保持完整原骨架/动画/武器握点；去额角、缩耳、苔绿皮肤，眼口网格保留。

运行时 `SFLootVisuals.CreateHealth / CreateEquipment / CreateCompanion` 返回独立 GameObject 根；战斗逻辑可移动或销毁根，悬浮只作用其视觉子节点。没有创建可见 primitive 的运行时回退；缺失素材会明确报错。

`SFAudio.Play(SFCue, Vector3, intensity)` 使用最多 16 个 voice，逐类限频，独立音高/音量微变，稀有/升级/大招不会被密集普攻耗尽全部声道。逐声道处理：普通暂停或非选卡 TimeScale=0 会冻结全部正在播放声音；选卡暂停冻结正在播放的战斗声音，仅允许 UIConfirm/Upgrade 交互音；恢复后继续之前的声音。`StopAll()` 可在重开/清场调用，停止上一局短声并清节流状态。

## 来源与范围

网格由 `art/film01/loot/build_loot.py` 在 Blender 离线制作并导出，所有子网格有 UV；完整可编辑 blend、CPU 实际渲染、哈希/三角数见同目录。不是电影原版道具或人物提取。

UIConfirm、HealthPickup、LootCommon、LootRare、Upgrade、UltimateWindup 为自制噪声包络、非整数谐振、短打击及空间尾音分层；没有使用电影原声台词、演员声音或声纹模仿。Swing0/1、Hit、Hurt、EnemyDeath 以及 UltimateBurst 的一层使用已有官方 Unity Boss Room 样本，详细原路径列于 `audio-manifest.json`。衍生音效沿用该来源的 Unity Companion License 范围，不宣称可脱离 Unity 使用。已有官方持械、命中素材的声源未覆盖。

Boss Room: Small Scale Co-op Sample © 2021 Unity Technologies.
Licensed under the Unity Companion License for Unity-dependent projects:
https://unity3d.com/legal/licenses/unity_companion_license
The original project notice is retained at `unity-remake/ReferenceProject/LICENSE.md`.

## 本次实际验证

14 个 FBX 输出、12 个 44.1kHz 双声道 WAV 的格式/哈希检查通过；Blender 最终执行 exit 0、0 errors、0 warnings。已目视药珠、金色兵器、紫色护符、完整灵鲤 CPU 渲染。首次单网格 join 的无害 Blender warning 日志已保留，作者脚本修正后重导。

本代理未启动 Unity、未操作用户运行中的 Native 游戏。Unity 实际导入、透明材质、正常镜头大小、采集/伴随动作、混音听感与暂停/重开复验待主控执行；不能将离线检查称为实机验收通过。
