import { defineMiddleware, sequence } from "astro:middleware";
import { Backend } from "./services/backend";

const authMiddleware = defineMiddleware(async (context, next) => {
  const token = context.cookies.get("token")?.value;
  context.locals.token = token;

  const isAuthenticated = Boolean(token);
  context.locals.isAuthenticated = isAuthenticated;

  const protectedRoutes = [new RegExp("/resumes.*")];

  for (const route of protectedRoutes) {
    if (route.test(context.url.pathname)) {
      if (!isAuthenticated) {
        console.log(
          `[authMiddleware] redirecting "${context.url.pathname}" to "/login"`
        );

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
