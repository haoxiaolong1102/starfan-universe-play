# 第一关环境：资产来源与许可附录

核查日期：2026-10-21。范围为 `FirstActWorldReview.unity` 的环境与地面；依据当前 `SFFirstActWorldBuilder.cs`、实际原包、包内许可、`build-readback.json` 和源文件清单。人物、手持武器、字体及战斗素材沿用各自来源记录，不在本附录重新授予许可。

| 实际选用 | 来源与落盘位置 | 许可、改动与边界 |
|---|---|---|
| 土屋抹灰墙、门、闭合木窗、浅瓦顶、木梁、木栅栏 | Quaternius **Medieval Village MegaKit Standard**；[作者下载页](https://quaternius.itch.io/medieval-village-megakit)。原包 `art/first-act/environment/source/MedievalVillage-Standard.zip`；导入 `Assets/StarFan/Art/FirstActWorld/Source/Village/` | 包内 `License_Standard.txt` 明确 CC0 1.0。实际原 ZIP 为 161,003,471 字节、**176 个 FBX**；官网 300 多件指全系列，不能称免费获得 300 件或付费 Source 的 URP 项目。项目只抽取 21 个 FBX，当前布局实际放置其中 10 种，重新组合、缩放、着色并建立 URP 材质。 |
| 旧木摊棚、桌、凳、桶、木箱、绳、陶罐、暗红布旗、金属火把实体 | Quaternius **Fantasy Props MegaKit Standard**；[作者下载页](https://quaternius.itch.io/fantasy-props-megakit)。既有源 `art/props026/quaternius-fantasy-standard/source/`；本关副本 `Assets/StarFan/Art/FirstActWorld/Source/Props/` | 包内 `License_Standard.txt` 明确 CC0 1.0。导入并使用 12 种 FBX（包括 `Banner_2_Cloth` 和替换后的 `Torch_Metal`）；不是整个宣传版资产全集。保留原网格、UV、2048 px BaseColor / Normal / ORM；项目重建材质并调整布旗与环境色调。`Torch_Metal.fbx` 原文件与引擎副本均 48,700 字节，SHA-256 均为 `3e4e58e9d6abc66079d1bcbc8cc993b0f3df3eb36d57794179602d3871ffce62`。 |
| 灰褐压实沙土地面 BaseColor | 本项目使用内置 **image_gen** 生成，未提供外部参考图。原图 `art/first-act/environment/textures/CompactedEarth_BaseColor.png`；引擎副本 `Assets/StarFan/Art/FirstActWorld/Source/Authored/CompactedEarth_BaseColor.png` | **AI 生成，不是下载的 CC0 纹理。实际 1254 × 1254 px**，未放大冒充 2048。只生成 BaseColor，不是测量得到的完整 PBR 材质；未配造法线或高度图。两份 PNG SHA-256 一致：`cd091bb0e17c0b2ad9a05b070641de2c47c12e9a4fc1ed123c91415b26f700a3`。 |
| 暖赭石踩踏路径 BaseColor | 本项目使用内置 **image_gen** 独立生成，未提供外部参考图。原图 `art/first-act/environment/textures/WornOchrePath_BaseColor.png`；引擎副本 `Assets/StarFan/Art/FirstActWorld/Source/Authored/WornOchrePath_BaseColor.png` | **AI 生成，非外部 CC0；实际 1254 × 1254 px**，原 PNG 未修改或放大。作为第二个 TerrainLayer 与灰土地面混合，已经接入实际地形权重；只生成 BaseColor，没有法线或高度图。两份 PNG 均为 3,456,087 字节，SHA-256 一致：`bbf8d548c1c2dcd2ff233c156fa119e00e49eb04a637e23ff2c74346bde7bbf0`。 |
| 山石实体 | Unity **Boss Room** 原始 `DungeonPieces.FBX`；既有 `Assets/StarFan/Art/Prefabs/Rock.prefab`。岩石新包装为 `FirstActWorld/Prefabs/WeatheredSandstone.prefab`；使用既有 `Source/Textures/Environment/env_deco_*` 纹理 | **Unity Companion License，非 CC0**。保留 Unity 版权与许可通知；该许可的使用条件关联有效 Unity 引擎许可，不应将这些资产另称无条件公共领域资源。项目为岩石新建砂岩色材质；原始模型不因此变成本项目独立原创。本关现用火把已替换成上表 Quaternius 模型，不再引用 Boss Room 火把。 |
| 火把小火苗纹理 | Effekseer **Pierre** 示例 `01_Pierre02/Texture/Fire_Single.png`；复用既有 `Assets/StarFan/Art/Effekseer025/Sample/01_Pierre02/Texture/Fire_Single.png`，未另复制到 FirstActWorld 源目录；[官方 1.80.7 发布页](https://github.com/effekseer/Effekseer/releases/tag/1807) | `Effekseer025/License/SAMPLE_CC0.md` 声明示例内容 CC0；`ATTRIBUTION.md` 记录 Pierre 贡献者。仅复用这张原纹理，由项目创建小型 Unity ParticleSystem 和材质，**不是完整原版 FireBall 效果**。原始示例与既有 Unity 纹理逐字节一致，26,694 字节，SHA-256 `18240f4ab6e124c7763a4b3fae59c010ad09c3c1964088a014b8cb9532db0fa7`。示例素材 CC0 与 Effekseer runtime 的 MIT 许可分别记录。 |
| 桌上旧宝盒 | 既有 `Assets/StarFan/Art/Props026/Prefabs/WorldMoonBox.prefab`；真实源 `art/props026/authored/MoonBox.blend` / `.fbx`，`tools/props026/create_models.py`；材质用 Props026 共享贴图 | 来源清单记为**项目离线 Blender 建模与 UV、AI 绘制底色图**，不是 Quaternius 下载模型，也没有外部 CC0 授权声明。模型记录为 12 个网格、5408 三角面。仅作电影联想道具；本记录不证明取得《大话西游》或周星驰相关影视 IP 的授权。 |

当前布局放置的 Village 类型：`Wall_Plaster_Door_Flat`、`Wall_Plaster_Window_Wide_Flat`、`Wall_Plaster_Straight`、`Door_2_Flat`、`WindowShutters_Wide_Flat_Closed`、`Floor_WoodDark`、`Roof_RoundTiles_4x4`、`Roof_Log`、`Roof_FrontSupports`、`Prop_WoodenFence_Single`。

当前布局放置的 Fantasy Props 类型：`Banner_1_Cloth`、`Banner_2_Cloth`、`Table_Large`、`Stall_Empty`、`Barrel`、`Crate_Wooden`、`Bucket_Wooden_1`、`Rope_1`、`Bench`、`Vase_2`、`Vase_4`、`Torch_Metal`。额外导入的模型不等于全部实际摆放。

原始通知与复核凭据：

- Village / Props：引擎源目录各自的 `License_Standard.txt`；下载与抽取清单 `art/first-act/environment/source/MedievalVillage-Standard.index.json`、`selected-source-manifest.json`。Village 原 ZIP SHA-256：`e60dea67c10f30dccccfbff92a7933f5ea5cfe99be0e2a0fa5118cceabeec5c4`。
- Boss Room：`Assets/StarFan/Art/Licenses/Unity-Boss-Room-LICENSE.md`、`Unity-Companion-License.txt`；[Unity 官方许可页](https://unity.com/legal/licenses/unity-companion-license)。需随包含这些素材的项目保留相应版权、许可及适用第三方通知。
- AI 地面与路径：`art/first-act/environment/textures/CompactedEarth_PROMPT.md`、`CompactedEarth_provenance.json`、`WornOchrePath_PROMPT.md`、`WornOchrePath_provenance.json`。其中 `unity_imported: false` 记录的是**各图生成交付当时**的状态；当前两份引擎副本都已由环境 builder 使用，原图与历史记录未改写。`selected-source-manifest.json` 已分别记录原图和 Assets 副本 SHA-256、实际尺寸及相等结果；更新后 FirstActWorld 源文件共 83 项、140,007,642 字节，另以 `reusedExternalAssets` 独立记录 1 张既有火苗纹理（26,694 字节），不将它重复计入新复制的源文件。
- 火苗纹理：`Assets/StarFan/Art/Effekseer025/License/SAMPLE_CC0.md`、`ATTRIBUTION.md`、`SOURCE_MANIFEST.json`；建议继续保留 Effekseer 与 Pierre 的来源署名。环境清单只记录单张纹理复用，不据此称完整作者特效已在本关播放。
- 宝盒：`Assets/StarFan/Art/Props026/Source/manifest.json` 的 `MoonBox` 项与 `art/props026/authored/manifest.json`，不能将其中原创/AI 资产并入其它下载模型的 CC0 声明。

本关是项目重新组合的环境审样，不是电影场景扫描、影视官方资产或作者已完成的中国山寨成品包；也不据此声称战斗、伤害范围或掉落问题已解决。
