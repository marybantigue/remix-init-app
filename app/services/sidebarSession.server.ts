// sidebarSession.server.ts
import { getSession, commitSession } from "~/services/session.server"; // or createCookieSessionStorage

export async function toggleSidebarState(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const currentIsOpen = formData.get("isOpen") === "true";

  session.set("isOpen", currentIsOpen);

  return {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  };
}
