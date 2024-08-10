const { connectDB } = require("@/lib/connectDB")
const { ObjectId } = require("mongodb")
const { NextResponse } = require("next/server")

export const GET =async(request,{params})=>{
    // console.log('pa',params);
    let db=await connectDB()
    let carsCollection=await db.collection('cars')
    try {
        let result=await carsCollection.findOne({_id:new ObjectId(params.id)})
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({message:'Not found one data'})
    }
}