import axios from 'axios'

const secretKey= process.env.REACT_APP_SECRET_KEY
const ID=process.env.REACT_APP_ID
 
const baseURL=process.env.REACT_APP_BASE_URL

 


const Token = window.btoa(ID+':'+secretKey)

 const authAxios = axios.create({
  
     baseURL:baseURL,  
     headers:{
      'Authorization':`Basic ${Token}`
    }  
})
 
// Login user 
const login = async (userData) => {
  const response = await authAxios
  .post(`oauth/token?grant_type=password&scope=write&username=${userData.username}&password=${userData.password}`)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  logout,
  login,
}

export default authService