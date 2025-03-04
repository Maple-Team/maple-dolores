# gitlab cicd 在 monorepo 项目中的落地实践

## 项目结构

```
project-name/
│
├── react18-webpack/
│   └── .gitlab-ci.yml
│
├── vue3/
│   └── .gitlab-ci.yml
│
├── .gitlab-ci.yml
└── .gitlab-ci-common.yml
```

## 脚本复用

## 通用 jobs

- lint
- test
- format

## jobs 触发条件/依赖

```

```
