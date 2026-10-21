# 0.26 Web rendering compatibility changes

The complete Unity Core RP and URP 17.3 packages are embedded with their original Unity Companion License and notices. The PackageCache originals were not modified. The actual version-controlled patch and source hashes are retained with the local project.

CoreCopy creation and serialization now follow the existing framebuffer-fetch platform capability; a direct supported non-MSAA CopyPass uses the existing real texture-sampling Blit path on WebGLES. Unused Stencil LOD shader resources are separate and lazy; BlueNoise use does not force-load the unsupported stencil resource. Debug shader resources are omitted only when the build actually strips debug functionality. Shaders are not replaced with blank programs and console messages are not filtered.

Actual Editor Metal validation compared a known 32x32 four-color source and the actual AddBlitPass/AddCopyPass GPU outputs: all 1024 pixels in each output matched exactly. This is desktop evidence, not certification of the WebGLES CopyPass fallback. Final browser validation is recorded separately in the release test report.

The obsolete ScriptableRendererData.DebugShaderResources.hdrDebugViewPS field is no longer serialized. Current HDR debugging still uses the modern graphics settings resource. Actual Unity reserialization confirmed that both Mobile and PC renderer assets no longer have this old serialized property or an HDRDebugView shader dependency. This additional fix was necessary after the first real WebGL cold start showed the residual legacy reference.
