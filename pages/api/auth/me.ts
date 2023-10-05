import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the JWT token from the request headers
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];

  // Decode the JWT token
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).json({ errorMessages: "Unauthorized request" });
  }

  // Find the user in the database
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  if (!user) {
    return res.status(401).json({
      errorMessage: "User not found",
    });
  }

  // Return the user
  return res.json({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    city: user.city,
  });
}
