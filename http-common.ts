import axios from "axios";


const mspaceAppId = process.env.MSPACE_APP_ID
const mspaceAppPassword = process.env.MSPACE_APP_PASSWORD

console.log(mspaceAppId)
console.log(mspaceAppPassword)


export default axios.create({
    baseURL: "https://api.mspace.lk",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "
    },
    data: {
        "applicationId": mspaceAppId,
        "password": mspaceAppPassword
    }
})