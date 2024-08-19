import NavBar from "@/components/navbar/navbar";

export default function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
