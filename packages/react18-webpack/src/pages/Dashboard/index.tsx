import { Button, Divider, Space, message } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNotificationStore } from '@/stores/notifications'

// "▓▓▓▓▓▓▓▓▓▓▓░░░░"

const unpassed = '▓'
const passed = '░'

const Progress = ({ value }: { value: number }) => {
  const data: string[] = useMemo(
    () => Array.from({ length: 50 }, (_, i) => (i < value / 2 ? passed : unpassed)),
    [value]
  )
  return (
    <div className="flex">
      <div className="mr-1">{data.reverse()}</div>
      <span>{value}%</span>
    </div>
  )
}
export default () => {
  const current = dayjs(dayjs().format('YYYY-MM-DD'))
  const next = dayjs(dayjs().add(1, 'year').format('YYYY'))

  const rest = next.diff(current, 'days')
  const progress = Math.floor((rest / 365) * 100)
  console.count('Dashboard')
  //   const matches = useMatches()
  //   console.log(matches)

  //   const userData = useRouteLoaderData('root')
  //   console.log(userData)

  //   const loaderData = useLoaderData()
  //   console.log(loaderData)

  //   const { t } = useTranslation()

  const { addNotification } = useNotificationStore()
  const onAddNotification = useCallback(() => {
    addNotification({
      title: `test-${Math.random()}`,
      type: 'info',
    })
  }, [addNotification])

  const onAddMessage = useCallback(() => {
    const content = `${Math.random()}`
    message.info({ content, key: content })
  }, [])
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="py-4 text-[24px]"> {t('current-year-progress', { year: current.format('YYYY') })}</h1>
      <Progress value={progress} />
      <Divider />
      {/* <p>{t('title', { name: 'John' })}</p> */}
      <p>测试下</p>
      <p>{t('keyWithCount', { count: 1 })}</p>
      <p>{t('keyWithCount', { count: 2 })}</p>
      <Divider />
      <Space>
        <Button
          onClick={onAddNotification}
          type="primary"
        >
          添加弹窗
        </Button>
        <Button onClick={onAddMessage}>添加Message</Button>
      </Space>
    </div>
  )
}
