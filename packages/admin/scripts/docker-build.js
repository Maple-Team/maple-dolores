const { version } = require('../package.json')
const { exec } = require('child_process')

const name = 'liutsing/admin'
const dockerProcss = exec(`docker build ../../ -t ${name}:latest -t ${name}:${version}`)

dockerProcss.stdout.on('data', (data) => {
  console.log(data)
})
dockerProcss.stderr.on('data', (data) => {
  console.error(data)
})

dockerProcss.stdout.on('end', () => {
  console.error('docker image build')
})
