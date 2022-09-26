const axios = require('axios')

axios.interceptors.response.use(res => {
    return res.data
})

async function fetchResponseList(){
  return  axios.get('https://api.github.com/users/wangyiye/repos')
}
async function fetchTag(repo){
  return  axios.get('https://api.github.com/users/wangyiye/repos')
}

module.exports = {
    fetchResponseList,
    fetchTag
}