/* eslint-disable eqeqeq */

/* eslint-disable node/prefer-global/process */
import { verifyToken } from '~/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // skip middleware on server
  if (process.server)
    return;

  console.debug('[check-token.global.js]', 'to', to);
  const isLogin = to.path == '/login';

  // Only check the token when route is not `/login`
  const ignorePaths = ['/login', '/questions'];
  if (!isLogin && !ignorePaths.includes(to.path)) {
    // BUG: removing the curly braces causes the verifyToken() to run
    await verifyToken()
      .catch(() => {
        console.error('[check-token.global.js]', 'error should be handled with catch now');
      });
  }

  // // In a real app you would probably not redirect every route to `/`
  // // however it is important to check `to.path` before redirecting or you
  // // might get an infinite redirect loop
});
