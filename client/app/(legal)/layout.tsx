export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#150A12] text-[#F8FAFC] font-sans">
      {children}
    </div>
  );
}
