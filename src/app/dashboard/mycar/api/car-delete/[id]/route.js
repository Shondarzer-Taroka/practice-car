import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE=async(request,{params})=>{
    console.log(params.id,'jl');
    
    let db=await connectDB()
    let saveCarCollection=await db.collection('saved-cars')
    try {
        let result=await saveCarCollection.deleteOne({_id:new ObjectId(params.id)})
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({message:'unable to delete'})
    }
 }