// import { connectDB } from "@/lib/connectDB"
// import { NextResponse } from "next/server"

// export const POST=async(request)=>{
//     // console.log(request);
    
//     let userCar=await request.json()
//     let db=await connectDB()
//     let saveCarCollection=await db.collection('saved-cars')
//     try {
//        let result= await saveCarCollection.insertOne(userCar)
//        return NextResponse.json(result)
//     } catch (error) {
//         return NextResponse.json({message:'error for saving car'})
//     }
// }


import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const userCar = await request.json();
        const db = await connectDB();
        const saveCarCollection = db.collection('saved-cars');

        const result = await saveCarCollection.insertOne(userCar);

        return NextResponse.json({ message: 'Car saved successfully', result }, { status: 201 }); // 201 status code for creation
    } catch (error) {
        console.error('Error saving car:', error); // Log the error for debugging
        return NextResponse.json({ message: 'Error saving car', error: error.message }, { status: 500 }); // 500 status code for server error
    }
};
