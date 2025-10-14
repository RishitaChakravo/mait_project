import dbConnect from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export default async function POST(request: NextRequest){
    try {
        dbConnect()
        const {email, password} = await request.json()
        if (!email || !password) {
            return NextResponse.json(
                {
                    success:false,
                    message: "All fields are necessary"
                },
                {status: 400}
            )
        }

        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "invalid email and password, User doesnt exist!!"
                },
                {status: 401}
            )
        }

        const cmppass = await bcrypt.compare(password, user.password)
        if(!cmppass) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid/ Wrong passsword"
                },
                {status: 401}
            )
        }

        const token = jwt.sign({id : user.id}, process.env.TOKEN_SECRET!, {expiresIn: '4d'})
        user.verifyToken = token
        user.verifyTokenExpiry = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
        await user.save()

        return NextResponse.json(
            {
                success: true,
                message: "Logged In successfully. You'll remain logged in for 4 days if you dont logout"
            },
            {status: 200}
        )

    } catch (error) {
        console.log("Problem while logining in", error)
        return NextResponse.json(
            {
                success: false,
                message: "Internal Servere error"
            },
            {status: 500}
        )
    }
}