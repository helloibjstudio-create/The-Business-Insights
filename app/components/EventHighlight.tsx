import React from "react";
import Image from "next/image";

// Local static data API inside the component
const events = [
  {
    id: 1,
    title: "APLA Sustainability Meeting",
    description:
      "This upcoming meeting, organized by APLA, is set to feature a comprehensive agenda. It will enc...",
    date: "3 Sep. 2023",
    location: "Santiago, Chile",
    image:
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764776468/CTA_dp51hi.png",
  },
  {
    id: 2,
    title: "World Petroleum Congress",
    description:
      "The 24th iteration of the World Petroleum Congress will serve as a vital link between the conventiona...",
    // Replaced en dash (–) with regular hyphen (-) to avoid parsing issues
    date: "17-21 Sep. 2023",
    location: "Calgary, Canada",
    image:
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764776467/CTA-1_zsi8yd.png",
  },
  {
    id: 3,
    title: "Chemical Business Expo",
    description:
      "A convention connecting leaders in the global chemical industry. It will enc...",
    date: "10 Oct. 2023",
    location: "São Paulo, Brazil",
    image:
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764776467/CTA-4_wyj4f8.png",
  },
];

const UpcomingEvents: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-16 px-6 md:px-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-semibold mb-2">
            Upcoming Events
          </h2>
          <p className="text-gray-300">Enjoy the best Events and Exhibitions</p>
        </div>

        {/* Top-right navigation buttons */}
        <div className="flex gap-4">
          <button className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center ">
            ←
          </button>
          <button className="w-12 h-12 rounded-xl bg-[#F57328] flex items-center justify-center ">
            →
          </button>
        </div>
      </div>

      {/* Event cards row */}
      <div className="flex gap-10 overflow-x-auto hide-scrollbar pb-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="min-w-[580px] items-center bg-black rounded-2xl flex gap-4"
          >
            {/* Image */}
            <div className="relative w-[286px] h-[206px] rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />

              <button className="absolute bottom-0 right-0 bg-[#E8602E] hover:bg-white text-white hover:text-[#E8602E] px-5 py-3 rounded-xl lg:rounded-2xl flex items-center justify-center text-2xl font-bold transition-all">
                →
              </button>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-400 text-sm">{event.description}</p>
              <p className="text-gray-300 text-sm">
                {event.date} <span className="text-orange-600">|</span>{" "}
                {event.location}
              </p>
            </div>

            {/* Arrow button below card */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
