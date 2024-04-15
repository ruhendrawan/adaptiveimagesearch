// // pages/_middleware.js

// import { withSession } from '../lib/session';
// import Session from '../models/Session';

// async function handler(req) {
//     const userSession = req.session.get('user');

//     if (!userSession) {
//         const newSessionId = /* Generate session ID */;
//         const newSession = {
//             id: newSessionId,
//             payload: {}, // your payload here
//             lastActivity: Date.now(),
//             userAgent: req.headers['user-agent'],
//             ipAddress: req.ip
//         };

//         req.session.set('user', newSession);
//         await req.session.save();

//         await Session.create(newSession);
//     } else {
//         // Update last activity
//         await Session.update({
//             ...userSession,
//             lastActivity: Date.now()
//         }, {
//             where: {
//                 id: userSession.id
//             }
//         });
//     }

//     return NextResponse.next();
// }

// export const middleware = withSession(handler);
