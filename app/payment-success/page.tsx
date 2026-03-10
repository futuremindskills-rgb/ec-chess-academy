import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"
import Stripe from "stripe"

// Initialize without hardcoding the apiVersion string
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const prisma = new PrismaClient()

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    redirect("/tournaments")
  }

  // 1. Verify session with Stripe
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== "paid") {
    redirect("/tournaments")
  }

  const registrationId = session.metadata?.registrationId

  if (!registrationId) {
    redirect("/tournaments")
  }

  // 2. Fetch the registration and include the Tournament relation
  // We use "update" to ensure the status is COMPLETED and get the joined data
  const registration = await prisma.registration.update({
    where: { id: registrationId },
    data: {
      status: "COMPLETED",
      stripeSessionId: session.id,
    },
    include: {
      tournament: true, // This allows us to access the tournament table
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-600 p-6">
      <div className="bg-white p-12 rounded-3xl border-4 border-black text-center shadow-xl max-w-lg w-full">
        
        <h1 className="text-4xl font-black mb-2 text-black">
          Success! 🎉
        </h1>
        
        <div className="my-8">
          <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-1">
            Registered For
          </p>
          {/* Dynamically showing the title from your Tournament model */}
          <h2 className="text-3xl font-black text-indigo-600 leading-tight">
            {registration.tournament?.title}
          </h2>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border-2 border-black text-left mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 text-sm">Player</span>
            <span className="font-bold text-sm">{registration.playerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Category</span>
            <span className="font-bold text-sm">{registration.studentCategory}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-[10px] text-gray-400 font-mono break-all text-center">
              CONFIRMATION: {registration.id}
            </p>
          </div>
        </div>

        <a
          href="/tournaments"
          className="block w-full bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
        >
          Back to Tournaments
        </a>
      </div>
    </div>
  )
}