import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/dbConnect"
import { getUserIdByToken } from "@/lib/auth"
import Event, { type IEvent } from "@/models/Event"
import Image from "next/image"
import Events from "@/assets/newassets/eplore (1).png"
import { EventCard } from "@/components/eventpageui/event-card"

export const runtime = "nodejs"

export default async function EventPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("sessionToken")?.value
  if (!token) {
    redirect("/signin")
  }

  await dbConnect()
  const userId = await getUserIdByToken(token)
  if (!userId) {
    redirect("/signin")
  }

  const approvedEvents = await Event.find({ status: "approved" }).lean<IEvent[]>()

  return (
    <div className="min-h-screen bg-[#f5f0e5]">
      {/* Decorative buildings silhouette at the top */}
      <div className="relative w-full h-12 overflow-hidden opacity-20 pointer-events-none">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23654321'%3E%3Cpath d='M0,40 L25,40 L25,20 L35,20 L35,10 L45,10 L45,20 L55,20 L55,40 L75,40 L75,25 L85,25 L85,15 L95,15 L95,25 L105,25 L105,40 L125,40 L125,15 L135,15 L135,5 L145,5 L145,15 L155,15 L155,40 L175,40 L175,20 L185,20 L185,10 L195,10 L195,20 L205,20 L205,40 L225,40 L225,25 L235,25 L235,15 L245,15 L245,25 L255,25 L255,40 L275,40 L275,15 L285,15 L285,5 L295,5 L295,15 L305,15 L305,40 L325,40 L325,20 L335,20 L335,10 L345,10 L345,20 L355,20 L355,40 L375,40 L375,25 L385,25 L385,15 L395,15 L395,25 L405,25 L405,40 L425,40 L425,15 L435,15 L435,5 L445,5 L445,15 L455,15 L455,40 L475,40 L475,20 L485,20 L485,10 L495,10 L495,20 L505,20 L505,40 L525,40 L525,25 L535,25 L535,15 L545,15 L545,25 L555,25 L555,40 L575,40 L575,15 L585,15 L585,5 L595,5 L595,15 L605,15 L605,40 L625,40 L625,20 L635,20 L635,10 L645,10 L645,20 L655,20 L655,40 L675,40 L675,25 L685,25 L685,15 L695,15 L695,25 L705,25 L705,40 L725,40 L725,15 L735,15 L735,5 L745,5 L745,15 L755,15 L755,40 L775,40 L775,20 L785,20 L785,10 L795,10 L795,20 L805,20 L805,40 L825,40 L825,25 L835,25 L835,15 L845,15 L845,25 L855,25 L855,40 L875,40 L875,15 L885,15 L885,5 L895,5 L895,15 L905,15 L905,40 L925,40 L925,20 L935,20 L935,10 L945,10 L945,20 L955,20 L955,40 L975,40 L975,25 L985,25 L985,15 L995,15 L995,25 L1000,25 L1000,40 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "1000px 40px",
          }}
        ></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner with overlay and text */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg border border-[#e6d7c3]">
          <Image
            src={Events || "/placeholder.svg"}
            alt="Events Banner"
            fill
            quality={100}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#654321]/70 to-transparent flex items-center">
            <div className="p-8 md:p-12 max-w-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e5] mb-4 drop-shadow-md">
                Discover Cavite's Events
              </h1>
              <p className="text-[#f5f0e5]/90 text-lg md:text-xl drop-shadow-md">
                Explore cultural celebrations, historical commemorations, and community gatherings
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#654321]">Upcoming Events</h2>
            <div className="ml-4 h-1 flex-grow bg-gradient-to-r from-[#8B4513]/50 to-transparent rounded-full"></div>
          </div>

          {approvedEvents.length === 0 ? (
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 text-center border border-[#e6d7c3] shadow-inner">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e6d7c3] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#8B4513]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-[#654321] text-lg font-medium">No approved events available at the moment.</p>
              <p className="text-[#8B4513]/70 mt-2">Check back later for new events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedEvents.map((ev) => (
                <EventCard key={ev._id.toString()} event={ev} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Decorative buildings silhouette at the bottom */}
      <div className="relative w-full h-12 overflow-hidden opacity-20 pointer-events-none">
        <div
          className="w-full h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 40' fill='%23654321'%3E%3Cpath d='M0,0 L25,0 L25,20 L35,20 L35,30 L45,30 L45,20 L55,20 L55,0 L75,0 L75,15 L85,15 L85,25 L95,25 L95,15 L105,15 L105,0 L125,0 L125,25 L135,25 L135,35 L145,35 L145,25 L155,25 L155,0 L175,0 L175,20 L185,20 L185,30 L195,30 L195,20 L205,20 L205,0 L225,0 L225,15 L235,15 L235,25 L245,25 L245,15 L255,15 L255,0 L275,0 L275,25 L285,25 L285,35 L295,35 L295,25 L305,25 L305,0 L325,0 L325,20 L335,20 L335,30 L345,30 L345,20 L355,20 L355,0 L375,0 L375,15 L385,15 L385,25 L395,25 L395,15 L405,15 L405,0 L425,0 L425,25 L435,25 L435,35 L445,35 L445,25 L455,25 L455,0 L475,0 L475,20 L485,20 L485,30 L495,30 L495,20 L505,20 L505,0 L525,0 L525,15 L535,15 L535,25 L545,25 L545,15 L555,15 L555,0 L575,0 L575,25 L585,25 L585,35 L595,35 L595,25 L605,25 L605,0 L625,0 L625,20 L635,20 L635,30 L645,30 L645,20 L655,20 L655,0 L675,0 L675,15 L685,15 L685,25 L695,25 L695,15 L705,15 L705,0 L725,0 L725,25 L735,25 L735,35 L745,35 L745,25 L755,25 L755,0 L775,0 L775,20 L785,20 L785,30 L795,30 L795,20 L805,20 L805,0 L825,0 L825,15 L835,15 L835,25 L845,25 L845,15 L855,15 L855,0 L875,0 L875,25 L885,25 L885,35 L895,35 L895,25 L905,25 L905,0 L925,0 L925,20 L935,20 L935,30 L945,30 L945,20 L955,20 L955,0 L975,0 L975,15 L985,15 L985,25 L995,25 L995,15 L1000,15 L1000,0 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "1000px 40px",
            transform: "rotate(180deg)",
          }}
        ></div>
      </div>
    </div>
  )
}

