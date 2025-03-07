# gitlab cicd 在 monorepo 项目中的落地实践

## 项目结构

```
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

## 脚本复用

## 通用 jobs

-   lint
-   test
-   format

## 父子流水线

## 合并请求结果流水线
