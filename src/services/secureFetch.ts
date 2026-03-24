import { enableSslPinning, disableAllSslPinning } from './SslPinning';

type PinningConfig = {
  domain: string;
  pins: string[];
};

type SecureFetchOptions = RequestInit & {
  pinning?: PinningConfig;
  disablePinning?: boolean;
};

export const secureFetch = async (
  url: string,
  options: SecureFetchOptions = {},
) => {
  const { pinning, disablePinning, ...fetchOptions } = options;

  try {
    // 1. Handle SSL pinning
    if (disablePinning) {
      await disableAllSslPinning();
    } else if (pinning) {
      await enableSslPinning({
        [pinning.domain]: pinning.pins,
      });
    }

    // 2. Perform request
    const response = await fetch(url, fetchOptions);

    // 3. Handle non-2xx responses
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text.substring(0, 200)}`);
    }

    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Secure fetch failed');
  }
};
