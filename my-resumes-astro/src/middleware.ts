import { defineMiddleware, sequence } from "astro:middleware";
import { backend } from "./services/backend";

const authMiddleware = defineMiddleware(async (context, next) => {
  const token = context.cookies.get("token")?.value;
  context.locals = { ...context.locals, token };

  const isAuthenticated = Boolean(token);
  context.locals = { ...context.locals, isAuthenticated };

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
    const user = await backend.getUser();
    context.locals = { ...context.locals, user };
  }

  return await next();
});

export const onRequest = sequence(authMiddleware);
