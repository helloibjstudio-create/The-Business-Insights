"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MOCK_ARTICLES = [
  {
  id: 1,
      name: "Navigating the Opportunities and Challenges of Vogue Minerals in Africa",
      sector: "Mining",
      image_url:
        "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764575547/Mask_group_mpvsaf.png",
      description:
        "The surge in demand for vogue minerals, including lithium, graphite, and cobalt has captured the attention of investors and developers.",
      year: "2024",
      link: "/exclusive/1",
      country: "Africa",
  write_up: `
    <p><strong>Can you please give us an introduction to Miami Association of Realtors and its role in the real estate industry of Miami?</strong></p>

    <p>The Miami Association of Realtors is a prominent organization dedicated to serving real estate professionals in the Miami-Dade area. It plays a pivotal role in Miami’s real estate landscape by providing invaluable resources, support, and networking opportunities for real estate agents, brokers, and industry stakeholders. Through advocacy, education, and access to comprehensive market data, the association fosters professionalism, expertise, and ethical practices within Miami’s real estate community. Additionally, it serves as a bridge between professionals, policymakers, and the community, contributing significantly to the growth and development of the real estate sector in Miami.</p>

    <p><strong>What sets apart the Miami-Dade real estate market from the rest of South Florida?</strong></p>

    <p>In terms of single-family homes, the primary opportunity lies in non-FHA 5% financeable condos. We’re actively lobbying for better affordability in that market segment to ensure broader accessibility for the general public. I anticipate a significant upturn in that lower-end, nonfinanceable condo sector over the next few years.</p>

    <p>For individuals eyeing personal residences, especially those relocating from places like New York, South Florida presents compelling reasons to move. Over the last decade, property appreciation has been consistently strong. Coupled with low interest rates, this creates an excellent opportunity to find your dream home and settle there for the long term.</p>

    <p><strong>How do you assess the Miami-Dade market?</strong></p>

    <p>I find stability in the market from January to February 2020 less appealing. I thrive in markets with fluctuation because that’s where the significant opportunities and profits lie. Recently, in the multifamily sector, we witnessed diminished returns due to an influx of capital.</p>

    <p><strong>What do you anticipate as the aftermath of the COVID-19 pandemic?</strong></p>

    <p>Presently, due to the interest rates, there’s a tremendous window of opportunity for buyers. Despite the pandemic, potential buyers are making moves, and brokers report increased demand.</p>
  `,
},

  {
    id: 2,
      name: "Chile’s Copper Production and Advancements",
      sector: "Mining",
      image_url:
        "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764575803/Mask_group_t8asf2.png",
      description: "A deep dive into Chile’s advancements in copper production.",
      year: "2024",
      link: "/exclusive/2",
      country: "Chile",
    write_up: `<p>Could Copper Become the New Oil? The red metal has historically served as an indicator of the global economy, but in recent years, a combination of diminishing physical stock, projected supply deficits, and strong long-term demand has propelled copper prices to record highs.</p>
               <p>The decreasing trend in copper inventories at Comex, Shanghai, and LME warehouses since 2018 poses a threat to the supply. Although new production from upcoming projects like Teck Resources’ Quebrada Blanca 2 in Chile and Anglo American’s Quellaveco in Peru is expected to increase copper levels in 2023, a deficit is anticipated from 2025 onwards.</p>
               <p>What sets the current situation apart is the challenge faced by the industry in quickly bringing projects into production. Speaking at the 2022 World Copper Conference, Erik Heimlich, head of base metals supply at CRU, suggested that over $100 billion must be invested in new developments to address an estimated annual supply deficit of 4.7 million tonnes by 2030. However, the likelihood of achieving this, equivalent to building eight projects the size of BHP’s Escondida mine, seems doubtful at best.</p>
               <p>A report from Goldman Sachs on April 7th warned that the world is “sleepwalking towards a stockout,” signaling a significant shift in copper fundamentals. For the first time in a decade, copper stocks on exchanges declined in March instead of increasing during the metal’s usual surplus period. Considering copper’s essential role in the energy transition, the demand for copper is expected to rise. Ragnar Udd, BHP’s president of minerals Americas, stated that the world will require twice as much copper in the next 30 years as it has consumed in the previous 30 years. As the largest copper producer globally, Chile has a unique opportunity to leverage its resources for the benefit of its population and stakeholders involved in the copper value chain. However, seizing this opportunity requires substantial investment and streamlined development.</p>
               <p>Chile, which accounts for more than a quarter of global copper output, experienced a production decrease of over 7% in January and February 2022 compared to the same months in the previous year, according to the Chilean Copper Commission (Cochilco). Although production is expected to rise in 2023 with the full-year production of QB2, the lack of major near-term projects in Chile’s copper pipeline underscores the need for urgent action. Delays in investment decisions caused by ongoing discussions surrounding the new constitution contribute to the inertia.</p>
               <p>While there is ample capital available for ongoing investments, such as those by state-run Codelco, the world’s largest copper producer, the industry faces critical challenges. Codelco’s pre-tax profits reached $7.4 billion in 2021, with a total copper production of 1.728 million tonnes, including its stakes in Freeport’s El Abra and Anglo American’s Sur. Codelco’s current investments include the Rajo Inca expansion, extending the life of its Salvador operations until 2070. Antofagasta plc’s CEO, Iván Arriagada, discussed the Phase 1 expansion of the Los Pelambres project, set for completion in 2022. The expansion is designed to compensate for increasing ore hardness and is projected to increase annual copper production by an average of 60,000 tonnes over 15 years.</p>
               <p>Freeport McMoRan, the third-largest copper producer globally, is working on ramping up production at its El Abra mine in Chile to pre-pandemic levels, aiming for a production range of 200 million to 250 million pounds per year. The company is constructing a new leach pad and focusing on reverting to a 24/7 operating schedule.</p>
               <p>The demand for copper is increasing, and traditional means of production are no longer sufficient. Clayton Walker, Rio Tinto’s COO of copper, highlighted the opportunity for incremental production through reprocessing tailings deposits, which are estimated to contain around 100 million metric tons of copper globally. Amerigo Resources, through its Chilean subsidiary Minera Valle Central (MVC), has been capitalizing on this opportunity since 2003. By investing $300 million into the facility and doubling the capacity of its concentrator plant, Amerigo has increased its copper production from 25 million pounds per year to 63 million pounds in 2021. MVC works with Codelco’s El Teniente division to process fresh tailings and historical tailings deposits, extracting economic value from these environmental liabilities.</p>
               <p>Under the leadership of Aurora Davidson, Amerigo has focused on improving margins and addressing water supply issues. The company announced record revenue in February 2022, prompting speculation about the potential to replicate this business model at other mines in Chile. Large mining development projects in Chile, such as Teck Resources’ Quebrada Blanca Phase 2 (QB2) and Antofagasta’s INCO development, have broader significance beyond production figures. These projects create opportunities for suppliers and support thousands of families reliant on the mining industry. QB2, set to begin production in the second half of 2022, is a significant step in Teck’s copper growth strategy, aiming to double consolidated copper production by 2023.</p>
               <p>Capstone Copper’s Santo Domingo project is another notable development asset in Chile. Wheaton Precious Metals acquired a gold stream at Santo Domingo for $290 million, emphasizing the company’s commitment to maintaining strong relationships with its partners. The project’s scale and variety of metals make it an exciting prospect.</p>
               <p>Overall, the increasing demand for copper and the need for innovative production methods present opportunities for companies like Amerigo Resources, while large mining development projects contribute to Chile’s mining ecosystem and local communities.</p>
    `,
  },
  {
    id: 3,
      name: "Singapore’s Aerospace Industry Looks to Automation and Disruptive Technologies for Growth",
      sector: "Aerospace",
      image_url:
        "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764575899/CTA_cy8dov.png",
      description:
        "Automation and disruptive technologies are shaping the next generation.",
      year: "2024",
      link: "/exclusive/3",
      country: "Singapore",
    write_up: `<p>Singapore’s aerospace industry is facing challenges such as rising costs and labor shortages. To address these issues, the industry is turning to automation, Internet of Things (IoT), additive manufacturing, and other processes associated with Industry 4.0. While the industry has invested in training facilities to increase the number of skilled graduates, the demand for skilled labor is outpacing the country’s capacity to supply trained workers. In response, the Singapore Economic Development Board (EDB) and the Agency for Science, Technology and Research (A*STAR) are investing heavily in technology innovation processes. However, the feasibility and long-term effectiveness of these disruptive technologies remain uncertain.</p>
               <p>Implementing robotics and automation successfully in aerospace operations requires alignment between manufacturers and regulators. The transition into automation is gradually taking place, with companies like JET Aviation utilizing 3D scanning, engineering, and manufacturing processes for aircraft assembly. Skilled labor will be replaced by automation, but the industry is cautious about adopting Artificial Intelligence (AI) due to regulatory challenges. The payback and economic viability of automation in the aerospace aftermarket environment are also being questioned, particularly for small and medium-sized enterprises (SMEs).</p>
               <p>While automation may not be economically viable for all sectors of the aerospace industry, there are opportunities in the repair value stream. Companies like Accuron and Wah Son Engineering are seeking cost-efficiencies and addressing the shortage of skilled labor by adopting disruptive technologies such as additive manufacturing and robotic welding. Rolls-Royce, a key player in the industry, is implementing Industry 4.0 processes, including Big Data, IoT, and sensor technologies, to enhance their operations and offer predictive maintenance services.</p>
               <p>Rolls-Royce acknowledges the challenges of creating algorithms that integrate the entire value chain in the digital field. However, they believe that Industry 4.0 processes will add value to their operations in the future. The aerospace industry in Singapore is also exploring the use of Serious Game type technologies and AI systems for training and crisis management purposes. While certification and approvals may delay the implementation of interactive training materials in maintenance, repair, and overhaul (MRO) operations, companies like Lufthansa Systems are assisting clients with IT solutions and data analytics to optimize services.</p>
               <p>Accessing and analyzing large amounts of data collected by airlines can help improve services and offer personalized products to passengers. IoT sensors play a crucial role in collecting data on temperature, engine performance, and passenger preferences. Singapore’s focus on digitization and data usage in the airline-passenger relationship aims to differentiate the industry and stay ahead of competition. However, the rapid growth of emerging markets in the region puts pressure on Singapore to continue innovating and improving.</p>
               <p>Unmanned Aerial Vehicles (UAVs) are of interest to the Singapore aerospace industry, and collaborations between research institutions and companies are being explored. The Civil Aviation Authority of Singapore (CAAS) has signed an agreement with Airbus to experiment with delivery drones, demonstrating Singapore’s commitment to exploring new technologies. With significant investments and expertise, Singapore is well-positioned to lead the way in implementing new technologies to support the aerospace industry’s operations.</p>
               <p>Singapore’s aerospace industry recognizes the importance of embracing automation and disruptive technologies to address rising costs and labor shortages. While challenges and uncertainties exist, companies are exploring opportunities in automation, additive manufacturing, IoT, and data analytics. The industry’s focus on digital transformation, training simulations, and personalized services highlights the commitment to innovation and competitiveness. As Singapore continues to pioneer smart technologies and Big Data processes, the industry remains poised to shape the future of aerospace operations and maintain its position as a global leader.</p>
    `,
  },
  {
  id: "4",
    name: "India’s Pharma Industry: Navigating Beyond Pandemic Triumphs",
    sector: "Pharmaceuticals",
    image_url:
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764575978/CTA_k8o6ka.png",
    description:
      "In terms of single-family homes, the primary opportunity lies in non-FHA 5% financeable condos...",
    year: "2019",
    country: "USA",
    write_up: `<p>India’s pharmaceutical sector has risen to remarkable heights during the Covid-19 pandemic, ensuring a seamless supply of medicines and vaccines to over a billion people. The country, renowned as the ‘pharmacy of the world’, has long been a dominant force in the global pharmaceutical landscape, known for its extensive generics production and affordable medicines.
</p>
    <p>The pandemic acted as a catalyst, underscoring India’s crucial role in pharmaceuticals. As the world grappled with the unprecedented health crisis, India’s pharmaceutical industry stepped up to meet the increasing global demand for essential drugs, personal protective equipment, and most notably, COVID-19 vaccines.

</p>
<p>One of India’s key strengths lies in its robust and diversified pharmaceutical ecosystem, encompassing a vast network of drug manufacturers, contract research organizations, and a pool of skilled scientists and researchers. This infrastructure, combined with a proactive government approach, propelled the rapid development and distribution of vaccines.

</p>
<p>The country’s pharmaceutical prowess extends beyond domestic consumption; India remains a global supplier, exporting pharmaceuticals to over 200 countries. During the pandemic, this capability played a pivotal role in supporting numerous nations, especially lower-income countries, by providing them with affordable and accessible medical supplies.

</p>
<p>The Indian pharmaceutical industry’s response to the pandemic highlighted its adaptability and resilience. Despite initial disruptions due to lockdowns and supply chain challenges, the sector quickly pivoted to meet the evolving demands. This adaptability not only sustained the domestic supply but also contributed significantly to global efforts in combating the pandemic.

</p>
<p>Furthermore, India’s adeptness in research and development has positioned it as a crucial player in the global healthcare landscape. The sector’s continuous investments in innovation and technology, alongside a strong regulatory framework, have paved the way for the development of a spectrum of high-quality drugs and vaccines.

</p>
<p>Amidst the success, challenges persist. The sector faces ongoing pressures related to quality control, the need for increased R&D investment, and the push for greater digital integration in pharmaceutical operations. Moreover, the emergence of new variants and the unpredictability of the pandemic continue to test the industry’s agility and preparedness.

</p>
<p>As the world navigates through the pandemic’s phases, India’s pharmaceutical industry remains at the forefront, leveraging its expertise, infrastructure, and experience to chart the way forward. The lessons learned and the strides made during these testing times will undoubtedly shape the future trajectory of India’s pharmaceutical sector, reinforcing its pivotal role in global healthcare delivery.

</p>
<p>The pandemic may fade, but the legacy of India’s pharmaceutical industry’s response will endure as a testament to its resilience, innovation, and unwavering commitment to global health.

</p>
`,
  },
];


