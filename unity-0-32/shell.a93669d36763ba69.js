"use strict";
const build = JSON.parse(document.getElementById("build-config").textContent);
const canvas = document.getElementById("unity-canvas");
// UUM-93245: Chromium can advertise EXT_render_snorm while rejecting the six
// SNORM multisample capability queries made by Unity at engine startup.
// Disable this optional render-target capability for THIS game canvas only.
// No error draining, fabricated query results, or console filtering.
// The shipped effects render into the normal URP color target, not SNORM RTs.
(() => {
  const gameCanvas = canvas;
  const originalGetContext = gameCanvas.getContext;
  const configured = new WeakSet();
  gameCanvas.getContext = function (type, ...args) {
    const gl = Reflect.apply(originalGetContext, this, [type, ...args]);
    if (this !== gameCanvas || type !== "webgl2" || !gl || configured.has(gl)) return gl;
    configured.add(gl);
    const supported = gl.getSupportedExtensions;
    const extension = gl.getExtension;
    gl.getSupportedExtensions = function (...queryArgs) {
      const result = Reflect.apply(supported, this, queryArgs);
      return this === gl && result ? result.filter(name => name !== "EXT_render_snorm") : result;
    };
    gl.getExtension = function (name) {
      if (this === gl && name === "EXT_render_snorm") return null;
      return Reflect.apply(extension, this, [name]);
    };
    console.info("[StarFan WebGL] Optional SNORM render targets disabled (UUM-93245).");
    return gl;
  };
})();

const stage = document.getElementById("stage");
const loading = document.getElementById("loading");
const progress = document.getElementById("progress");
const statusText = document.getElementById("status");
const percent = document.getElementById("percent");
const banner = document.getElementById("banner");
let instance = null;
let failed = false;
let lastProgress = 0;
// Opt-in, read-only Unity frame evidence through an ordinary browser UI action.
const qaSnapshot = document.getElementById("qa-snapshot");
const qaParts = location.search.slice(1).split("&");
const qaRequested = qaParts.filter(part => part === "qa=1").length === 1 &&
  !qaParts.some(part => part === "qa" || part.startsWith("qa=") && part !== "qa=1");
qaSnapshot.hidden = !qaRequested;
qaSnapshot.addEventListener("mousedown", event => event.preventDefault());
qaSnapshot.addEventListener("click", () => {
  if (qaRequested && instance && !failed) {
    instance.SendMessage("SF032QAObserver", "Snapshot", "");
    canvas.focus();
  }
});

