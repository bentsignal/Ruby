"use client";

// import { useConvexAuth } from "convex/react";

// import { Button } from "@acme/ui/button";

// import { Login } from "~/components/login";
// import { authClient } from "~/lib/auth-client";
// import { CreatePostForm, PostList } from "../components/posts";

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      stay tuned...
    </div>
  );
}

// export default function HomePage() {
//   const { isAuthenticated } = useConvexAuth();
//   if (!isAuthenticated) {
//     return (
//       <div className="bg-background h-screen w-screen">
//         <div className="flex h-full w-full flex-col items-center justify-center gap-4">
//           <Login />
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="bg-background h-screen w-screen">
//       <div className="flex h-full w-full flex-col items-center justify-center gap-4">
//         <Button onClick={() => authClient.signOut()}>Sign Out</Button>
//         <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//           Create <span className="text-primary">T3</span> Turbo
//         </h1>
//         <CreatePostForm />
//         <PostList />
//       </div>
//     </div>
//   );
// }
