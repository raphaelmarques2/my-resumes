declare namespace App {
  interface Locals {
    token?: string;
    isAuthenticated?: boolean;
    user?: { id: string; name: string; email: string };
  }
}
