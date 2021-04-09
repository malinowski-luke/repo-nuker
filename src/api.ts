import axios from 'axios'

axios.delete('https://api.github.com//repos/malinowskil123/repo_',{
  headers:{
    Authorization:'Bearer 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',
    Accept:"application/vnd.github.v3+json",

  }
}).then((res)=>{
  console.log(res.status)
}).catch((err)=>{
  console.log(err.message)
})


// axios.get('https://api.github.com/users/malinowskil123/repos', {
axios.get('https://api.github.com/search/repositories?q=user:malinowskil123', {
  headers: {
    Authorization: 'Bearer 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',
    Accept: "application/vnd.github.v3+json",

  }
}).then((res) => {
  console.log(res.data.items.length)
}).catch((err) => {
  console.log(err.message)
})
