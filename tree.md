我的pnpm monorepo的gitlab cicd相关信息如下：

我的项目结构如下：

```tree
project-name/
│
├──packages/
│   ├──react18-webpack/
│   │   ├──package.json
│   │   ├──pnpm-lock.yaml
│   │   ├──Dockerfile
│   │   ├──src/
│   │   ├──dist/
│   │   ├──version.txt
│   │   └──.gitlab-ci.yml
│   │
│   ├──vue3/
│   │   ├──package.json
│   │   ├──pnpm-lock.yaml   
│   │   ├──Dockerfile
│   │   ├──src/
│   │   ├──dist/
│   │   ├──version.txt
│   │   └──.gitlab-ci.yml
│
├── .gitlab-ci.yml
└── .gitlab-ci-common.yml
 
```

`.gitlab-ci.yml`文件内容如下：
```yaml
include:
    - local: "packages/react18-webpack/.gitlab-ci.yml"
    - local: "packages/vue3/.gitlab-ci.yml"

    # 添加更多子目录的.gitlab-ci.yml文件
variables:
    PNPM_HOME: "$CI_PROJECT_DIR/.pnpm"
    PNPM_STORE_DIR: "$CI_PROJECT_DIR/.pnpm-store"
    NODE_IMAGE: "mapleimage123/node:20-alpine3.19"

stages:
    - install
    - build
    - image
    - deploy
    - notify
# 公共的步骤，可以在其他.gitlab-ci.yml文件中引用
# 如果pnpm-lock.yaml没有变化就不会执行

install-job:
    extends: .install-job

```
`.gitlab-ci-common.yml`文件内容如下：
```yaml
# 配置复用
.pnpm-config:
    before_script:
        - corepack enable
        - corepack prepare --activate
        - pnpm config set store-dir $PNPM_STORE_DIR
    # 私有仓库配置
    # - pnpm config set @scope:registry https://${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/
    # - pnpm config set -- //${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken ${CI_JOB_TOKEN}

# 安装依赖-workspace级别
.install-job:
    extends: .pnpm-config
    stage: install
    tags:
        - nodejs
    image: $NODE_IMAGE
    script:
        - time pnpm install --frozen-lockfile
    rules:
        - changes:
              - pnpm-lock.yaml
    cache:
        key:
            files:
                - pnpm-lock.yaml
        paths:
            - $PNPM_STORE_DIR
            - node_modules/
        policy: pull-push

# 构建dist-workspace下的各个子项目共享
.build-job:
    before_script:
        - pnpm config set store-dir $PNPM_STORE_DIR
    stage: build
    tags:
        - nodejs
    image: $NODE_IMAGE
    script:
        - cd "packages/$SUB_PACKAGE"
        - time pnpm install --frozen-lockfile
        - time pnpm run build
        - APP_VERSION=$(node -p -e "require('./package.json').version")
        - echo "$APP_VERSION" > ./version.txt
    artifacts:
        paths:
            - "packages/$SUB_PACKAGE/dist"
            - "packages/$SUB_PACKAGE/version.txt"
    cache:
        key:
            files:
                - pnpm-lock.yaml
        paths:
            - $PNPM_STORE_DIR
            - node_modules/
        policy: pull

# 构建docker image-workspace下的各个子项目共享
.build-image-job:
    stage: image
    tags:
        - docker
    image: docker:27.3-dind
    services:
        - docker:27.3-dind
    retry:
        max: 2
        when:
            - runner_system_failure
            - unknown_failure
            - script_failure
    script:
        # tag标记1：产物类型
        - |
            if [ "$CI_COMMIT_BRANCH" == "main" ]; then
            export IMAGE_NAME=production
            else
            export IMAGE_NAME=staging
            fi
        - if [ -d "dist" ]; then echo "dist directory exists"; else echo "dist directory does not exist"; fi
        - version=$(cat "packages/$SUB_PACKAGE/version.txt")
        - echo $version
        # 构建镜像
        - docker build -t $USER_DOCKER_NS/$CI_PROJECT_NAME-$SUB_PACKAGE-$IMAGE_NAME:$version-$CI_COMMIT_SHORT_SHA -f ./packages/$SUB_PACKAGE/Dockerfile ./packages/$SUB_PACKAGE
        # docker login
        # - docker login -u $USER_DOCKER_REGISTRY_USER -p $USER_DOCKER_REGISTRY_PASSWORD $USER_DOCKER_REGISTRY
        # 镜像推送
        # - docker push $USER_DOCKER_NS/$CI_PROJECT_NAME-$SUB_PACKAGE-$IMAGE_NAME:$version-$CI_COMMIT_SHORT_SHA
        - image_name=$USER_DOCKER_NS/$CI_PROJECT_NAME-$SUB_PACKAGE-$IMAGE_NAME:$version-$CI_COMMIT_SHORT_SHA
        - echo "$image_name" > image.txt
    artifacts:
        paths:
            - image.txt

.deploy-job:
    stage: deploy
    tags:
        - docker
    image: docker:27.3-dind
    script:
        - image=$(cat image.txt)
        - echo $image
        - docker stop $SUB_PACKAGE || true
        - docker rm $SUB_PACKAGE || true
        - docker run --name $CI_PROJECT_NAME/$SUB_PACKAGE --network maple-network -d -p $SUB_PACKAGE_PORT:80 $image

              
.notify-success:
    stage: notify
    script:
        - >
            curl -X POST -H "Content-Type: application/json"
            -d '{"msg_type":"text","content":{"text":"Web APP - $SUB_PACKAGE 部署成功"}}'
            https://open.feishu.cn/open-apis/bot/v2/hook/f44c17ad-06b0-4957-a5be-2b066fcef6ce
    # 多个job
    rules:
        - when: on_success
        - changes:
              - packages/$SUB_PACKAGE/**/*

.notify-failure:
    stage: notify
    rules:
        - when: on_failure
        - changes:
              - packages/$SUB_PACKAGE/**/*
    script:
        - >
            curl -X POST -H "Content-Type: application/json"
            -d '{"msg_type":"text","content":{"text":"Web APP - $SUB_PACKAGE 部署失败"}}'
            https://open.feishu.cn/open-apis/bot/v2/hook/f44c17ad-06b0-4957-a5be-2b066fcef6ce

```
`react18-webpack/.gitlab-ci.yml`文件内容如下：
```yaml
variables:
  COREPACK_NPM_REGISTRY: "https://registry.npmmirror.com"
  TZ: "Asia/Shanghai"
  SUB_PACKAGE: "react18-webpack"
  SUB_PACKAGE_PORT: "6043"

include:
  - local: ".gitlab-ci-common.yml"

build-job-react18-webpack:
  extends: .build-job

build-image-job-react18-webpack:
  extends: .build-image-job
  dependencies:
    - build-job-react18-webpack
  needs:
    - job: build-job-react18-webpack
      optional: false

deploy-job-react18-webpack:
  extends: .deploy-job
  needs:
    - job: build-image-job-react18-webpack
      optional: false

# 部署成功的通知
notify-success-react18-webpack:
  extends: .notify-success
  needs:
    - job: deploy-job-react18-webpack
      optional: false

# 部署失败的通知
notify-failure-react18-webpack:
  extends: .notify-failure
  needs:
    - job: deploy-job-react18-webpack
      optional: false
```

