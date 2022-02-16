"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CSSManifestPlugin = exports.CSS_EXTENSIONS_REGEX = exports.KNOWN_CSS_EXTENSIONS = void 0;
// Internal: Extensions of CSS files or known precompilers.
exports.KNOWN_CSS_EXTENSIONS = [
    'css',
    'less',
    'sass',
    'scss',
    'styl',
    'stylus',
    'pcss',
    'postcss',
];
exports.CSS_EXTENSIONS_REGEX = new RegExp("\\.(".concat(exports.KNOWN_CSS_EXTENSIONS.join('|'), ")$"));
// Internal: Writes a manifest file that allows to map an entrypoint asset file
// name to the corresponding output file name.
function CSSManifestPlugin() {
    var config;
    // Internal: For stylesheets Vite does not output the result to the manifest,
    // so we extract the file name of the processed asset from the Rollup bundle.
    function extractChunkStylesheets(bundle, manifest) {
        Object.values(bundle).filter(function (chunk) { return chunk.type === 'asset' && chunk.name; })
            .forEach(function (chunk) {
            if (exports.CSS_EXTENSIONS_REGEX.test(chunk.name)) {
                manifest.set(chunk.name, { file: chunk.fileName });
            }
        });
    }
    return {
        name: 'vite-manifest-css',
        apply: 'build',
        enforce: 'post',
        configResolved: function (resolvedConfig) {
            config = resolvedConfig;
        },
        generateBundle: function (_options, bundle) {
            return __awaiter(this, void 0, void 0, function () {
                var manifest;
                return __generator(this, function (_a) {
                    manifest = new Map();
                    extractChunkStylesheets(bundle, manifest);
                    this.emitFile({
                        fileName: 'manifest-css.json',
                        type: 'asset',
                        source: JSON.stringify(Object.fromEntries(manifest), null, 2)
                    });
                    return [2 /*return*/];
                });
            });
        }
    };
}
exports.CSSManifestPlugin = CSSManifestPlugin;
