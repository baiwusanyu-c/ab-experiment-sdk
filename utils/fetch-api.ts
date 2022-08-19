import req from './fetch-mini-wechat'
export async function testRequest() {
  return req.post('api/userInfo/addWeChatUserInfoAndLogin', {}, {}, false)
}
