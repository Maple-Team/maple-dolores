import axios from './axios'

export const fetchUserInfo = () => axios.get('/api/auth/profile')
