import dbConnect from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import getDatafromToken from "@/getDatafromToken";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const token = request.cookies.get('token')?.value
    if(!token) {
        return NextResponse.json({status: 400})
    }

    const userId = await getDatafromToken(token)
    const user = await User.findById(userId)
    if(!user) {
        return NextResponse.json({message: "Invalid token"}, {status:400})
    }

    user.verifyToken = null
    user.verifyTokenExpiry = null
    await user.save()

    const response = NextResponse.json({
        success: true,
        message:"Logged out successfully"
    })

    response.cookies.set(token, "", {
        httpOnly: true,
        expires:new Date(0)
    })

    return response    
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during logout" },
      { status: 500 }
    );
  }
}