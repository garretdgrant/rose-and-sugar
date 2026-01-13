"use client";
import { useState } from "react";
import ClassBookingModal from "./ClassBookingModal";
import Image from "next/image";
import { MapPin, Clock, Users } from "lucide-react";

interface ClassCalendarCardProps {
  month: string;
  day: string;
  title: string;
  description: string;
  price: string;
  address: string;
  time: string;
  imageUrl: string;
  seatsLeft: number;
}

const ClassCalendarCard = ({
  month,
  day,
  title,
  description,
  price,
  address,
  time,
  imageUrl,
  seatsLeft,
}: ClassCalendarCardProps) => {
  const classId = `${month}-${day}-${title}`.toLowerCase().replace(/\s+/g, "-");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const isLowSeats = seatsLeft > 0 && seatsLeft <= 3;
  const isSoldOut = seatsLeft === 0;

  return (
    <>
      <article
        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-bakery-pink-light"
        onClick={() => setIsBookingModalOpen(true)}
      >
        {/* Image container with overlay */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            quality={70}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Date badge - positioned on image */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-16">
              <div className="bg-bakery-pink-dark text-white text-center py-1 font-bebas text-sm tracking-widest uppercase">
                {month.slice(0, 3)}
              </div>
              <div className="bg-white text-center py-2">
                <span className="font-bebas text-3xl text-gray-900">{day}</span>
              </div>
            </div>
          </div>

          {/* Status badge */}
          {(isLowSeats || isSoldOut) && (
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-poppins font-medium shadow-lg ${
                  isSoldOut
                    ? "bg-gray-900 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isSoldOut ? "bg-gray-400" : "bg-white animate-pulse"}`}
                />
                {isSoldOut ? "Sold Out" : `${seatsLeft} spots left`}
              </span>
            </div>
          )}

          {/* Price tag on image */}
          <div className="absolute bottom-4 right-4 z-10">
            <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full font-poppins font-semibold text-bakery-pink-dark shadow-lg">
              {price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="font-bebas text-2xl text-gray-900 tracking-wide group-hover:text-bakery-pink-dark transition-colors duration-300">
            {title}
          </h3>

          {/* Meta info */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-bakery-pink" />
              <span className="text-sm font-poppins">{time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-bakery-pink" />
              <span className="text-sm font-poppins">{address}</span>
            </div>
            {!isSoldOut && seatsLeft > 0 && (
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4 text-bakery-pink" />
                <span className="text-sm font-poppins">
                  {seatsLeft} seats available
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600 text-sm font-poppins leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* CTA Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsBookingModalOpen(true);
            }}
            className={`mt-6 w-full py-3 px-6 rounded-full font-poppins font-medium text-sm transition-all duration-300 ${
              isSoldOut
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-bakery-pink-dark text-white hover:bg-bakery-pink-dark/90 shadow-md shadow-bakery-pink-dark/20 hover:shadow-lg hover:shadow-bakery-pink-dark/30 hover:-translate-y-0.5"
            }`}
          >
            {isSoldOut ? "Join Waitlist" : "Reserve Your Spot"}
          </button>
        </div>

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-bakery-pink-light via-bakery-pink to-bakery-pink-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </article>

      <ClassBookingModal
        open={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        title={title}
        month={month}
        day={day}
        description={description}
        price={price}
        classId={classId}
        isWaitlist={!seatsLeft}
      />
    </>
  );
};

export default ClassCalendarCard;
