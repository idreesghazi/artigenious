import connectMongoDB from "@/app/lib/mongodb";
import Persona from "@/app/models/persona";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectMongoDB();

    const { email, password } = await request.json();
    const persona = await Persona.findOne({ email });

    if (!persona) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, persona.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid password", success: false },
        { status: 401 }
      );
    }
    //create token data
    const tokenData = {
      id: persona._id,
      email: persona.email,
      firstName: persona.firstName,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    
    const response = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
  

    
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
