"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProfileCardProps {
  imageSrc: string;
  country: string;
  year: string;
  title: string;
  name: string;
  category: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  imageSrc,
  country,
  year,
  title,
  name,
  category,
}) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden bg-black text-white border border-gray-700 shadow-lg hover:shadow-orange-500/20 transition-shadow duration-500">
      {/* Image */}
      <div className="relative w-full h-64">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-2 left-2 bg-gray-900/80 text-xs text-white px-3 py-1 rounded-full">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{country}</span>
          <span>•</span>
          <span>{year}</span>
        </div>

        <h2 className="text-lg font-semibold leading-snug">
          {title} <span className="block font-normal">{name}</span>
        </h2>

        <a
          href="#"
          className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium transition"
        >
          Read More <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
