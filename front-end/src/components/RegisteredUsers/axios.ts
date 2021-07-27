import axios from 'axios';



const result =  axios.get("http://localhost:3001/getusers")
                .then(res => {
                  res.data
                })
console.log(result.then())

const rows = result.then();
export default rows 