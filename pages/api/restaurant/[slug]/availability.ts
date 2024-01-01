import { PrismaClient } from "@prisma/client";
import { table } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    res.status(400).json({ errorMessage: "Missing query parameters" });
  }

  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    res.status(400).json({ errorMessage: "Invalid time" });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes?.[0]}`),
        lte: new Date(`${day}T${searchTimes?.[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

  // Create an object with all the tables that are already booked
  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    res.status(404).json({ errorMessage: "Restaurant not found" });
  }

  const tables = restaurant?.tables;

  const searchTimesWithTables = searchTimes?.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  // Filter out tables that are already booked
  searchTimesWithTables?.forEach((t) => {
    t.tables = t.tables?.filter((table) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) {
          return false;
        }
        return true;
      }
    });
  });

  // Filter out times that don't have enough tables
  const availabilities = searchTimesWithTables
    ?.map((t) => {
      const sumSeats = t.tables?.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);

      return {
        time: t.time,
        available: sumSeats ? sumSeats >= parseInt(partySize) : false,
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant?.open_time}`);

      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant?.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  return res.json(availabilities);
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-02-03&time=15:00:00.000Z&partySize=8
