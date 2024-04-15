// import { useEffect, type ReactNode } from "react";
// import { cookies } from 'next/headers'
// import { encode } from 'next-auth/jwt'

// import { defaultCookies } from '../node_modules/next-auth/core/lib/cookie'

// async function getOrCreateUserId() {
//     const session = await getServerSession(authOptions)
//     if (session) {
//         return session.user.id
//     } else {
//         const id = "1"
//         // await insert('users', {})

//         const token = await encode({
//             token: { sub: id },
//             secret: process.env.AUTH_SECRET,
//         })

//         const secure = process.env.NODE_ENV === 'production'
//         const { name, options } = defaultCookies(secure).sessionToken
//         cookies().set(name, token, options)

//         return id
//     }
// }


// export default function GuestSessionProvider({
//     children,
// }: {
//     children: ReactNode;
// }) {
//     const { sessionId, setSessionId } = useEffect();
//     useEffect(() => {
//         if (status === "unauthenticated") {
//             // login as anonymous
//             signIn("credentials", {})
//                 .then(async () => {
//                     await update();
//                     /* do nothing */
//                     console.info("Logged in as anonymous");
//                 })
//                 .catch((error) => {
//                     console.error("Failed to login as anonymous", error);
//                 });
//         }
//     }, [status]);
//     return <>{children}</>;
// }