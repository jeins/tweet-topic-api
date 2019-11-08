import Twit from 'twit';
import Helpers from './helpers';
import {
  MAX_REQUEST_DATA,
  RESULT_TYPE,
  SEARCH_ENDPOINT,
} from './constants';

class TwitterWorker {
  private twitterClient: Twit;
  private topic: string;

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

  public setTopic(topic: string) {
    this.topic = topic;
  }

  public recordData() {
    if(!this.topic) return;

    this._searchTopicData((err, data, response) => {
      if (err || !Object.keys(data).length || !data.statuses.length) {
        console.error("no data found!");
        return;
      }

      const { statuses } = data;

      const tweetData = Helpers.extractRequiredFields(statuses);

      console.log(tweetData);
    });
  }

  private _searchTopicData(cbResponse) {
    this.twitterClient.get(
      SEARCH_ENDPOINT,
      {
        q: `"${this.topic}"`,
        count: MAX_REQUEST_DATA,
        result_type: RESULT_TYPE,
      }, cbResponse);
  }
}

export default TwitterWorker;