`vue3/.gitlab-ci.yml`文件内容如下：
```yaml
variables:
  COREPACK_NPM_REGISTRY: "https://registry.npmmirror.com"
  TZ: "Asia/Shanghai"
  SUB_PACKAGE: "vue3"
  SUB_PACKAGE_PORT: "6042"

include:
  - local: ".gitlab-ci-common.yml"

build-job-vue3:
  extends: .build-job
  rules:
    - changes:
        - packages/$SUB_PACKAGE/**/*

build-image-job-vue3:
  extends: .build-image-job
  dependencies:
    - build-job-vue3
  needs:
    - job: build-job-vue3
      optional: false
  rules:
    - changes:
        - packages/$SUB_PACKAGE/**/*
deploy-job-vue3:
  extends: .deploy-job
  needs:
    - job: build-image-job-vue3
      optional: false
  rules:
    - changes:
        - packages/$SUB_PACKAGE/**/*

# 部署成功的通知
notify-success-vue3:
  extends: .notify-success
  needs:
    - job: deploy-job-vue3
      optional: false

# 部署失败的通知
notify-failure-vue3:
  extends: .notify-failure
  needs:
    - job: deploy-job-vue3
      optional: false
```

我的问题：
- 我希望在`react18-webpack`和`vue3`的`.gitlab-ci.yml`文件中都能复用`.gitlab-ci-common.yml`文件中的内容
- `build-image-job-react18-webpack`仅依赖上一个步骤`build-job-react18-webpack`，同理`build-image-job-vue3`仅依赖上一个步骤`build-job-vue3` 
- 仅`packages/xx`目录下的文件发生变化才执行`build-job-xx`和`build-image-job-xx`