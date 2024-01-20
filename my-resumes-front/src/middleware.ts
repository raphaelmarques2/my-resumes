import { defineMiddleware, sequence } from "astro:middleware";
import { Backend } from "./services/backend";

const authMiddleware = defineMiddleware(async (context, next) => {
  context.request.headers;

  const token = context.cookies.get("token")?.value;
  context.locals.token = token;

  const isAuthenticated = Boolean(token);
  context.locals.isAuthenticated = isAuthenticated;

  console.log(
    `[auth] to(${context.url.pathname}) token(${token}) isAuth(${isAuthenticated})`
  );

  const protectedRoutes = [
    new RegExp("/resumes.*"),
    new RegExp("/update-password"),
  ];

  for (const route of protectedRoutes) {
    if (route.test(context.url.pathname)) {
      if (!isAuthenticated) {
        console.log(`[auth] redirecting "${context.url.pathname}" to "/login"`);

        return await context.redirect("/login");
      }
    }
  }

  if (isAuthenticated) {
    try {
      const backend = new Backend(token);
      const user = await backend.getUser();
      context.locals.user = user;
    } catch (error) {
      console.error(error);
      return await context.redirect("/");
    }
  }

  return await next();
});

export const onRequest = sequence(authMiddleware);
