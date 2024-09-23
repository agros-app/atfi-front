import NavBar from "@/components/navbar/navbar";

export default function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
        <div style={{ marginTop: '73px' }}>
            {children}
        </div>
    </>
  );
}
