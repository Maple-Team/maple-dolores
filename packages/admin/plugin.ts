import * as ChildProcess from 'node:child_process'
import { writeFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import dayjs from 'dayjs'
import { version } from '../../package.json'

// TODO 适配CICD环境
const hash = ChildProcess.execSync('git rev-parse HEAD').toString().trim().substring(0, 8)
const currentGitBranch = ChildProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
writeFileSync('./public/version.json', JSON.stringify({ hash, branch: currentGitBranch }))

function consoleFn(opts: { key: string; value: string; valueBgColor: string; keyBgColor: string; textColor: string }) {
  const key = opts.key
  const value = opts.value
  const valueColor = opts.valueBgColor || '#41b883'
  const keyColor = opts.keyBgColor || '#35495e'
  const textColor = opts.textColor || '#ffffff'
  const contents = [
    '%c '.concat(key, ' %c ').concat(value, ' '),
    `padding: 1px; border-radius: 3px 0 0 3px; color: ${textColor}; background: `.concat(keyColor, ';'),
    `padding: 1px; border-radius: 0 3px 3px 0; color: ${textColor}; background: `.concat(valueColor, ';'),
  ]
  console.log.apply(null, contents)
}

export const HtmlPluginInjectScript = () => {
  const config: Plugin = {
    name: 'vite-plugin-inject-script',
    transformIndexHtml: (html: string) => {
      return {
        html,
        tags: [
          {
            tag: 'script',
            injectTo: 'body',
            children: `;(function() {
                window.appHash = '${hash}';
                window.appBranch = '${currentGitBranch}';
                ${consoleFn.toString()}
                consoleFn({
                    key: 'Build Date',
                    value: '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'
                })
                consoleFn({
                    key: 'Build Version',
                    value: '${version}'
                })
                consoleFn({
                    key: 'Build Commit',
                    value: '${hash}'
                })
                consoleFn({
                    key: 'Build Branch',
                    value: '${currentGitBranch}'
                })
                })()`,
          },
        ],
      }
    },
  }
  return config
}
