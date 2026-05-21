import {connect} from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel.models";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        //little validation 
        if(!username || !email || !password){
            return NextResponse.json({
                error: "All fields are required",
                status: 400
            });
        }

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }

        //Hash password

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }

}