interface Interview {
  id: string;
  name: string;
  sector: string;
  image_url: string;
  description: string;
  year: string;
  link: string;
  country: string;
}

export default function TrendingArticles() {
  // const [articles, setArticles] = useState<Interview[]>([]);

  // useEffect(() => {
  //   fetch("api/trendingarticles")
  //     .then((res) => res.json())
  //     .then((data) => setArticles(data))
  //     .catch((err) => console.error("Error fetching:", err));
  // }, []);

  const featured = MOCK_ARTICLES[0];
  const others = MOCK_ARTICLES.slice(1, 4);

    const router = useRouter();
  

  return (
    <section className="w-full bg-[#0b0b0d] text-white py-20 px-6 lg:px-16 font-sans">
      <div className="max-w-[1400px] mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center  justify-between mb-14">
          <div>
            <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-semibold tracking-tight">
              Trending Articles
            </h2>
            <p className="text-gray-300 text-[clamp(1rem,2vw,1.2rem)] mt-1 mb-2">
              Explore our latest articles and insights.
            </p>
          </div>

          <Link href="/articles">
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-[#E8602E] hover:bg-white  text-white hover:text-[#E8602E]  w-fit px-6 py-3 rounded-xl font-medium flex items-center gap-4 space-y-2"
            >
              View All Articles →
            </motion.button>
          </Link>
        </div>

        {featured && (
          <>
            {/* FEATURED FULL-WIDTH MAIN CARD */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-transparent rounded-3xl overflow-hidden shadow-xl mb-10 p-0 flex flex-col lg:flex-row"
            >
              {/* IMAGE SECTION */}
              <div className="relative w-fit h-full rounded-2xl overflow-hidden">
                <Image
                  src={featured.image_url}
                  alt={featured.name}
                  width={620}
                  height={440}
                  className="object-cover"
                />

                {/* ARROW BUTTON ON IMAGE */}
                <button
                  onClick={() => router.push(`/trending/${MOCK_ARTICLES[0].id}`)}
                  className="absolute bottom-0 right-0 bg-[#E8602E] hover:bg-white text-white hover:text-[#E8602E] w-[54] h-[54] md:w-[84] md:h-[84] rounded-2xl lg:rounded-[24px] flex items-center justify-center text-2xl font-bold transition-all"
                >
                  →
                </button>
              </div>

              {/* TEXT SECTION */}
              <div className="p-2 lg:p-12 flex flex-col justify-center w-full lg:w-[45%]">
                <h3 className="text-[clamp(1.4rem,2.5vw,4rem)] font-semibold leading-tight">
                  {featured.name}
                </h3>

                <p className="text-gray-300 mt-4 text-[1.05rem] leading-relaxed line-clamp-5">
                  {featured.description}
                </p>
              </div>
            </motion.div>

            {/* SMALL ARTICLES UNDER THE FEATURED ONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full">
              {others.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-transparent relative rounded-3xl shadow-lg flex items-center gap-6 border border-white/3"
                >
                  {/* Thumbnail */}
                  <div className="relative w-fit h-full rounded-xl overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={187}
                      height={196}
                      className="object-cover "
                    />
                    <button
                    onClick={() => router.push(`/trending/${item.id}`)}
                      className="bg-[#E8602E] hover:bg-white absolute right-0 bottom-0 text-white hover:text-[#E8602E]  rounded-[12px] px-4 py-3 items-center transition-all"
                    >
                      →
                    </button>
                  </div>

                  {/* Title */}
                  <div className="mt-4">
                  <p className="text-[1rem] font-medium leading-tight line-clamp-4 lg:line-clamp-3 w-[120px] md:w-[106px] lg:w-[169px]  flex-grow">
                    {item.name}
                  </p>

                  {/* Arrow */}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
