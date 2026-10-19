# 0.23 声音重做与验收边界

本轮针对持续“唰唰”与群怪叠音重做，独占音频源码。未操作共享 Unity Editor、Play 或 Build，未编辑 `.asset`、`.prefab`、`.mixer` 或 `.meta`。旧 `SFAudio.cs` 原样备份在 `artifacts/unity-0-23/before/SFAudio.cs`。

## 改了什么

旧代码可观察到：Swing 长 .62 秒/最短触发 .15 秒；Hit 长 .55 秒/最短 .075 秒；MageCast .85 秒、Summon 1.15 秒每次攻击播；16 个 Sfx/Voice 共池满额按游标打断。上述是源码与文件指标，不能直接证明每台机器听到多少重叠。

现在以 **33 段、735,532 字节、mono/32 kHz/16-bit WAV** 的短成品音源剪辑替换动作声。素材在 `generated/`，尚须根执行 Unity importer 后才是实际导入结论。全部生成处理来自音频样本，不用振荡器、噪声合成器、电影录音或演员声音模仿。

| 声音 | 旧长度 | 0.23 长度 | 播放节奏/相对分工 |
|---|---:|---:|---|
| 普通挥动 | .62 s | .105 s | 交替省略普通请求；最短 .42 s；样本峰值 .42，运行 gain .095；只作低声手感 |
| 三连重挥 | 同一唰声 | .145 s | 独立录音组合；gain .15，不以循环拖长 |
| 轻/重命中 | .55 s | .145/.235 s | 35 ms 合并同瞬间命中；最短 .14 s；gain .34/.43；比挥空突出 |
| 法术/召唤出手 | .85/1.15 s | .16/.19 s | 法术隔次、召唤每三次一次；命中反馈仍由真实伤害发出 |
| 暴击 | 无独立事件 | .44 s | 真实 crit hook；独立重音池；.28 s 门限，120 ms 压低同击普通声 |
| 六种大招 | 同一声 | .72–.88 s | 用实际 UltimateId 分六组实音组合；旧/新重复 Burst .65 s 门限合并 |
| 死亡 | .70 s 的旧片段 | .20/.32 s | 105 ms 聚合同批；3 个以上用一次群倒声；最短 .45 s |
| 脚步 | .30 s | .095 s | 最短 .48 s、gain .075，低于攻击主体 |
| 危险前摇 | 有资源但无调用 | .30 s | 已由 VFX 代理接真实预警入口；.48 s 全局门限、保留专槽；不是新增伤害判定 |

一般小声音（挥动、命中、出手、脚步、死亡、普通拾取）在任意滑动 1 秒最多接纳 **8 次**。危险、受伤、暴击、大招、稀有掉落、UI 不耗此一般预算，但各有冷却/专槽上限。不是“所有声音每秒总计 8 次”。

12 个短声 AudioSource 固定分区：一般 Sfx 5；暴击/大招/Boss accent 2；Danger/Hurt 2；UI 1；Voice 2 个保留位置但同一时间只允许 **1 段**语音。普通声音只能抢自己分区里更低优先级声音，不会覆盖正在播放的大招/危险/语音。另有 Music A/B 与 Ambience 3 个循环 source。源数量与实际播放/并发需由运行读回核实。

Music/Sfx/Voice 独立音量，保留用户旧设置键值。新用户默认 .55/.72/.80；已有用户的旧偏好不偷偷重置。语音进入时音乐约 103 ms 线性降至 .38、结束后约 .54 s 恢复；普通 Sfx 同时减至 .78，危险槽不受该层衰减。危险提示期间音乐×.65、一般 Sfx×.45。实际混音听感与输出峰值尚未认证。

未创建 AudioMixer 资产：现项目静态检索无 `.mixer`；技能明确禁止反射建组或手写 mixer YAML。本轮用独立 source 池与各 bus 音量隔离，提供 `SetMixerGroups(sfx,voice,music)`，未来若编辑器已存在合适组可通过公开 API 路由。不能把代码 bus 说成已建好的 Mixer graph。

## 官方来源与素材变化

2026-10-18 已在线核对四个发行者官方页，均列 CC0；HTML、SHA 与原包 `License.txt` 在 `licenses/`、`official-source-verification.json`。成品源文件已在 0.19 下载，不额外下载大包。

