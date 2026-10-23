# 第一幕人物素材来源

2026-10-21。本文件覆盖本轮新增的三套 Quaternius 免费 Standard 素材；不把模型、纹理或动作称为本项目原创建模，也不代表美术或动画验收完成。

| 作者与素材 | 官方来源 | 本轮选用 | 实际许可原文 |
| --- | --- | --- | --- |
| Quaternius · Universal Base Characters · Standard | [官方 Itch 页面](https://quaternius.itch.io/universal-base-characters) | 男、女基础模型，眼睛、眉毛、头发及对应纹理 | `Assets/StarFan/Art/FirstActHumanoid/Source/Base/License_Standard.txt` |
| Quaternius · Modular Character Outfits – Fantasy · Standard | [官方 Itch 页面](https://quaternius.itch.io/modular-character-outfits-fantasy) | 男、女 Peasant 布衣模型及布衣、皮肤纹理 | `Assets/StarFan/Art/FirstActHumanoid/Source/Outfits/License_Standard.txt` |
| Quaternius · Universal Animation Library · Standard | [官方 Itch 页面](https://quaternius.itch.io/universal-animation-library) | `Unity/UAL1_Standard.fbx`，未选用带 `_RM` 的根运动版本 | `Assets/StarFan/Art/FirstActHumanoid/Source/Animations/License.txt` |

三份随包许可均写明 **CC0 1.0 Universal（Public Domain Dedication）**，并署名 “Models by @Quaternius”。许可正文链接：[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)。本项目保留原许可与作者来源。

Base 与 Outfits 的许可同时明确：免费 Standard 只包含部分模型；完整模型、更多衣装或源文件属于其他版本。本轮没有购买或宣称取得完整 Source 版，也不能将官网完整包的数量当作当前可用数量。Outfits 的说明要求搭配衣装时去掉被遮挡的身体，以避免穿模。

原始 ZIP 保留在本目录的 `source/`：

- `UniversalBaseCharacters-Standard.zip`
- `ModularOutfitsFantasy-Standard.zip`
- `UniversalAnimationLibrary-Standard.zip`

实际选取文件、ZIP 内路径、字节数和 SHA-256 见 [selected-source-manifest.json](source/selected-source-manifest.json)。Unity 内的来源与许可路径均相对项目 `unity-remake/StarFanURP/`。原始 ZIP 与清单用于核查素材来源，不是模型导入、材质或动作已通过验收的证明。

旧 Boss Room 派生方案及其衣料试作已退出当前人物路线；其原有 Unity Companion License 与第三方声明仍适用于对应旧素材，见项目 `Assets/StarFan/Art/Licenses/`。本次新素材的 CC0 不替代项目其他素材各自的许可。

`character/` 内的 AI 方向图和旧 UV 衣料仅作过程参考，生成记录见 `character/provenance.json` 与 `character/PROMPTS.md`，不作为 Quaternius 源模型的一部分。周星驰相关作品的名称、角色、故事和影视音频不由上述 CC0 素材许可覆盖。
