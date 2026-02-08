import { Trophy } from "lucide-react"
export default function SuccessPage({ searchParams }: { searchParams: { id: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-12 border-4 border-slate-900 rounded-[40px]">
        <Trophy size={64} className="mx-auto text-indigo-600 mb-6" />
        <h1 className="text-4xl font-[1000] uppercase">Checkmate!</h1>
        <p className="font-bold text-slate-500 mt-4">Your registration is confirmed. See you at the board!</p>
      </div>
    </div>
  )
}