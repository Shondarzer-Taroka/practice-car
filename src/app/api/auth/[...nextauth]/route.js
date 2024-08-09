import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

// export const authOptions={

// }


const handler = NextAuth({
    secret: '',
    session: {},
    providers: [
        CredentialsProvider({
            credentials: {
                username:'',
                password:''
            },

        })
    ],
    pages: [],
    callbacks: []
})


export { handler as GET, handler as POST }
