import { Get, Controller, Param } from '@nestjs/common';
import TweetService from './tweet.service';
import DateTimeHelper from '../helpers/DateTimeHelper';
import { ERROR } from './constants';

@Controller('tweet')
class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get('total-tweet-user/:date')
  getTotalTweetAndUserByDate(@Param('date') date) {
    if (!DateTimeHelper.isDateValid(date)) {
        return { errorMessage: ERROR.INVALID_DATE_FORMAT };
    }
  
    return this.tweetService.getTotalTweetAndUserByHours(date);
  }

  @Get('today')
  getTweetToday() {
    const today = DateTimeHelper.getToday();

    return this.tweetService.findAllFromDate(today);
  }

  @Get('date/:date')
  getTweetByDate(@Param('date') date) {
    if (!DateTimeHelper.isDateValid(date)) {
        return { errorMessage: ERROR.INVALID_DATE_FORMAT };
    }

    return this.tweetService.findAllFromDate(date);
  }

}

export default TweetController;
