
import NextAuth, { AuthError } from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "./db/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    signIn: async({user, account}) =>{
      if(account?.provider === "google"){
        try{
          const {email, name, image, id} = user
          const alreadyUser = await prisma.user.findUnique({where: {email: email as string}})
          if(!alreadyUser) {
            await prisma.user.create({
              data: {
                  name,
                  email: email as string,
                  image,
                  id: id as string
              }
          })
          }
          return true
        } catch (error){
          throw new AuthError("Error While creating user")
        }
      }
      return false
    }
  }
})