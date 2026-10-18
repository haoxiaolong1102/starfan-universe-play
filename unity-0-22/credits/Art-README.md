# Offline reference visuals

These are Unity Boss Room reference assets, extracted through the Unity 6000.3.26f1 Editor for the StarFan playable prototype. They are not claimed as newly authored StarFan artwork. See `Licenses/` for the unchanged upstream license and third-party notices.

The export contains 23 standalone visual prefabs and 119 independent animation clips. No upstream MonoBehaviour, NetworkBehaviour, AnimatorController or AnimationEvent is retained in the exported visual objects/clips. Dependencies are confined to this `Art` directory; Unity/URP package dependencies use the installed packages.

## Runtime contract

- Character root: unit transform with an Animator and a valid Generic Avatar built from that character's actual clean hierarchy. The complete skeleton and original hand-mounted weapon/shield are under `Rig/`. Imported clip curve paths have the same `Rig/` prefix. Play the supplied clips directly through Playables; do not attach the original network animation controller or assume Humanoid retargeting.
- `Player`, `Melee`, `Ranged`, `Charger`, `Boss` correspond to Tank Boy, Imp, Vandal Imp, Rogue Boy and Boss. Their sampled idle geometry heights are approximately 1.90, 1.59, 1.64, 1.90 and 4.00 metres; the visual foot baseline is zero. The inner Rig stores uniform scale and a small baseline offset. Do not reset those inner transforms.
- Player: `idle`, `run`, `attack`, `attack2`, `fall`, `hitreact minor`. Imp/Vandal: `imp idle`, `imp run`, `imp attack1`, `imp toss attack`, `imp defeat`. Charger: `rogue idle`, `rogue run`, `rogue attack1`, `rogue skill2 dash attack start/loop/end`. Boss: `boss idle`, `boss run`, `boss attack1/2`, `boss charge attack start/loop/end`, `boss leap attack`, `boss defeat start/idle`.
- `ThrownObject` contains the actual Imp thrown-item mesh. `UpgradedWeapon` contains the Tank Girl weapon mesh. Attach the latter at the original `Tank_Weapon_Boy` parent and preserve the original object's complete local position, rotation **and scale**. Its source mesh uses centimetre-sized coordinates and is not a world-scale stand-alone prop. Verify the actual grip after replacement; do not stretch it into another weapon type.
- VFX are pure ParticleSystem/renderer hierarchies. Their original automatic cleanup scripts were removed. The caller owns play/stop/lifetime, including looping charge particles and cancellation. VFX do not perform damage or hit detection.
- `Floor1/2`: 4×4 m, centre offset (2, 0, −2); `Floor4`: 8×8 m, offset (4, 0, −4). `BossFloor`: 36×44 m, offset (18, 0, 22). Use the recorded geometry bounds when laying out a scene, not the prefab pivot as its assumed centre.

`StarFan.EditorTools.BuildAssetCatalog.Run` creates `Art/Resources/StarFanAssets.asset` after package import and checks actual Playables bone motion on five characters × idle/run/attack. `Resources.Load<SFAssets>("StarFanAssets")` is the runtime entry. The parent integration step supplies the project font. The generated audit is visual-asset/binding evidence, not a gameplay, balance or final visual-quality pass.

Export evidence: `artifacts/unity-playable-20261016/art-export.json` and `art-export-editor.log`. Earlier failed extraction attempts are retained separately; only the successful package is intended for import.
