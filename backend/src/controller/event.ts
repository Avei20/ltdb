import { Prisma, PrismaClient, TipeEvent } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient()

class Event {
    id:number
    type : TipeEvent 
    target : string
    targetId: number
    userId: number
    time:string 

    constructor(id:number, type : TipeEvent, target : string, targetId: number, userId: number, time: Date ) {
        this.id = id, 
        this.type = type, 
        this.target = target, 
        this.targetId = targetId,
        this.userId = userId,
        this.time = time.toLocaleString()
    }
}

export const getEvent = async (req : Request, res : Response) => 
{
    const event = await prisma.event.findMany()
    console.log(event.length)
    let len = event.length

    let data : Array<Event> = []

    for (let i = 0; i < len ; i++) {
        let e = new Event(event[i].id, event[i].type, event[i].target, event[i].targetId, event[i].userId, event[i].time)
        data.push(e)
    }
    res.send({data})
}