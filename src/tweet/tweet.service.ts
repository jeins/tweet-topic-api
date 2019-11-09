import FileHelper from '../helpers/FileHelper';
import { TweetDao } from './tweet.interface';
import { TWITTER_STATUS_URL } from './constants';

class TweetService {
  private tweetData: [];

  constructor() {
    this.tweetData = FileHelper.readFileData();
  }

  public findAllFromDate(selectedDate: string): any {
    return this.tweetData
        .filter(({ date }: TweetDao) => date === selectedDate)
        .map((tweet: TweetDao) => ({
            ...tweet,
            tweetUrl: `${TWITTER_STATUS_URL}/${tweet.id}`,
        }));
  }

  public getTotalTweetAndUserByHours(selectedDate: string) {
    const tweet = this.findAllFromDate(selectedDate);
    const data = [];

    for(let i = 0; i < 25; i++) {
      const totalTweets = tweet.filter(({ time }: TweetDao) => {
        const hour = time.split(':')[0];
        return Number(hour) === i;
      });
      const totalUniqueUsers = totalTweets
        .map(({ userId }: TweetDao) => userId)
        .filter((id, index, self) => self.indexOf(id) === index);

      data.push({
        [i]: {
            totalTweets: totalTweets.length,
            totalUniqueUsers: totalUniqueUsers.length,
        },
      })
    }

    return data;
  }
}

export default TweetService;