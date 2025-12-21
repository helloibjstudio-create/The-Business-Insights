import Image from "next/image";
import { dhl, thirdOrange } from "@/public";

const Dhl = () => {
  return (
    <div>
      <a href="https://www.dhl.com/us-en/home/innovation-in-logistics/innovation-center-middle-east-and-africa.html">
        <div
          key="dhl-banner"
          className="relative w-full min-h-[50vh] sm:h-[70vh] md:h-screen mb-20 md:mb-0"
        >
          <Image
            src={thirdOrange}
            alt="Background"
            fill
            className="absolute inset-0 object-contain lg:object-cover h-full w-full"
          />
          <Image
            src={dhl}
            alt="DHL Banner"
            width={1280}
            height={333}
            className="z-10 absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain w-[90%] sm:w-[80%] lg:w-[90%]"
          />
        </div>
      </a>
    </div>
  );
};

export default Dhl;
