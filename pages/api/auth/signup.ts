import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, phone, city, password } = req.body;
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is invalid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is not strong enough",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessages: errors[0] });
    }

    // Check if email already exists
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Check if email already exists
    if (userWithEmail) {
      return res.status(400).json({ errorMessages: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        email,
        phone,
        city,
      },
    });

    res.status(200).json({ hello: user });
  }
}
