import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { JoinWaitlistDto } from './dto/join-waitlist.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  /**
   * Adds an email to the waitlist
   */
  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  joinWaitlist(@Body() dto: JoinWaitlistDto) {
    return this.waitlistService.joinWaitlist(dto);
  }

  /**
   * Returns the total count of waitlist entries
   */
  @Public()
  @Get('count')
  getWaitlistCount() {
    return this.waitlistService.getWaitlistCount();
  }
}
