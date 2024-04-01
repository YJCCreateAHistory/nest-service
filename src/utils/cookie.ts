import formatTool from 'src/utils/format'
import { ICookie } from 'src/types/cookie'

export const setCookie = (token: string, uid: string, username: string, appId: string) => {

  const cookie = {
    x_token: token,
    x_uid: uid,
    x_username: username,
    x_app_id: appId,
  }

  return formatTool.convertToJson<ICookie>(cookie);
}