import { Get, Controller, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import TweetService from './tweet.service';
import DateTimeHelper from '../helpers/DateTimeHelper';
import { ERROR } from './constants';

@ApiUseTags('tweets')
@Controller('tweets')
class TweetController {
  constructor(private tweetService: TweetService) {}

  /**
   * Get total tweets and users pro hours on specific date
   * default date exp: 01.01.2019
   * @param date 
   */
  @ApiOperation({ title: 'Get total tweets and users pro hours on specific date' })
  @ApiResponse({ status: 200, description: 'Return array of hours.'})
  @Get('total-tweet-user/:date')
  getTotalTweetAndUserByDate(@Param('date') date: string) {
    if (!DateTimeHelper.isDateValid(date)) {
        return { errorMessage: ERROR.INVALID_DATE_FORMAT };
    }
  
    return this.tweetService.getTotalTweetAndUserByHours(date);
  }

  /**
   * Get all tweets data today
   */
  @ApiOperation({ title: 'Get all tweets data today' })
  @ApiResponse({ status: 200, description: 'Return array.'})
  @Get()
  getTweetToday() {
    const today = DateTimeHelper.getToday();

    return this.tweetService.findAllFromDate(today);
  }

  /**
   * Get all tweets from specific date
   * @param date
   */
  @ApiOperation({ title: 'Get all tweets from specific date' })
  @ApiResponse({ status: 200, description: 'Return array.'})
  @Get('date/:date')
  getTweetByDate(@Param('date') date) {
    if (!DateTimeHelper.isDateValid(date)) {
        return { errorMessage: ERROR.INVALID_DATE_FORMAT };
    }

    return this.tweetService.findAllFromDate(date);
  }

}

export default TweetController;
