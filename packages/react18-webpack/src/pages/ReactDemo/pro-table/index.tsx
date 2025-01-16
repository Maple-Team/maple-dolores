import { useQueryClient } from '@tanstack/react-query'
import { ProTable, ProColumns } from '@ant-design/pro-table'
import React, { memo, useCallback, useReducer, useRef } from 'react'
import { queryKey, useFetchTimeLineList } from './hook'
import { BaseParams, OptionalPick } from '@liutsing/types-utils'
import { Timeline } from './type'
import { ProFormInstance } from '@ant-design/pro-form'

type PartialFormModel = OptionalPick<Timeline, 'content' | 'type'>

type SearchFormModel = BaseParams<PartialFormModel>

type Action =
  | {
      type: 'PageChange'
      payload: number
    }
  | {
      type: 'PageSizeChange'
      payload: number
    }
  | {
      type: 'SearchFormChange'
      payload: SearchFormModel
    }

export const Component = memo(() => {
  const queryClient = useQueryClient()

  const [params, dispatch] = useReducer(
    (state: SearchFormModel, action: Action): SearchFormModel => {
      console.log('======', action.type)
      switch (action.type) {
        case 'PageChange':
          return { ...state, current: action.payload }
        case 'PageSizeChange':
          return { ...state, pageSize: action.payload, current: 1 }
        case 'SearchFormChange':
          return { ...state, ...action.payload }
        default:
          return { ...state }
      }
    },
    {
      pageSize: 2,
      current: 1,
    }
  )
  console.log('params', params)
  const formRef = useRef<ProFormInstance>()
  const columns: ProColumns[] = [
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '时间',
      dataIndex: 'time',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
  ]
  const { data, isFetching, isLoading } = useFetchTimeLineList(params)
  const removePreviousQueries = useCallback(() => {
    queryClient.removeQueries({ queryKey: [queryKey, params] })
  }, [params, queryClient])

  return (
    <ProTable
      className="py-4 px-2"
      columns={columns}
      loading={isLoading || isFetching}
      dataSource={data?.records || []}
      rowKey="_id"
      formRef={formRef}
      options={false}
      form={{
        syncToUrl: true,
        syncToInitialValues: false,
        syncToUrlAsImportant: true,
      }}
      pagination={{
        pageSize: params.pageSize,
        position: ['bottomRight'],
        showPrevNextJumpers: true,
        showQuickJumper: true,
        showSizeChanger: true,
        current: params.current,
        total: data?.pagination?.total || 0,
        pageSizeOptions: [2, 4, 10],
        onChange: (page: number, pageSize: number) => {
          // NOTE 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
          if (pageSize !== params.pageSize) {
            console.log('pageSizeChange', page, pageSize)
            dispatch({
              type: 'PageSizeChange',
              payload: pageSize,
            })
          } else {
            console.log('pageChange', page, pageSize)
            dispatch({
              type: 'PageChange',
              payload: page,
            })
          }
        },
        // NOTE 只监听onChange即可
        // onShowSizeChange: (_, size: number) => {
        //   console.log('onShowSizeChange', _, size)
        //   dispatch({
        //     type: 'PageSizeChange',
        //     payload: size,
        //   })
        // },
      }}
      onSubmit={(params: PartialFormModel) => {
        dispatch({
          type: 'SearchFormChange',
          payload: {
            ...params,
            current: 1,
          },
        })
        // removePreviousQueries()
      }}
      onReset={() => {
        formRef.current?.resetFields()
      }}
      //   pagination
    />
  )
})

Component.displayName = 'ReactProTable'
