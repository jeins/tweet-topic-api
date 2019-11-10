import Twit from 'twit';
import { job } from 'cron';
import FileHelper from '../helpers/FileHelper';
import DateTimeHelper from '../helpers/DateTimeHelper';
import Helpers from './helpers';
import {
  MAX_REQUEST_DATA,
  RESULT_TYPE,
  SEARCH_ENDPOINT,
  CRON_JOB_TIMER,
} from './constants';

class TwitterWorker {
  private twitterClient: Twit;

  constructor(
    consumerKey: string,
    consumerSecret: string,
    accessToken: string,
    accessTokenSecret: string
  ) {
    this.twitterClient = new Twit({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: accessToken,
      access_token_secret: accessTokenSecret,
    });
  }

  /**
   * record tweet from specific topic 
   * then save the data to a file json
   * 
   * @param topic 
   */
  public recordData(topic) {
    if(!topic) {
        console.error("no topic added!");
        return;
    };

    this._searchTopicData(topic, (err, data, response) => {
      if (err || !Object.keys(data).length || !data.statuses.length) {
        console.error("no data found!");
        return;
      }

      const { statuses } = data;

      const tweetData = Helpers.extractRequiredFields(statuses);

      FileHelper.writeFileData(tweetData);
  
      console.log(`Worker started at: ${DateTimeHelper.getTodayDateTime()}`);
    });
  }

  /**
   * cron job to run recordData
   * 
   * @param topic 
   */
  public run(topic) {
    job(CRON_JOB_TIMER, () => this.recordData(topic)).start();
  }

  private _searchTopicData(topic, cbResponse) {
    this.twitterClient.get(
      SEARCH_ENDPOINT,
      {
        q: `"${topic}"`,
        count: MAX_REQUEST_DATA,
        result_type: RESULT_TYPE,
      }, cbResponse);
  }
}

export default TwitterWorker;