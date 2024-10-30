import { getDefaultSignInView } from "@/utils/auth-helpers/settings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const preferredSignInView =
    (await cookies()).get("preferredSignInView")?.value || null;
  const defaultView = getDefaultSignInView(preferredSignInView);

  return redirect(`/signin/${defaultView}`);
}
