import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FunctionButton } from './FunctionButton'
import {
  FETCH_REMOTE_CONTROL_TIMEOUT,
  TIME_TO_NOT_USE_REALTIME_DATA,
  useRemoteControlResult,
  useVehicleRealtimeControlInfo,
} from './useRemoteControl'
import { showMesage } from './util'
import { closeShoutBeaconRequest, sendRemoteCommand } from '@/hooks'
import { remoteCommandTypeEnum, remoteResultEnum, vehicleDeviceSwitchStateEnum } from '@/enums/remote-control'

const AlarmPanel = () => {
  const vin = 'TESTVIN111111'
  const commandIdRef = useRef<string | null>(null)

  // 远控结果
  const { result, noUsingRTdataTimeout, resetTimeout, resetFetchTimeout } = useRemoteControlResult(commandIdRef.current)

  // 实时数据
  const { strongLight, alarmLight, alarmRing, setStrongLightCB, setAlarmLightCB, setAlarmRingCB } =
    useVehicleRealtimeControlInfo(noUsingRTdataTimeout, vin)

  /**
   * 等待远控结果loading
   */
  const [strongLightLoading, setStrongLightLoading] = useState<boolean>()
  const [alarmLightLoading, setAlarmLightLoading] = useState<boolean>()
  const [alarmRingLoading, setAlarmRingLoading] = useState<boolean>()

  useEffect(() => {
    if (!result) return
    const { resultCode, resultMsg, commandType } = result.controlResultList[0]

    if (resultCode === remoteResultEnum.SUCCESS) {
      switch (commandType) {
        case remoteCommandTypeEnum.STRONG_LIGHT:
          setStrongLightCB((_: boolean) => !_)
          showMesage('执行成功', 'success').catch(console.log)
          break
        case remoteCommandTypeEnum.ALARM_LIGHT:
          setAlarmLightCB((_) => !_)
          showMesage('执行成功', 'success').catch(console.log)
          break
        case remoteCommandTypeEnum.ALARM_RING:
          setAlarmRingCB((_) => !_)
          showMesage('执行成功', 'success').catch(console.log)
          break
        default:
          break
      }
    } else {
      showMesage(resultMsg, 'error').catch(console.log)
    }
    // 有远控结果，loading状态重置 // NOTE 简单处理，同一时期只有一个loading
    setStrongLightLoading(false)
    setAlarmLightLoading(false)
    setAlarmRingLoading(false)
  }, [result, setAlarmLightCB, setAlarmRingCB, setStrongLightCB])

  const onStrongLightChange = useCallback(
    (checked: boolean) => {
      if (!vin) return
      resetTimeout(TIME_TO_NOT_USE_REALTIME_DATA)

      sendRemoteCommand({
        deviceType: '1',
        vin,
        instructionDtoList: [
          {
            commandType: remoteCommandTypeEnum.STRONG_LIGHT,
            switchOrder: checked ? vehicleDeviceSwitchStateEnum.OPEN : vehicleDeviceSwitchStateEnum.CLOSE,
          },
        ],
      })
        .then((id) => {
          showMesage('发送成功', 'success').catch(console.log)
          resetFetchTimeout(FETCH_REMOTE_CONTROL_TIMEOUT)
          commandIdRef.current = id
          setStrongLightLoading(true)
        })
        .catch((e) => {
          console.error(e)
          setStrongLightCB(false)
          // message.error(<MsgSendErr e={e} />)
        })
    },
    [resetFetchTimeout, resetTimeout, setStrongLightCB]
  )

  const onAlarmLightChange = useCallback(
    (checked: boolean) => {
      if (!vin) return
      resetTimeout(TIME_TO_NOT_USE_REALTIME_DATA)

      sendRemoteCommand({
        deviceType: '1',
        vin,
        instructionDtoList: [
          {
            commandType: remoteCommandTypeEnum.ALARM_LIGHT,
            switchOrder: checked ? vehicleDeviceSwitchStateEnum.OPEN : vehicleDeviceSwitchStateEnum.CLOSE,
          },
        ],
      })
        .then((id) => {
          showMesage('发送成功', 'success').catch(console.log)
          resetFetchTimeout(FETCH_REMOTE_CONTROL_TIMEOUT)
          setAlarmLightLoading(true)
          commandIdRef.current = id
        })
        .catch((e) => {
          console.error(e)
          setAlarmLightCB(false)
          // message.error(<MsgSendErr e={e} />)
        })
    },
    [resetFetchTimeout, resetTimeout, setAlarmLightCB]
  )

  const onAlarmRingChange = useCallback(
    (checked: boolean) => {
      if (!vin) return
      resetTimeout(TIME_TO_NOT_USE_REALTIME_DATA)
      sendRemoteCommand({
        deviceType: '1',
        vin,
        instructionDtoList: [
          {
            commandType: remoteCommandTypeEnum.ALARM_RING,
            switchOrder: checked ? vehicleDeviceSwitchStateEnum.OPEN : vehicleDeviceSwitchStateEnum.CLOSE,
          },
        ],
      })
        .then((id) => {
          showMesage('发送成功', 'success').catch(console.log)
          resetFetchTimeout(FETCH_REMOTE_CONTROL_TIMEOUT)
          setAlarmRingLoading(true)
          commandIdRef.current = id
        })
        .catch((e) => {
          console.error(e)
          setAlarmRingCB(false)
          // message.error(<MsgSendErr e={e} />)
        })
    },
    [resetFetchTimeout, resetTimeout, setAlarmRingCB]
  )

  useEffect(() => {
    const handleUnload = () => {
      closeShoutBeaconRequest(vin)
    }
    window.addEventListener('unload', handleUnload)
    return () => window.removeEventListener('unload', handleUnload)
  }, [vin])

  return (
    <div className="pt-[14px] pl-4 flex-1 relative z-20">
      <header className="text-lg border-0 border-b-[1px] pb-3 border-b-[rgba(0,0,0,0.1)] border-solid">
        基础警用功能
      </header>
      <div className="flex justify-between flex-wrap pt-3 pr-4">
        <FunctionButton
          name="强光灯"
          loading={strongLightLoading}
          checked={strongLight as boolean}
          icon="icon-alarm-strong-light"
          onChange={onStrongLightChange}
        />
        <FunctionButton
          name="警灯"
          loading={alarmLightLoading}
          checked={alarmLight as boolean}
          icon="icon-alarm-alarm-light"
          onChange={onAlarmLightChange}
        />
        <FunctionButton
          name="警笛"
          loading={alarmRingLoading}
          checked={alarmRing as boolean}
          icon="icon-alarm-alarm-ring"
          onChange={onAlarmRingChange}
        />
      </div>
    </div>
  )
}

export default AlarmPanel
