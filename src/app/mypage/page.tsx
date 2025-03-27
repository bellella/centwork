import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Your email: {session.user?.email}</p>
    </div>
  );
}
