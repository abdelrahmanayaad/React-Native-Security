import { secureFetch } from '../services/secureFetch';

export const PINS = {
  DEFAULT_PIN: '6yQC8kUf8B+PnZaf/9D+UJ1nsKYvprTKUhbjV3LUTf0=',
  BACKUP_PIN: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
};

export const DOMAIN = 'dummyjson.com';

const DEFAULT_PINNING = {
  domain: DOMAIN,
  pins: [PINS.DEFAULT_PIN, PINS.BACKUP_PIN],
};

export const apiClient = {
  get: async (
    url: string,
    usePinning = true,
    pinning?: { domain: string; pins: string[] },
  ) => {
    const res = await secureFetch(url, {
      method: 'GET',
      pinning: usePinning ? (pinning ? pinning : DEFAULT_PINNING) : undefined,
      disablePinning: !usePinning,
    });
    return res.json();
  },

  post: async (url: string, body: any, usePinning = true) => {
    const res = await secureFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      pinning: usePinning ? DEFAULT_PINNING : undefined,
      disablePinning: !usePinning,
    });
    return res.json();
  },
};
