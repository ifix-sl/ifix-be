import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    contactNo: string

    @Column()
    password: string

    @Column()
    verified: boolean

    @Column()
    otpReferenceNo: string

    @Column()
    subscriberId: string

}
