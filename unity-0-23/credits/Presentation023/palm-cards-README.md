# 0.23 原创佛掌大招卡图

本批仅生成5张384×384方图，主物件均为项目原创闭合、带厚度的OriginalBuddhaPalm；五章副物件依次为MoonCasket、Zither、Ladle、Football、GoldPistol。它们在独立PreviewRenderUtility预览场景中离线拍摄，没有影片剧照、海报、演员肖像、标题或品质框。主副物件合并真实网格bounds后，按8角点拟合并留四边至少12%安全区。

临时工作室材质保留源颜色、纹理和材质参数；所有临时相机、灯、克隆网格物件与材质结束后清理，不修改源prefab/mesh/material。五张先完成暂存后才替换023输出；PNG显式处理线性/sRGB读取，NPOTNone确保导入后仍384方。生成与导入状态、真实PNG字节/SHA和实际源依赖路径/SHA记录于palm-cards-manifest.json；这不是实战、美术满意度或性能通过报告。

本工具不重拍、不修改Presentation021的120张图片或art/campaign021/manifest.json；独立记录其前后SHA相同。运行时SF021CardArt只对form1优先加载StarFan023Cards/FilmN_Ultimate1，缺失回退旧021，其余普通卡和另5式不变。既有道具来源与许可沿用Fan019、Campaign018、Campaign020和Source记录；本批说明不创建电影IP授权。

生成入口：Assets/StarFan/Editor/SF023CardArtBuilder.cs → StarFan.EditorTools.SF023CardArtBuilder.Run()。需在Play停止后由操作者显式调用。
