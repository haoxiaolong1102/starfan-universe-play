# Effekseer complete authored effects

Runtime: Effekseer Project, MIT; official1.80.7. Samples: Effekseer contributors Pierre and NextSoft, CC0 per official Sample/readme. Optional modern sample author: Tktk. Original notices retained.

Official release: https://github.com/effekseer/Effekseer/releases/tag/1807

Project modifications: byte-preserving selected sample import; official importer generates Unity effect/model/material assets; project ScriptableObject bank; explicit URP feature and Editor/Player renderer configuration; approved unused UnityEditor namespace guard/removal and exact isWebGL Editor/Player preprocessor guard, individually recorded in SOURCE_MANIFEST. No other third-party gameplay source modification.

These are source/reference/configuration checks, not visual or platform acceptance.

## Anchored FireBall derived variant

Pierre's complete original50-node CC0 FireBall is preserved in place. The bank uses a separately named FireBallAnchored project, changing only the root position selector to Fixed and explicitly zeroing rootXYZ (the original inactive Fixed.Z was15). All child nodes, inactive original position curve, references, authored timing, textures and models remain. Exact source/derived SHA and change list: DERIVED_FIREBALL_ANCHORED.json; actual read-back: SOURCE_MANIFEST.json. This is a project calibration, not the unmodified author presentation.
