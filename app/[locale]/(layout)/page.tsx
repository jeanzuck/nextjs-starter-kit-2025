/* eslint-disable @typescript-eslint/no-unused-vars */
import { ImageOptimize } from "@/components/image-optimize"
import { Button } from "@/components/ui/button"
import { getAppData } from "@/server/query/app-data"
import app from "next/app"
import Image from "next/image"

export default async function Home() {
  const appData = await getAppData()
  const appData2 = await getAppData()

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Made With Tools We Love ❤️</h1>
        <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
          {appData.map((logo) => (
            <div
              key={logo.name}
              className="group flex aspect-square items-center justify-center rounded-lg bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <ImageOptimize
                fetchSrc={`/${logo.logoImage}`}
                fetchWidth={640}
                srcSet={{
                  minWidth: 160,
                  maxWidth: 640
                }}
                alt={`${logo.name} logo`}
                className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// import { ImageOptimize } from "@/components/image-optimize"
// import { cachedGetAppData } from "@/server/query/app-data"

// export default async function Home() {
//   const appData = await cachedGetAppData()
//   return (
//     <div className="bg-white py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <h2 className="text-center text-lg/8 font-semibold text-gray-900">Nextjs Template 2025</h2>
//         <div className="mx-auto mt-10 flex max-w-lg items-center justify-center gap-10">
//           {appData.map((app) => (
//             <ImageOptimize
//               key={app.name}
//               fetchSrc={`/${app.logoImage}`}
//               fetchWidth={320}
//               alt={`${app.name} logo`}
//               className="w-48"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
