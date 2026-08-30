export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#031428] text-[#F5F8FA] font-sans">
      {children}
    </div>
  );
}
