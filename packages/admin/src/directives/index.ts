import type { Directive, Plugin } from 'vue'

interface DefaultImport {
  default: { value: Directive }
}

const modules = import.meta.glob<DefaultImport>('./**/*.ts')

const plugin: Plugin = {
  install(vue) {
    for (const path in modules) {
      modules[path]()
        .then((mod) => {
          const name = path.split('/')[1]
          vue.directive(name, mod.default as Directive)
        })
        .catch(console.error)
    }
  },
}

export default plugin
