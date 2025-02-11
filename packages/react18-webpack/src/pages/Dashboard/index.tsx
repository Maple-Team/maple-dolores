import { Button, Divider, Space, message } from 'antd'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { getWeekNumber2, padStart } from '@liutsing/utils'
import { Progress } from './progress'
import { useNotificationStore } from '@/stores/notifications'

export default () => {
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
  const current = dayjs(dayjs().format('YYYY-MM-DD'))

  console.log('test')

  return (
    <div>
      <h1 className="py-4 text-[24px]"> {t('current-year-progress', { year: current.format('YYYY') })}</h1>
      <h2 className="py-4 text-[24px]">
        {t('current-week-number', { week: padStart(getWeekNumber2(new Date()), 2, '0') })}
      </h2>
      <Progress />
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
