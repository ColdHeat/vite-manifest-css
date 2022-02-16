import { OutputBundle } from "rollup";
import type { Plugin, ResolvedConfig } from "vite";

export type Entrypoints = Array<[string, string]>

interface AssetsManifestChunk {
  src?: string
  file: string
}

type AssetsManifest = Map<string, AssetsManifestChunk>

// Internal: Extensions of CSS files or known precompilers.
export const KNOWN_CSS_EXTENSIONS = [
  'css',
  'less',
  'sass',
  'scss',
  'styl',
  'stylus',
  'pcss',
  'postcss',
]

export const CSS_EXTENSIONS_REGEX = new RegExp(
  `\\.(${KNOWN_CSS_EXTENSIONS.join('|')})$`,
)

// Internal: Writes a manifest file that allows to map an entrypoint asset file
// name to the corresponding output file name.
export function CSSManifestPlugin (): Plugin {
  let config: ResolvedConfig

  // Internal: For stylesheets Vite does not output the result to the manifest,
  // so we extract the file name of the processed asset from the Rollup bundle.
  function extractChunkStylesheets (bundle: OutputBundle, manifest: AssetsManifest) {
    Object.values(bundle).filter(chunk => chunk.type === 'asset' && chunk.name)
      .forEach((chunk) => {
        if (CSS_EXTENSIONS_REGEX.test(chunk.name)){
          manifest.set(chunk.name, { file: chunk.fileName })
        }
      })
  }

  return {
    name: 'vite-manifest-css',
    apply: 'build',
    enforce: 'post',
    configResolved (resolvedConfig: ResolvedConfig) {
      config = resolvedConfig
    },
    async generateBundle (_options, bundle) {
      const manifest: AssetsManifest = new Map()
      extractChunkStylesheets(bundle, manifest)

      this.emitFile({
        fileName: 'manifest-css.json',
        type: 'asset',
        source: JSON.stringify(Object.fromEntries(manifest), null, 2),
      })
    },
  }
}