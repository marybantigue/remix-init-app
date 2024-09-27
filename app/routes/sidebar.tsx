// routes/sidebar.tsx (or another route)
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node"; // To return JSON
import { toggleSidebarState } from "~/services/sidebarSession.server"; // Adjust path as needed

export const action: ActionFunction = async ({ request }) => {
  const response = await toggleSidebarState(request);

  // Return JSON response with session headers
  return json({ success: true }, { headers: response.headers });
};
