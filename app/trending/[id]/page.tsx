"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { use } from "react";

const MOCK_ARTICLES = [
  {
  id: "1",
  name: "Navigating the Opportunities and Challenges of Vogue Minerals in Africa",
  sector: "Real Estate",
  image_url:
    "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764958226/Navigating-the-Opportunities-and-Challenges-of-Vogue-Minerals-in-Africa-min_vz8zuk.jpg",
  description:
    "In terms of single-family homes, the primary opportunity lies in non-FHA 5% financeable condos...",
  year: "2024",
  country: "USA",
  write_up: `
  <p>The surge in demand for vogue minerals, including lithium, graphite, cobalt, and vanadium, driven by the rapid development of battery technology, has captivated the attention of investors and developers. However, capitalizing on these opportunities requires a strategic understanding of market uncertainties and a strong technical focus to mitigate potential risks.</p>
  <p>Vogue minerals refer to commodities that are not bound by the traditional mineral cycle but instead thrive on new demand patterns arising from technological advancements and applications. Currently, the increasing demand for energy storage in large-scale batteries, used in various sectors like electric vehicles and renewable energy, has propelled the consumption of these minerals.</p>
  <p>While vogue minerals are extracted worldwide, Africa stands out as a significant current source and a promising region for new prospects. SRK Consulting, through its involvement in exploration strategy, design, execution, and technical assessments, has recognized Africa’s potential in these minerals. Lithium deposits can be found in evaporite and pegmatite formations across South Africa, Namibia, Zimbabwe, Mozambique, Mali, and the Rift Valley in Kenya and Tanzania. SRK’s work on lithium projects in the Democratic Republic of Congo suggests favorable exploration opportunities and the potential to define resources and reserves, similar to Australian deposits.</p>
  <p>The Central African Copper Belt, particularly the Democratic Republic of Congo, holds extensive reserves of cobalt, with additional production coming from South Africa and Madagascar. Graphite, found in metamorphic sedimentary rocks, is abundant in over 50 deposits across Africa, with significant accumulations reported in Mozambique, Tanzania, Malawi, Madagascar, Ghana, Ethiopia, and Namibia. SRK has contributed to several graphite projects in Africa, providing financing reviews, independent reporting, and project development advice. Africa’s vanadium resources, crucial for storing renewable energy, are mainly found in magmatic layered intrusions like the Bushveld Complex in South Africa and the Tete Complex in Mozambique. Karst deposits in countries such as Namibia, Angola, and the Republic of Congo also hold high-grade vanadate deposits.</p>
  <p>The allure of being a first mover in these minerals is a powerful motivator, but it comes with inherent risks. Market demand for vogue minerals is less predictable than for globally traded commodities, and technological innovation constantly disrupts demand and pricing forecasts. As breakthroughs emerge, the amounts of minerals required in batteries can change rapidly. This uncertainty can lead to market imbalances, impacting prices and jeopardizing new and existing projects. The recent expansion ramp-up delays faced by a leading Chilean lithium producer serve as a prime example.</p>
  <p>To navigate these challenges, project studies, planning, and design must be approached with agility. Flexibility becomes paramount in optimizing the net present value of a project and ensuring commercial sustainability. Low-cost operations and efficient technical studies are prioritized, but flexibility should not be compromised. The design must allow for operational adjustments during market fluctuations. Surface mining methods may be preferable over underground operations, and hydro-metallurgical processes might offer more flexibility than smelting technologies. Modular plant arrangements can provide operational flexibility in managing market-based financial risks. In addition to operational flexibility, marketing strategies should be carefully considered. Producers can seek downstream investment or joint venture agreements with end-users such as refinery builders and battery suppliers. This vertical integration approach tailors the mine plan and design to suit the end-user’s needs, simplifying ore reserve reporting. Collaborating in research and development is also valuable, as it fosters win-win relationships and strengthens the project’s sustainability. Trade agreements and long-term off-take agreements with battery manufacturers enhance technical risk mitigation and project viability.</p>
  <p>SRK acknowledges the importance of assessing a wide range of options to achieve optimal project economics and decision-making. This approach becomes even more critical when dealing with the opportunities and challenges presented by vogue minerals in Africa.</p>
  `,
},

  {
    id: "2",
    name: "Chile’s Copper Production and Advancements",
    sector: "Mining",
    image_url:
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764580251/77438542680a0e7d0d0dbfc0bfe6c5e9e2d99db9_kogovb.png",
    description:
      "In terms of single-family homes, the primary opportunity lies in non-FHA 5% financeable condos...",
    year: "2023",
    country: "USA",
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
    id: "3",
    name: "Singapore’s Aerospace Industry Looks to Automation and Disruptive Technologies for Growth",
    sector: "Mining",
    image_url:
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764580293/ca49de05ec6e0b70fea7e585a6725f5416b62d47_s6nsvu.png",
    description:
      "In terms of single-family homes, the primary opportunity lies in non-FHA 5% financeable condos...",
    year: "2019",
    country: "USA",
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
      "https://res.cloudinary.com/dnzntr9lt/image/upload/v1764959103/Indias-Pharma-Industry-min_x6dela.jpg",
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

export default function InterviewPage({ params }: { params: Promise<{ id: string }> }) {
  // ⬅️ USE IT LIKE THIS
  const { id } = use(params);

  const article = MOCK_ARTICLES.find(i => i.id === id);

  if (!article) {
    return <div className="text-white p-20">Interview not found.</div>;
  }

  return (
    <section className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">

        <Link
          href="/"
          className="flex items-center text-orange-400 cursor-pointer mb-10 hover:text-orange-500 transition"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to homepage
        </Link>

            <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
              <Image
                src={article.image_url}
                alt={article.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>
        <div className="flex flex-col-reverse lg:flex-row gap-10 backdrop-blur-2xl bg-white/5 p-6 rounded-xl border border-white/10">

          <div className="w-full">
            <h1 className="text-3xl font-semibold mb-6">
              {article.name}
            </h1>

            

            <div
            className="prose prose-invert space-y-4"
              dangerouslySetInnerHTML={{
                __html: article.write_up,
              }}
            />
          </div>

          <div className="w-full lg:w-[400px]">
            <div className="text-end mb-4">
              <p className="text-sm opacity-80">{article.year}</p>
              <p className="text-sm opacity-80">{article.sector}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
