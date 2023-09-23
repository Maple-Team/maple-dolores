import { readdirSync } from 'fs'
import { join } from 'path'
import { args, runCommand, step } from './utils'

const mainAppName = 'main'
const rootDir = join(__dirname, '../packages/')

function getSubApps(appsList: string[]) {
  return appsList.filter((item) => !item.includes('main'))
}

async function dev(appName: string) {
  step(`[${appName}] Starting`)
  const runArgs = ['run', 'dev']
  await runCommand('pnpm', runArgs, join(rootDir, appName))
}

async function main() {
  const apps = readdirSync(rootDir)
  const { app } = args
  if (app) {
    if (apps.includes(app)) await dev(app)
  } else {
    const subApps = getSubApps(apps)
    // .filter((app) => app === 'admin' || app === 'sub')
    subApps.forEach((item) => {
      const handler = async () => {
        await dev(item)
      }
      handler().catch(console.error)
    })
    await dev(mainAppName)
  }
}

main().catch(console.error)

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})
