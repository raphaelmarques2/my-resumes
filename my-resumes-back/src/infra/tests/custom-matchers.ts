/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeIsoDate(): R;
    }
    interface Expect {
      toBeIsoDate(): void;
    }
  }
}

import * as moment from 'moment';

expect.extend({
  toBeIsoDate(received: string) {
    const pass = moment(received, moment.ISO_8601).isValid();
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid ISO date`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid ISO date`,
        pass: false,
      };
    }
  },
});

export default undefined;
