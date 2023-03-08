import { Directive, Plugin } from 'vue'
type DefaultImport = { default: { value: Directive } }

const modules = import.meta.glob<DefaultImport>('./**/*.ts')

const plugin: Plugin = {
  install(vue) {
    for (const path in modules) {
      modules[path]().then((mod) => {
        const name = path.split('/')[1]
        vue.directive(name, mod.default as Directive)
      })
    }
  },
}

export default plugin
