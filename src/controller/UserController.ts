import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { requestOTP, verifyOTP } from '../mspace/otp'

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async register(request: Request, response: Response) {
        try {
            const { name, contactNo, password } = request.body;


            const res = await requestOTP(`tel:${contactNo}`)

            const { statusDetail, referenceNo } = res.data



            const user = Object.assign(new User(), {
                name,
                contactNo,
                password,
                verified: false,
                otpReferenceNo: referenceNo
            })

            await this.userRepository.save(user)

            return response.json()
        } catch (e) {
            console.log(e)
        }
    }

    async verfiyOTP(request: Request, response: Response) {
        try {
            const { contactNo, otp } = request.body;

            const userObj = await this.userRepository.findOne({
                where: {
                    contactNo
                }
            })

            const otpReferenceNo = userObj.otpReferenceNo

            const res = await verifyOTP(otpReferenceNo, otp)

            const { statusCode, subscriptionStatus, statusDetail, subscriberId } = res.data

            switch (statusCode) {
                case "S1000":

                    this.userRepository.update({
                        contactNo
                    },
                        {
                            subscriberId
                        })
                    return response.json({
                        status: "success"
                    })
                    break;
                case "E1850":
                    return response.json({
                        status: "invalid otp"
                    })
                default:
                    break;
            }


        } catch (error) {
            console.log(error)
        }

    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}