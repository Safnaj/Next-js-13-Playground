import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToekn = req.headers["authorization"] as string;

  if (!bearerToekn) {
    return res.status(401).json({ errorMessages: "Unauthorized request" });
  }

  const token = bearerToekn.split(" ")[1];

  if (!token) {
    return res.status(401).json({ errorMessages: "Unauthorized request" });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // Verify the JWT token
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return res.status(401).json({ errorMessages: "Unauthorized request" });
  }

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
