import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- 1. TypeScript Interfaces for Event Data ---

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

// --- 2. Mock API Endpoint Simulation ---

/**
 * Simulates an API call to fetch event data.
 * In a real Next.js application, this would be a fetch call to an API route (e.g., /api/events).
 * @returns A promise resolving to an array of Event objects.
 */
const fetchEvents = (): Promise<Event[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const mockEvents: Event[] = [
        {
          id: 1,
          title: "APLA Sustainability Meeting",
          description: "This upcoming meeting, organized by APLA, is set to feature a comprehensive agenda. It will encourage discussion on sustainable practices...",
          date: "3 Sep, 2025",
          location: "Santiago, Chile",
          imageUrl: "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764776468/CTA_dp51hi.png"
        },
        {
          id: 2,
          title: "World Petroleum Congress",
          description: "The 24th iteration of the World Petroleum Congress will serve as a vital link between the conventional energy sector and future innovations...",
          date: "17-21 Sep, 2025",
          location: "Calgary, Canada",
          imageUrl: "https://placehold.co/1000x800/505050/FFFFFF?text=Exhibition+Hall"
        },
        {
          id: 3,
          title: "Global Energy Summit 2025",
          description: "A forum for leaders to discuss policy and investment strategies driving the energy transition across the globe. Keynotes from industry experts...",
          date: "12 Oct, 2025",
          location: "Dubai, UAE",
          imageUrl: "https://placehold.co/1000x800/303030/FFFFFF?text=Leaders+Conference"
        },
        {
          id: 4,
          title: "Renewable Tech Expo",
          description: "Showcasing the latest in solar, wind, and geothermal technologies. Explore new products and connect with manufacturers and investors...",
          date: "5-7 Nov, 2025",
          location: "Berlin, Germany",
          imageUrl: "https://placehold.co/1000x800/606060/FFFFFF?text=Tech+Demonstration"
        },
      ];
      resolve(mockEvents);
    }, 500);
  });
};

// --- 3. Icon Components (Simulated lucide-react) ---

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

// --- 4. Event Card Component ---

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="relative flex-none w-full sm:w-80 md:w-96 lg:w-96 xl:w-1/3 min-h-[400px] bg-neutral-900 gap-12 rounded-xl overflow-hidden shadow-2xl mr-6 md:mr-8 transition duration-300 hover:shadow-orange-500/50">
      
      {/* Image Container with Custom Clip Path */}
      <div className="relative h-64 sm:h-72 w-full">
        {/* Placeholder Image (Use Next.js Image component in a real app) */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 rounded-xl rounded-b-none"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://placehold.co/1000x800/374151/FFFFFF?text=Image+Unavailable"; // Fallback placeholder
          }}
        />
        {/* The custom-shaped content div - mimicking the look */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm p-6 text-white flex items-end">
          <div className="w-full">
            <h3 className="text-xl font-bold mb-1 line-clamp-2">{event.title}</h3>
            <p className="text-sm text-neutral-300 line-clamp-3 mb-2">{event.description}</p>
            <div className="flex justify-between items-center mt-3">
                <div className="text-xs text-neutral-400">
                    <p className="font-semibold">{event.date}</p>
                    <p>{event.location}</p>
                </div>
                 {/* Orange Arrow Button */}
                <button
                    className="flex items-center justify-center w-10 h-10 bg-orange-600 hover:bg-orange-700 rounded-full transition duration-200 shadow-lg shadow-orange-500/50"
                    aria-label={`View details for ${event.title}`}
                    onClick={() => console.log('Navigate to event: ' + event.id)}
                >
                    <ChevronRight className="text-white w-5 h-5" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- 5. Main Component ---

export const UpcomingEventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollDistance = 400; // How far to scroll on click

  // Fetch data from the mock API on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]); // Set to empty on error
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Handler for scrolling
  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const current = scrollContainerRef.current;
      const scrollValue = direction === 'left' ? -scrollDistance : scrollDistance;
      // Use smooth scrolling behavior
      current.scrollBy({ left: scrollValue, behavior: 'smooth' });
    }
  }, [scrollDistance]);

  const EventCardMinimal: React.FC<{ event: Event }> = ({ event }) => {
    return (
      <div className="relative flex-none w-80 min-h-60 bg-neutral-900 rounded-xl overflow-hidden shadow-2xl transition duration-300 hover:shadow-orange-500/50">
        
        {/* Left Image Side */}
        <div className="absolute top-0 left-0 h-full w-2/5 rounded-l-xl overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/320x320/262626/FFFFFF?text=IMG"; // Fallback
            }}
          />
        </div>

        {/* Right Content Side */}
        <div className="pl-[40%] pr-4 py-6 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white line-clamp-2 mb-2">{event.title}</h3>
            <p className="text-sm text-neutral-400 line-clamp-3">{event.description}</p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-xs text-neutral-400">
                <p className="font-semibold">{event.date}</p>
                <p>{event.location}</p>
            </div>
            <button
                className="flex items-center justify-center w-10 h-10 bg-orange-600 hover:bg-orange-700 rounded-full transition duration-200 shadow-lg shadow-orange-500/50"
                aria-label={`View ${event.title}`}
                onClick={() => console.log('Navigate to event: ' + event.id)}
            >
                <ChevronRight className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // The main layout rendering
  return (
    <div className="bg-black min-h-screen py-16 px-4 sm:px-8 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Controls */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2">
              Upcoming Events
            </h1>
            <p className="text-lg text-neutral-400">
              Enjoy the best Events and Exhibitions
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition duration-200 shadow-md"
              aria-label="Previous events"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition duration-200 shadow-md shadow-orange-500/50"
              aria-label="Next events"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-white text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p>Loading events...</p>
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-white text-center py-20">
            <p className="text-xl text-red-500">No upcoming events found.</p>
          </div>
        )}

        {/* Event Cards Container - Horizontal Scroll */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-scroll pb-4 scrollbar-hide"
          style={{ 
            // Hide scrollbar but allow scrolling
            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none',  /* Firefox */
            // Custom CSS to hide scrollbar in WebKit (Chrome, Safari)
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          <style jsx global>{`
            /* Global style to hide scrollbar for WebKit */
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {events.map((event) => (
            // Using the minimal card for a clearer horizontal carousel look
            <div key={event.id} className="pr-6 flex-shrink-0">
              <EventCardMinimal event={event} />
            </div>
          ))}

          {/* Add padding/margin to the end of the scroll list */}
          <div className="w-8 flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsSection; // Default export for Next.js page/component