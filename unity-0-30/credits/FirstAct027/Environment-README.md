# 第一关环境源文件

当前地形使用两张本项目通过内置 `image_gen` 生成的 BaseColor，**均为 AI 生成，不是外部 CC0 素材**。两张原 PNG 的实际尺寸都是 **1254 × 1254 px**，没有放大、改绘或配造法线/高度图。

| 资产 | 用途 | 原图与 Unity Assets 副本 SHA-256 |
|---|---|---|
| `textures/CompactedEarth_BaseColor.png` | 灰褐压实土基础层 | `cd091bb0e17c0b2ad9a05b070641de2c47c12e9a4fc1ed123c91415b26f700a3` |
| `textures/WornOchrePath_BaseColor.png` | 暖赭石踩踏路径，与基础层通过实际 Terrain alphamap 混合 | `bbf8d548c1c2dcd2ff233c156fa119e00e49eb04a637e23ff2c74346bde7bbf0` |

2026-10-21 独立复核两张源图与 `unity-remake/StarFanURP/Assets/StarFan/Art/FirstActWorld/Source/Authored/` 对应 PNG，逐字节相同。每图旁边的 `*_PROMPT.md` 和 `*_provenance.json` 保存原始生成要求与来源；历史字段 `unity_imported: false` 指当时生成任务结束时尚未导入，不代表当前环境状态。

`source/selected-source-manifest.json` 保存下载模型/纹理抽取记录和两张 AI 图的来源、去向、双份 SHA-256、尺寸及一致性结果。当前 FirstActWorld 源文件为 83 项、140,007,642 字节；既有外部火苗纹理另列 `reusedExternalAssets`，不重复计为新复制的源文件。此清单混合多种来源，不能整体视为 CC0 授权声明。

Village 原包为 Quaternius 官方 **Standard 免费子集**，ZIP 实际有 176 个 FBX，本项目抽取 21 个；未取得宣传中全系列 300 多件或付费 Source 引擎项目。Fantasy Props 本关使用 12 种实际模型，按包内 Standard 的 CC0 许可记录，包括当前金属火把 `Torch_Metal.fbx`。该 FBX 与原作者本地源文件逐字节相同。

火苗单独复用 Effekseer 1.80.7 的 Pierre 示例 `Fire_Single.png`，原许可为 `Assets/StarFan/Art/Effekseer025/License/SAMPLE_CC0.md`，贡献者记录见同目录 `ATTRIBUTION.md`。仅用单张 CC0 纹理创建项目的小型 Unity ParticleSystem，不是完整 FireBall 效果；没有把 Effekseer runtime 的 MIT 许可误写为示例素材许可。

石头仍来自 Unity Boss Room，适用 Unity Companion License；原 Boss Room 火把已退出本关。宝盒为项目建模加 AI 底色，不得混记成 Quaternius CC0。

详细附录见 `artifacts/first-act-environment/asset-provenance.md`。本目录不包含对影视 IP 已获授权的认定。
