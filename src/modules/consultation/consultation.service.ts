import { generateRtcToken } from '../agora/agoraTokenService';

export const createVideoSession = (channelName: string, uid?: number) => {
  return generateRtcToken({ channelName, uid });
};
