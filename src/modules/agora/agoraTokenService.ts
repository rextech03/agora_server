import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { env } from '../../config/env';

export interface RtcTokenRequest {
  channelName: string;
  uid?: number;
  expireSeconds?: number;
}

/**
 * Generate RTC token for video/audio calls
 */
export const generateRtcToken = ({ channelName, uid = 0, expireSeconds = 3600 }: RtcTokenRequest) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpire = currentTimestamp + expireSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    env.AGORA_APP_ID,
    env.AGORA_APP_CERT,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    privilegeExpire
  );

  return {
    token,
    channelName,
    uid,
    expireTimestamp: privilegeExpire
  };
};
