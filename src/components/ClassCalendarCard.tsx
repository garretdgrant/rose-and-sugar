"use client";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import ClassBookingModal from "./ClassBookingModal";

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

  return (
    <>
      <Card
        className="h-full flex flex-col border-bakery-pink/20 bg-white/90 hover:bg-white hover:border-bakery-pink/40 transition-all duration-300 hover:translate-y-[-5px] cursor-pointer overflow-hidden"
        onClick={() => setIsBookingModalOpen(true)}
      >
        {/* Card Image - New addition */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <CardContent className="p-6 flex flex-col flex-grow">
          {/* Calendar Icon - Now inside the card */}
          <div className="mx-auto mb-6 -mt-10 relative z-10">
            <div className="relative w-24 aspect-square rounded-lg overflow-hidden shadow-md bg-white">
              <div className="absolute inset-0 flex flex-col">
                {/* Month Header */}
                <div className="bg-bakery-pink text-white text-center py-1 font-bebas text-lg tracking-wider">
                  {month}
                </div>

                {/* Day Number */}
                <div className="bg-white flex-grow flex items-center justify-center">
                  <span className="font-bebas text-4xl text-gray-800">
                    {day}
                  </span>
                </div>

                {/* Calendar Ring Holes */}
                <div className="absolute top-0 left-0 right-0 flex justify-center space-x-4 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-bakery-pink-dark opacity-80"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Class Information */}
          <h3 className="font-bebas text-xl text-center mb-2 text-bakery-pink-dark">
            {title}
          </h3>
          <p className="text-gray-600 text-center mb-4 flex-grow">
            Where: {address}
          </p>
          <p className="text-gray-600 text-center mb-4 flex-grow">
            When: {time}
          </p>
          <p className="text-gray-600 text-center mb-4 flex-grow">
            {description}
          </p>

          <p className="text-gray-600 text-center mb-4 flex-grow">
            Seats Remaining: {seatsLeft}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="font-medium text-gray-700">{price}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsBookingModalOpen(true);
              }}
              className="bg-bakery-pink/90 hover:bg-bakery-pink text-white py-1 px-4 rounded-full text-sm transition-colors"
            >
              {seatsLeft ? "Book Now" : "Join Waitlist"}
            </button>
          </div>
        </CardContent>
      </Card>

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
