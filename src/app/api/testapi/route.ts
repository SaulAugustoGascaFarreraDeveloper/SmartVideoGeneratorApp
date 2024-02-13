import { NextResponse } from "next/server";

export const GET = async(req:Request,res:NextResponse) => {

    try{

        return NextResponse.json({"message" : "NEXTJS API WORK TOO"},{status: 200})

    }catch(error)
    {
        console.log(error)
        return new NextResponse("Internal Error",{status: 500})  
    }

} 