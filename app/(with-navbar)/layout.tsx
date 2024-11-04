import NavBar from "@/components/navbar/navbar";
import AuthGuard from "@/guards/AuthGuard";

export default function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <AuthGuard>
        <div className="layout">
          {children}
        </div>
      </AuthGuard>
    </>
  );
}
