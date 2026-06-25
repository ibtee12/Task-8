import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = { title: "Register — Inkwell" };

export default function RegisterPage() {
  return (
    <AuthShell
      highlights={[
        "Create a free account in seconds",
        "Borrow up to 5 books at a time",
        "Track everything from your profile",
      ]}
    >
      <RegisterForm />
    </AuthShell>
  );
}
