import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'


const handler = NextAuth({
    secret:process.env.NEXT_PUBLIC_SECRET,
    session: {
        strategy:'jwt',
        maxAge:30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {}
            },
            async authorize( credentials) {
                let { email, password } = credentials
                if (!email || !password) {
                    return null

                }

                let db = await connectDB()
                let userCollection =  db.collection('practice-users')
                let currentUser = await userCollection.findOne({ email})

                if (!currentUser) {
                    return null
                }
                let passwordMatch=bcrypt.compareSync(password, currentUser.password); 
                if (!passwordMatch) {
                    return null
                }

                return currentUser
            }
        })
     
    ],
   
    callbacks: {
        async signIn({ user, account}) {
            if (account.provider=='google' || account.provider=='github') {
                let {email,password,image}=user
                try {
                    let db= await connectDB()
                    let userCollection =await db.collection('practice-users')
                    let existUser= await userCollection.findOne({email})
                    if (!existUser) {
                        let res=await userCollection.insertOne(user)
                        return user
                    }else{
                        return user
                    }
                } catch (error) {
                    console.log(error);
                    
                }
            }else{
                return user
            }
          },

    },

    pages: {
        signIn: '/login',
    },
   
})


export { handler as GET, handler as POST }
