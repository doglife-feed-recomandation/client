import { sendGAEvent as _sendGAEvent } from '@next/third-parties/google';

export function sendGAEvent(action: string, data: string | Object) {
  const nodeEnv = process.env.NODE_ENV;

  const envTag =
    nodeEnv === 'development'
      ? 'dev'
      : nodeEnv === 'production'
        ? 'prod'
        : 'test';

  _sendGAEvent('event', envTag + '_' + action, data);
}
