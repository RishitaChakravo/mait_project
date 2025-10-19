import dbConnect from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const { email, password } = await request.json()
        const oldtoken = request.cookies.get('token')?.value
        if (oldtoken) {
            try {
                const decoded: any = jwt.verify(oldtoken, process.env.TOKEN_SECRET!);

                const oldUser = await User.findById(decoded.id);
                if (oldUser) {
                    oldUser.verifyToken = null;
                    oldUser.verifyTokenExpiry = null;
                    await oldUser.save();
                }

                console.log("🗑️ Existing token deleted before new login");
            } catch (err) {
                console.log("Old token invalid or expired, ignoring...");
            }
        }
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are necessary"
                },
                { status: 400 }
            )
        }

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "invalid email and password, User doesnt exist!!"
                },
                { status: 401 }
            )
        }

        const cmppass = await bcrypt.compare(password, user.password)
        if (!cmppass) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid/ Wrong passsword"
                },
                { status: 401 }
            )
        }

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET!, { expiresIn: '4d' })
        user.verifyToken = token
        user.verifyTokenExpiry = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
        await user.save()

        const response = NextResponse.json({ success: true, message: "Logged in successfully" })
        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 4 * 24 * 60 * 60, // 4 days in seconds
        })
        return response

    } catch (error) {
        console.log("Problem while logining in", error)
        return NextResponse.json(
            {
                success: false,
                message: "Internal Servere error"
            },
            { status: 500 }
        )
    }
}