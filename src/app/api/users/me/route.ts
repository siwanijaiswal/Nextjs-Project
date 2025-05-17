import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        console.log(userId)
        //-password means not fetching password of that user
        const userss = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({ message: "User found", data: userss })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}