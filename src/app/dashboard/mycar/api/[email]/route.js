import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET=async(request,{params})=>{
    console.log(params);
    
    let db=await connectDB()
    let saveCarCollection=await db.collection('saved-cars')
    try {
        let result=await saveCarCollection.find({email:params.email}).toArray()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({message:'something went to wrong get data searching email'})
    }
}


// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// export const GET = async (request, { params }) => {
//     try {
//         console.log(params);
        
//         const db = await connectDB();
//         const saveCarCollection = db.collection('saved-cars');

//         const result = await saveCarCollection.find({ email: params.email }).toArray();

//         return NextResponse.json(result);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return NextResponse.json({ message: 'Something went wrong while searching for the email' }, { status: 500 });
//     }
// };
