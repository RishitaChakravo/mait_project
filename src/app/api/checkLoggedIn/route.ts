import { NextRequest, NextResponse } from "next/server";
import getDatafromToken from "@/getDatafromToken";
import dbConnect from "@/dbConnect/dbConnect";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ loggedIn: false, message: "No token" });
    }

    const userId = await getDatafromToken(token);
    if (!userId) {
      return NextResponse.json({ loggedIn: false, message: "Invalid token" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ loggedIn: false, message: "User not found" });
    }

    return NextResponse.json({
      loggedIn: true,
    });
  } catch (error) {
    console.error("Error in loggedIn API:", error);
    return NextResponse.json(
      { loggedIn: false, message: "Server error" },
      { status: 500 }
    );
  }
}
