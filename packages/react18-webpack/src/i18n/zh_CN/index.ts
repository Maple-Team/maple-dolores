// eslint-disable-next-line import/no-mutable-exports
let cache: { [key: string]: unknown } = {}

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach((key: string) => {
    cache = { ...cache, ...r(key) }
  })
}
importAll(require.context('.', true, /\.json$/))

export default cache
