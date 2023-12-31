import connectMongoDB from "@/app/lib/mongodb";
import Persona from "@/app/models/persona";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request){
    const { firstName, lastName, email, password, dob, premiumUser } = await request.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    await Persona.create({ firstName, lastName, email, password: hashedPassword, dob, premiumUser });
    return NextResponse.json({ message: "Persona created successfully", success: true, }, {status:201});
}

export async function GET(){
    await connectMongoDB();
    const personas = await Persona.find();
    return NextResponse.json({personas});
}

export async function DELETE(request){
    const { id } = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Persona.findByIdAndDelete(id);
    return NextResponse.json({ message: "Persona deleted successfully" }, {status:201});
}