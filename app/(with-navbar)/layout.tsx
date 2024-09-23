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
        <div style={{ marginTop: '73px' }}>
          {children}
        </div>
      </AuthGuard>
    </>
  );
}
