# 小人物逆袭 0.19 · 角色与声音制作记录

2026-10-17。这里记录已经落盘的制作脚本/音频，不替代 Unity 导入与实图验收。Editor 统一由主控执行。

## 重建与接口

- `StarFan.EditorTools.SF019ArtBuilder.Run()` 写入 `Assets/StarFan/Art/Fan019`，独立 `Resources/StarFan019Assets`；不会覆盖已发布 0.18 的 bank、FBX、服饰或场景。
- 四个基础方向：成熟男性/成熟女性/年轻男性/年轻女性，每个两脸型×两发型，共16个完整 Generic rig prefab。成年表现通过缩小头部占比、实际面部顶点重塑、眼部尺寸修整与女性躯干网格/衣体调整制作；最终是否足够成熟必须看正常镜头，不以命名代替。
- `SF019CharacterSelection` 的 CurrentFan/Face/Hair/SkinTone/HairColor/Accent 供 UI 选择；PreviewPrefab、ApplyToVisual、PreparePreview 与 Actor.Initialize 使用同一数据。配色通过 MaterialPropertyBlock，不写回共享材质。
- 原完整肩袖/手掌与挂骨保留。Actor.SetHeldWeapon 可重复替换；三个 primaryWeapons 分别为原木棍、雕刻月轮法杖、折扇铃器，upgradedWeapon 保留已认可如意棍。不是同一武器换色。
- 原始 `mage attack1` 与 `mage buff` 骨骼动画曲线映射到实际 Player Animator 子树，清除事件，键为 `player cast` / `player summon`。Builder 检查每个 Bone 路径存在，实际动作/释放时刻还需 Editor 播放审查。
- 后四片16个敌方头部使用三类下颌/脸宽/鼻面体积变化，眼部缩小，保留各片帽饰/身形/武器；仍需灰阶/默认镜头敌我辨识。
- bossRelics 为木宝盒、铜印、陶制灶器、足球铜环签、镂空金扣。法弹为实际玉叶网格。所有新物件为保存的 Mesh 资源或既有合法模型适配，没有 runtime primitive 人物/纸片人。

## 声音资产

- 实际28个文件：5首音乐、5条稀疏拟音环境编排、14个挥击/命中/UI/施法/召唤/警示/脚步短cue、4个角色索引的人声文件。
- 人声是 Kenney 授权包中 Jeffrey M. Smith / Giselle 的英文 `ready`，两个原声线分别复用于成熟/年轻外观。**不是4个独立中文声线，不是电影演员原声。** 中文剧情录音尚未交付；不得将这项描述成已完成。
- 音乐：Kevin MacLeod 的 Asian Drums / The Show Must Be Go / Monkeys Spinning Monkeys / Movement Proposition / Covert Affair，作者网站 CC BY4.0，重新均衡响度并转为44.1kHz双声道 Ogg；运行时按片跨淡化。这些是独立授权器乐，不是五部电影配乐。
- 拟音/UI：Kenney RPG Audio / Impact Sounds / UI Audio，CC0；真实录音剪辑、分层，非简单振荡器提示音。Mage/召唤/危险/挥棍部分保留 Unity Boss Room 样本（Unity Companion License），继续受该许可约束。
- `SFAudio.MusicVolume/SfxVolume/VoiceVolume` 持久化0–1音量；`TestCue(SFAudioBus)` 是明确设置试听，可在暂停时播放；正常战斗音暂停。`SetFilm` 返回成功才停旧音乐，防双播；`StopAll` 清除所有在播短音/音乐；缺cue每key只诊断一次。
- 五曲总815.1秒，压缩10,567,435B；全28文件12,479,259B。若全部解码为float32约274.2MiB（只是理论PCM量，不是浏览器实测）。Music设置 Streaming，但Web平台行为须实际评估。

## 来源/许可/校验

- `licenses/kenney-downloads.json`：作者下载URL、日期、ZIP SHA256。
- `licenses/incompetech-index.html` 与 `incompetech-pieces.json`：作者站曲目/实际文件名/统一署名许可呈现原文。
- `licenses/music-manifest.json`：每首官方URL、原始与转码文件SHA、修改说明。
- `audio-manifest.json`：每个短音/环境层的原样本路径与修改、最终SHA。
- `audio-file-validation.json`：28文件均可解码，44.1kHz、双声道；文件数据检查不代表人耳听感通过。
- `music-memory-estimate.json`：准确时长及压缩/PCM估算。
- 游戏内 `Resources/StarFanAudio019Credits.txt` 与 `Fan019/Licenses` 必须随成品/源码提供署名。现有 Unity 样例授权告知继续保留。
- 音乐原MP3及Kenney原ZIP保留 `licensed-source`；不用来声称拥有电影改编/演员肖像/原声授权。

工具执行范围：本代理仅本地文件/音频构建，未启动、刷新或控制 Unity。Prefab/Mesh 最终需主控实际运行Builder产生 `.meta` 和资源，随后查看动作/握持/近景；未验内容不会标为制作验收通过。
