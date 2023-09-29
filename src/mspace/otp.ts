import { AxiosResponse } from "axios"
import axios from "./../../http-common"



const requestOTP = (subscriberId: string) => {

    return axios.post("/otp/request", {
        subscriberId
    })
}

const verifyOTP = (referenceNo: string, otp: string) => {
    return axios.post("/otp/verify", {
        referenceNo,
        otp
    })
}


export {
    requestOTP,
    verifyOTP
}