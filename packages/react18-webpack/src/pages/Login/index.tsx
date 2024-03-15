import { message } from 'antd'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { instance, useLoginMutation } from '@/http'

function Login() {
  const { mutate } = useLoginMutation()
  const navigate = useNavigate()

  const onSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault()
      const username = (document.getElementById('username') as HTMLInputElement).value
      const password = (document.getElementById('password') as HTMLInputElement).value
      if (!username || !password) {
        message.error('用户名/密码必需')
        return
      }
      mutate(
        { phone: username, password },
        {
          onSuccess(data) {
            const jwt = data.accessToken
            localStorage.setItem('jwt', data.accessToken)
            // FIXME FOR react-router loader 时机问题
            instance.defaults.headers.Authorization = `Bearer ${jwt}`
            navigate('/')
          },
        }
      )
    },
    [mutate, navigate]
  )

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <form onSubmit={onSubmit}>
          {/* <div className="text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button
            type="button"
            className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <BiLogoFacebook
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <AiOutlineTwitter
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
        </div> */}
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            id="username"
            placeholder="Email Address/Phone Number"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            id="password"
            placeholder="Password"
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input
                className="mr-1"
                type="checkbox"
              />
              <span>记住我</span>
            </label>
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              忘记密码？
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              登录
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            还没有账号？{' '}
            <a
              className="text-red-600 hover:underline hover:underline-offset-4"
              href="#"
            >
              注册
            </a>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
