let cache: { [key: string]: unknown } = {}

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach((key: string) => {
    cache = { ...cache, ...r(key) }
  })
}
importAll(require.context('.', true, /\.json$/))

const resources = {
  translation: cache,
} as const

export default resources