- [Kenney Impact Sounds](https://kenney.nl/assets/impact-sounds)
- [Kenney RPG Audio](https://kenney.nl/assets/rpg-audio)
- [Kenney UI Audio](https://kenney.nl/assets/ui-audio)
- [Kenney Voiceover Pack](https://kenney.nl/assets/voiceover-pack)

相较 **旧 0.17/0.19 两份 audio manifest**，本轮使用 38 个此前未列过的原包文件名；这不是“全项目从未使用过任何同源素材”的证明。每个成品逐层源 SHA、偏移、gain、变速、处理与成品 SHA 均在 `audio-manifest.json`。片段使用裁切、低通、音量、少量变速和边沿淡化；不是重放旧长唰声后只改音量。

Boss 默认 “Final round” 来自 Kenney 男声 Jeffrey M. Smith，长度原片 1.078639 s，新 WAV 保留完整语句至 1.30 s 预算。它是通用英语播报，**不是牛魔王、周星驰或任何影视演员配音**；现有四外观仍共享合法的两位 ready 原声，不宣称四套独立中文配音。后续指定/确认可用对白只通过 `PlayDialogue(AudioClip approvedClip, float gain)` 接口接入；当前没有任何电影经典对白音频。

旧五幕背景音乐与环境声保留原许可/原文件。此次没有“修复五首音乐 FSB 尾帧警告”，也没有主观审听/端侧混音通过结论。

## 根执行与检查

1. 离线复生成：`python3 art/audio023/build_audio023.py`。只写 art。
2. 离线检查：`python3 art/audio023/check_audio023.py`。只编译/运行纯节奏策略到 artifacts，不启动 Unity。
3. 根停止 Play 后执行 `StarFan.EditorTools.SF023AudioBuilder.Run()`。public AssetDatabase/AudioImporter 同步导入 Resources/StarFanAudio023，源 WAV mono32k、default/Standalone PCM Override32000、WebGL AAC Override44100，均DecompressOnLoad/preload；创建 `.meta` 由 Editor 完成。
4. Builder 写 `artifacts/unity-0-23/audio-import-readback.json`，应 33 clips、errors 0，逐项源 hash/channels/sourceFrequency/length 与 default/Standalone/WebGL/active 四组设置实际读回；Editor active clip 频率须严格等于声明的 active 平台频率。没有此结果不能说已导入。
5. 正常 Play 中 `StarFan.EditorTools.SF023AudioBuilder.InspectRuntime()` 只读 source/listener/输出采样率及 `SFAudio.Inspect()`。应启用 listener 恰好 1，缺失资源 0；各峰值不超过5/2/2/1/1，且音乐 duck 在实际语音时下降并恢复。
6. 真帧受控验收建议见 `runtime-acceptance.md`。不要把合成请求压力测试称为自然通关或主观听感。

## 当前已验证 / 未验证

- 生产 `SF023AudioRhythm` 真正由 .NET 执行：495 检查、0 失败；60 秒饱和请求的任何滑动 1 秒一般声音最大 8。测试还明确饱和一般预算不能挡 Danger/Hurt/Critical/Ultimate、重复 Burst 不二次播放、法术/召唤稀疏、重挥不因普通隔次逻辑丢失、重开清理。
- 33 WAV 全部：mono32k16bit、有限数值、峰值<.81、DC<.002、两端归零、非静音、成品 SHA 一致；当前 0 失败。首轮 DC 检查发现 7 个淡化后残留，已在实际样本处理加入保边沿的残余 DC 去除后复测；旧首轮报告保留 `audio-offline-qa-first.json`。首轮 .NET 目标8/runtime6版本不匹配也是测试环境错误，未当游戏 bug。
- 联合 runtime41 / Editor37 源码独立 Roslyn 0 error / 0 warning；只是编译，不等于已导入或实机播放。记录在 artifacts/unity-0-23/audio-static/。
- 根实际前两轮 importer 均发现 WebGL active 下33段 Clip.frequency=44100；sourceFrequency=32000 与 mono/时长/SHA均正常。第二轮已显式设置32000但 Unity 实际 WebGL override 仍归一为 AAC/44100；前两份失败报告保留，不能把错误的全平台 PCM32k 验收合约称为声音损坏，也不能删除失败历史。
- 已查 [Unity 6.3 Web 音频官方手册](https://docs.unity3d.com/6000.3/Documentation/Manual/webgl-audio.html)：Web导入AAC，序列化音频采样率44100；浏览器解码还可能按设备AudioContext采样率重采样。因此 Builder 现在**分别严格核对**：源 mono32000+原SHA；Default与Standalone为PCM/Override32000；WebGL为AAC/Override44100；Editor当前active Clip.frequency必须等于actual active设置、并等于该平台声明频率。未知平台报错，不接受任意格式/频率。源素材bytes与时长不变，浏览器runtime频率另作真实读回，不保证任何设备都44100。新合约真实导入结果待根执行；源码联编0错0警告。
- **尚未主观听过这些剪辑在完整战斗中的混音，不声称“不刺耳”“舒服”“爽感已通过”。** 仍需真实 Editor/native/Web 输出、静音开关、暂停抽卡、voice duck、密集怪群、Boss/六大招、长时间耳机与扬声器听感验收。用户反馈优先于峰值/RMS 指标。

## 五幕声音意象与原创字幕备选

以下只是本作原创编排建议，不说成电影原台词/演员录音；字幕 helper 为 `SF023AudioText.BossEntranceSubtitle(film)`，本轮未改剧情或 UI。现有六式只按实际机制分音色，不因电影名改判定。

| 幕 | 物件/情绪映射 | 原创短字幕 |
|---|---|---|
| 大话西游 | 皮革轻动、木质棍击、较低钟尾；月夜、犹豫后向前 | 月光照着来时路，平凡的人也能向前一步。 |
| 功夫 | 近身软/重拳、短木击、街巷留白；蓄力后一次落点 | 街巷很窄，心里的那口气不能低下去。 |
| 食神 | 锅具/金属身体感可作稀有重音，平常不循环敲锅；耐心与火候 | 火候会教人耐心，认真做完这一道。 |
| 少林足球 | 软球体重击、短低木击，空间交给球路/危险提示；团队与不服输 | 有人笑你跑得慢，就把下一球踢给未来。 |
| 国产凌凌漆 | 小金属机关/皮革收束、克制的危险双点；不起眼与担当 | 看起来不起眼的人，也有必须守住的东西。 |

目前 Danger 是通用前摇提示；不能声称已经给每种反派做好独占乐器/整套 Foley。琴音、火焰、球路、枪械等后续若逐个制作声音身份，仍须保持“提示可躲”和音乐留白；不要把输出音量持续抬高当作华丽。
