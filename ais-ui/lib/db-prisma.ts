import { Prisma, PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

export type SpaceWithAll = Prisma.SpaceGetPayload<{
	include: { SpaceSearch: true; SpaceCollection: true }
}>

export type SpaceWithSearch = Prisma.SpaceGetPayload<{
	include: { SpaceSearch: true }
}>


if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma