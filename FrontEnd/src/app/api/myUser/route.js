import { getDataFromToken } from "@/helpers/getDataFromToken";

import {NextRequest,NextResponse} from 'next/server';
import Persona from '@/app/models/Persona';
import connectMongoDB from "@/app/lib/mongodb";

export async function GET(request) {

    try{
        connectMongoDB();
        const userId = await getDataFromToken(request);
        console.log("userid is: ",userId);
        const user = await Persona.findOne({_id: userId}).select('-password');
        return NextResponse.json({
            message: 'User found',
            data: user,
        });
    }
    catch(error){
        return NextResponse.json({error: error.message}, {status: 401});

    }
}
