import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type EventLog = {
  sessionId: string | null;
  module: string | null;
  event: string | null;
};


class EventLogger {
  async logEvent(eventLog: EventLog): Promise<void> {
    try {
      await prisma.$queryRaw
        `INSERT INTO event_logs (session_id, module, event) VALUES (${eventLog.sessionId}, ${eventLog.module}, ${eventLog.event})`;
      // console.debug('Event logged successfully');
    } catch (error) {
      // console.error('Error logging event:', error);
    }
  }
}

export const eventLogger = new EventLogger();
