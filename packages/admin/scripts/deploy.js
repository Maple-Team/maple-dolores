const { version } = require('../package.json')
const { getPort } = require('../../../build/util')
const { exec, execSync } = require('child_process')
const name = 'liutsing/admin'
const containName = 'liutsing-admin'

const port = 100 + getPort(`@${name}`)

const dockerProcss = exec(`docker build ../../ -t ${name}:latest -t ${name}:${version}`)

dockerProcss.stdout.on('data', (data) => {
  console.log(data)
})
dockerProcss.stderr.on('data', (data) => {
  console.error(data)
})

dockerProcss.stdout.on('end', () => {
  try {
    execSync(
      `docker ps -q --filter "name=${containName}" | grep -q . && docker stop ${containName} && docker rm -fv ${containName}`
    )
  } catch (error) {
    // 无docker运行会报错
  }
  exec(
    `docker run -itd -p ${port}:80 --name ${containName} --link maple-mysql --link maple-mongodb --net maple-network ${name}:latest`,
    (e, stdout, stderr) => {
      if (e) {
        throw e
      } else {
        if (stderr) {
          console.error(stderr)
        } else {
          console.log('docker run success!')
        }
      }
    }
  )
})
