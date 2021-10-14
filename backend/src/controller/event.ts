import { Prisma, PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { TIMEZONE } from "../constant";

const prisma = new PrismaClient()

function convertTZ(date: Date, tzString : string) 
{
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString})); 
}

export const getEvent = async (req : Request, res : Response) => 
{
    const event = await prisma.event.findMany()
    
    const testing = event[9]
    let newTime = convertTZ(testing.time, TIMEZONE)
    testing.time = newTime
    console.log(newTime)
    console.log(testing)
}