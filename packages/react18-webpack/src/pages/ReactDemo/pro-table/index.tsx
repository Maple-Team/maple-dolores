import { useQueryClient } from '@tanstack/react-query'
import { ProTable, ProColumns } from '@ant-design/pro-table'
import { DatePicker, Input } from 'antd'
import React, { memo, useCallback, useReducer, useRef } from 'react'
import { queryKey, useFetchTimeLineList } from './hook'
import { BaseParams, OptionalPick } from '@liutsing/types-utils'
import { Timeline } from './type'
import { ProFormInstance } from '@ant-design/pro-form'
import locale from 'antd/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs'

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
      switch (action.type) {
        case 'PageChange':
          return { ...state, current: action.payload }
        case 'PageSizeChange':
          return { ...state, pageSize: action.payload, current: 1 }
        case 'SearchFormChange':
          console.log('SearchFormChange', action.payload)
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
  //   console.log('params', params)
  const formRef = useRef<ProFormInstance>()
  const columns: ProColumns<Timeline>[] = [
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
    {
      title: '创建时间',
      dataIndex: 'ts',
      valueType: 'dateTime',
      render: (_dom, record, _index, _action) => {
        return new Date(record.ts).toLocaleString()
      },
      fieldProps: () => {
        return {
          disabled: false,
          type: 'date',
          format: 'YYYY-MM-DD HH:mm:ss',
        }
      },
      //   proFieldProps: {
      //     valueType: 'dateTime',
      //   },
      //   formItemProps: (form, config) => {
      //     console.log('formItemProps', form, config)
      //     console.log(form.getFieldValue('ts'))
      //     return {
      //       label: '创建时间2',
      //       colon: true,
      //       initialValue: dayjs(),
      //     }
      //   },
      //   renderFormItem: (schema, config, form, action) => {
      //     return <Input />
      //   },
      //   search: {
      //     transform: (value, namePath, allValues) => {
      //       console.log('transform', value, namePath, allValues)
      //       return dayjs()
      //     },
      //   },
      //   initialValue: dayjs(),
    },
  ]
  const { data, isFetching, isLoading } = useFetchTimeLineList(params)
  const removePreviousQueries = useCallback(() => {
    queryClient.removeQueries({ queryKey: [queryKey, params] })
  }, [params, queryClient])

  return (
    <ProTable
      className="py-4 px-2"
      // 封装的 table 的 className
      tableClassName="tableClassName"
      // 封装的 table 的 style
      tableStyle={{}}
      columns={columns}
      loading={isLoading || isFetching}
      debounceTime={500}
      dataSource={data?.records}
      dateFormatter="number"
      search={{
        onCollapse(collapsed) {
          console.log('onCollapse', collapsed)
        },
        collapsed: false,
      }}
      rowKey="_id"
      // 可以获取到查询表单的 form 实例，用于一些灵活的配置
      formRef={formRef}
      // 工具栏： 全屏，刷新，紧凑度，列设置(要显示的列，以及顺序)，支持传入function
      //   options={false}
      // antd form 的配置
      form={{
        syncToUrl: (values, type) => {
          const { current, pageNo, ...rest } = values
          // get: 从url到表单
          // set: 从表单到url
          console.log('syncToUrl', values, type)
          if (type === 'get') {
            const _values = {
              ...rest,
              ts: values.ts ? dayjs(+values.ts) : undefined,
            }
            console.log('url _values', _values)
            return _values
          }
          return { ...rest, pageNo: current }
        },
        syncToInitialValues: false,
        syncToUrlAsImportant: true,
        // ProForm 会自动清空 null 和 undefined 的数据，如果你约定了 nil 代表某种数据，可以设置为 false 关闭此功能
        omitNil: false,
        // 如果想要监听某个值
        onValuesChange: (changedValues: PartialFormModel) => {
          console.log('onValuesChange', changedValues)
        },
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
            dispatch({
              type: 'PageSizeChange',
              payload: pageSize,
            })
          } else {
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
      // 搜索之前进行一些修改
      beforeSearchSubmit={(params: PartialFormModel) => {
        console.log('url beforeSearchSubmit', params)
        return params
      }}
      // 提交表单时触发
      onSubmit={(params: PartialFormModel) => {
        console.log('url onSubmit', params)
        dispatch({
          type: 'SearchFormChange',
          payload: {
            ...params,
            current: 1,
          },
        })
        removePreviousQueries()
      }}
      // 重置表单时触发
      onReset={() => {
        // formRef.current?.resetFields()
      }}
      // 空值时的显示，不设置时显示 -， false 可以关闭此功能
      columnEmptyText="无数据"
    />
  )
})

Component.displayName = 'ReactProTable'