// Reuse the native-input bridge used by the previous shipped wrapper. Unity
// supplies the actual active uGUI rectangle; DOM owns IME/clipboard composition.
const webName = document.createElement("input");
webName.id = "web-name";
webName.type = "text";
webName.maxLength = 16; // matches032 Hub.NameInput.characterLimit
webName.autocomplete = "off";
webName.spellcheck = false;
webName.setAttribute("aria-label", "你的名字");
webName.hidden = true;
stage.appendChild(webName);
let nameRect = null;
let nameComposing = false;
function nameMessage(method, value) {
  if (instance) instance.SendMessage("StarFanWebNameInput", method, value);
}
function syncName() {
  if (nameRect && nameRect.visible && !nameComposing) nameMessage("SetName", webName.value);
}
function fitNameInput() {
  const show = Boolean(nameRect && nameRect.visible && instance && !failed && loading.hidden);
  if (!show) {
    if (document.activeElement === webName) webName.blur();
    webName.hidden = true;
    return;
  }
  const c = canvas.getBoundingClientRect(), s = stage.getBoundingClientRect(), r = nameRect;
  webName.style.left = (c.left - s.left + r.x * c.width) + "px";
  webName.style.top = (c.top - s.top + r.y * c.height) + "px";
  webName.style.width = r.w * c.width + "px";
  webName.style.height = r.h * c.height + "px";
  webName.style.fontSize = Math.max(10, r.fontRatio * c.height) + "px";
  webName.style.padding = "0 " + (r.w * c.width * 13 / 366) + "px";
  if (!nameComposing && document.activeElement !== webName && webName.value !== r.text) webName.value = r.text;
  webName.hidden = false;
}
window.StarFanWebNameRect = (visible, x, y, w, h, text, fontRatio) => {
  const numbers = [x, y, w, h, fontRatio];
  const valid = numbers.every(Number.isFinite) && w > 0 && h > 0 && fontRatio > 0;
  nameRect = {visible: Boolean(visible) && valid, x, y, w, h, text: String(text || ""), fontRatio};
  fitNameInput();
};
webName.addEventListener("focus", () => nameMessage("SetFocus", 1));
webName.addEventListener("blur", () => { syncName(); nameMessage("SetFocus", 0); });
webName.addEventListener("compositionstart", () => { nameComposing = true; });
webName.addEventListener("compositionend", () => { nameComposing = false; syncName(); });
webName.addEventListener("input", event => { if (!event.isComposing) syncName(); });
webName.addEventListener("change", syncName);
webName.addEventListener("keydown", event => event.stopPropagation());
window.addEventListener("blur", () => { if (document.activeElement === webName) webName.blur(); });
window.addEventListener("pagehide", () => {
  syncName();
  if (document.activeElement === webName) webName.blur();
  nameMessage("SetFocus", 0);
  nameRect = null;
  nameComposing = false;
  webName.hidden = true;
});
if (build.poster) document.getElementById("poster").style.backgroundImage = `url("${build.poster}")`;
document.getElementById("credits-link").hidden = !build.credits;
document.getElementById("download-note").textContent = `启动与大厅资源约 ${build.initialMiB.toFixed(1)} MiB；篇章按需载入。百分比为 Unity 回报的引擎进度。`;
function fit() {
  const width = Math.min(stage.clientWidth, stage.clientHeight * 16 / 9);
  canvas.style.width = width + "px";
  canvas.style.height = width * 9 / 16 + "px";
  fitNameInput();
}
new ResizeObserver(fit).observe(stage);
window.addEventListener("resize", fit);
fit();
function fail(error) {
  if (failed) return;
  failed = true;
  qaSnapshot.disabled = true;
  loading.hidden = false;
  loading.classList.remove("leaving");
  fitNameInput();
  document.querySelector(".loading-state").hidden = true;
  document.getElementById("failure").hidden = false;
  const message = error && error.message ? error.message : String(error);
  document.getElementById("error-detail").textContent = message;
  if (location.protocol === "file:") document.getElementById("friendly-error").textContent = "请通过 HTTP 或 HTTPS 地址打开游戏，直接打开本地文件无法加载篇章。";
  else if (!navigator.onLine) document.getElementById("friendly-error").textContent = "网络连接已断开。连接恢复后，可以重新载入；已保存的局外进度仍留在当前浏览器，未结束的本局不会续接。";
  else document.getElementById("friendly-error").textContent = "游戏资源暂时没有载入成功，请检查网络后重试。已保存的局外进度仍留在当前浏览器，未结束的本局不会续接。";
}
document.getElementById("retry").addEventListener("click", () => {
  const url = new URL(location.href);
  url.searchParams.set("sf032reload", Date.now().toString());
  location.replace(url.href);
});
document.getElementById("fullscreen").addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (stage.requestFullscreen) await stage.requestFullscreen();
    else throw new Error("当前浏览器不支持全屏，可使用浏览器窗口最大化。");
    canvas.focus();
  } catch (error) {
    banner.textContent = error.message || String(error); banner.hidden = false;
  }
});
document.addEventListener("fullscreenchange", () => {
  document.getElementById("fullscreen").textContent = document.fullscreenElement ? "退出全屏" : "全屏";
  fit();
});
canvas.addEventListener("pointerdown", () => canvas.focus());
async function start() {
  if (!/^https?:$/.test(location.protocol)) throw new Error("HTTP(S) required");
  if (typeof WebAssembly !== "object") throw new Error("当前浏览器不支持 WebAssembly，请使用较新的电脑浏览器。");
  const script = document.createElement("script");
  script.src = build.loaderUrl;
  await new Promise((resolve, reject) => { script.onload = resolve; script.onerror = () => reject(new Error("Unity 加载器请求失败：" + build.loaderUrl)); document.body.appendChild(script); });
  const config = {
    dataUrl: build.dataUrl, frameworkUrl: build.frameworkUrl, codeUrl: build.codeUrl,
    companyName: build.companyName, productName: build.productName, productVersion: build.productVersion,
    streamingAssetsUrl: build.streamingAssetsUrl, matchWebGLToCanvasSize: true,
    cacheControl: url => /\.[0-9a-f]{16}\./.test(url) ? "immutable" : "no-store",
    showBanner: (message, kind) => {
      if (kind === "error") fail(new Error(message));
      else { banner.textContent = message; banner.hidden = false; }
    }
  };
  statusText.textContent = "正在下载并初始化游戏引擎…";
  instance = await createUnityInstance(canvas, config, value => {
    if (failed || !Number.isFinite(value)) return;
    // Only actual Unity callbacks advance this bar. Never timer-based progress.
    lastProgress = Math.max(lastProgress, Math.max(0, Math.min(1, value)));
    progress.value = lastProgress;
    percent.textContent = Math.floor(lastProgress * 100) + "%";
    statusText.textContent = lastProgress >= .9 ? "正在初始化游戏引擎…" : "正在下载游戏引擎…";
  });
  if (failed) return;
  if (qaRequested) qaSnapshot.disabled = false;
  statusText.textContent = "引擎已就绪，正在打开大厅…";
  // createUnityInstance resolution confirms only engine startup. Module loading
  // and its real retries remain visible inside SF032Bootstrap/ContentLoader.
  loading.classList.add("leaving");
  loading.addEventListener("transitionend", () => { if (!failed) { loading.hidden = true; fitNameInput(); } }, {once: true});
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) loading.hidden = true;
  fitNameInput();
  canvas.focus();
}
start().catch(fail);
