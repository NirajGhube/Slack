import {SignedIn, SignedOut, SignInButton, useAuth, UserButton} from "@clerk/clerk-react";
import {Route, Routes,Navigate} from "react-router";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import {useEffect, useState} from "react";
import * as Sentry from "@sentry/react";
import CallPage from "./pages/CallPage.jsx";


const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = ()=>{
    const {isSignedIn,isLoaded} = useAuth()

    if(!isLoaded) return null;

    return (

         <>
             <SentryRoutes>
                     <Route path="/" element={isSignedIn ?<HomePage/> :<Navigate to={"/auth"} replace/>}/>
                     <Route path="/auth" element={!isSignedIn ? <AuthPage/>: <Navigate to={"/"} replace/> }/>

                 <Route path="/call/:id" element={isSignedIn ?<CallPage/> :<Navigate to={"/auth"} replace/>}/>


                 <Route path="*" element={isSignedIn ?<Navigate to={"/"} replace/> :<Navigate to={"/auth"} replace/>}/>
             </SentryRoutes>

         </>


    )
}
export default App;

// return (
//     <header>
//         <>
//
//             <SignedIn>
//                 <SentryRoutes>
//                     <Route path="/" element={<HomePage/>}/>
//                     <Route path="/auth" element={<Navigate to={"/"} replace/>}/>
//
//                 </SentryRoutes>
//             </SignedIn>
//             <SignedOut>
//                 <SentryRoutes>
//                     <Route path="/auth" element={<AuthPage/>}/>
//                     <Route path="*" element={<Navigate to={"/auth"} replace/>}/>
//                 </SentryRoutes>
//             </SignedOut>
//         </>
//
//     </header>
// )
// }