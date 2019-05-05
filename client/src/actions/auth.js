import axios from 'axios'

import { API_URL } from '../config/config'

const handleLogin = async (email, password) => {
    return await axios.post(`${API_URL}/auth/login`, { email, password })
}

export default { handleLogin }