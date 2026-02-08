import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JoinWaitlistDto } from './dto/join-waitlist.dto';

export interface WaitlistCountResponse {
  count: number;
}

export interface WaitlistJoinResponse {
  message: string;
  email: string;
}

@Injectable()
export class WaitlistService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Adds an email to the waitlist
   */
  async joinWaitlist(dto: JoinWaitlistDto): Promise<WaitlistJoinResponse> {
    const existingEntry = await this.prisma.waitlistEntry.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingEntry) {
      throw new ConflictException('This email is already on the waitlist');
    }

    await this.prisma.waitlistEntry.create({
      data: { email: dto.email.toLowerCase() },
    });

    return {
      message: 'Successfully joined the waitlist',
      email: dto.email.toLowerCase(),
    };
  }

  /**
   * Returns the total count of waitlist entries
   */
  async getWaitlistCount(): Promise<WaitlistCountResponse> {
    const count = await this.prisma.waitlistEntry.count();
    return { count };
  }
}
