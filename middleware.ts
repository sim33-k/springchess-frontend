import {asgardeoMiddleware, createRouteMatcher} from '@asgardeo/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/game',
  '/game/(.*)',
  '/dashboard',
  '/profile',
]);

export default asgardeoMiddleware(async (asgardeo, req) => {
  if (isProtectedRoute(req)) {
    const protectionResult = await asgardeo.protectRoute();
    if (protectionResult) {
      return protectionResult;
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
