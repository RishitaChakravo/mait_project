import dbConnect from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from '@/models/userModel'

export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const { name, age, gender, email, password } = await request.json()

        if (!age) {
            return NextResponse.json({ message: "All fields are mandatory" }, { status: 400 })
        }
        if ([name, gender, email, password].some((field) => !field || field.trim() === "")) {
            return NextResponse.json({ message: "All fields are mandatory" }, { status: 400 });
        }

        if (!['F', 'M', 'O'].includes(gender)) {
            return NextResponse.json({ message: "Invalid value of Gender. Try using F, M, O" }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            age,
            gender,
            email,
            password: hashPassword
        })

        return NextResponse.json({
            message: "User signup process complete",
            user,
            success: true,
        }, { status: 200 })
    } catch (error) {
        console.error("Error while signing up", error)
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Internal Error"
            },
            { status: 500 }
        )
    }
}