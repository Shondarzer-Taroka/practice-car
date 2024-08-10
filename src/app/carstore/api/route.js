import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const GET =async()=>{
 let db=await connectDB()
 let carsCollection=await db.collection('cars')
 try {
    let result= await carsCollection.find().toArray();
    return NextResponse.json(result)
 } catch (error) {
    return NextResponse.json({message:'Not found any car'})
 }
}