export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full">
      <main>{children}</main>
    </div>
  );
}
