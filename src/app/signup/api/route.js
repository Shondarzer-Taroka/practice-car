import { connectDB } from "@/lib/connectDB";
import bcrypt from 'bcrypt'


export const POST = async (request) => {
    try {
        const newUser = await request.json();
        const db = await connectDB();  // Ensure connectDB returns a promise
        const userCollection = db.collection('practice-users');

        // Check if the user already exists
        
        const exist = await userCollection.findOne({ email: newUser.email });
        if (exist) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 304 });
        }

        // If password hashing is required, include the hashing here
        // const hashPassword = bcrypt.hashSync(newUser.password, 14);
        // newUser.password = hashPassword;
        const hashPassword = bcrypt.hashSync(newUser.password, 14);
        // Insert the new user into the collection
        await userCollection.insertOne({ ...newUser ,password: hashPassword});

        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error creating user:', error);  // Log the error for debugging
        return new Response(JSON.stringify({ message: 'Something went wrong', error: error.message }), { status: 500 });
    }
};
