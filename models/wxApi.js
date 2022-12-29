/*
 * @Author: yuyongxing
 * @Date: 2022-04-18 22:20:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-29 16:52:44
 * @Description: 
 */
const axios = require("axios");


module.exports = {
    getOpenid: async (appid, secret, code) => {
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`
        const { data } = await axios({
            url: url
        })
        return data
    },
    getAccessToken: async (appid, secret) => {
        const accessTokenJson = global.accessTokenJson || {}
        const nowTime = new Date().getTime()
        // 提前半小时刷新access_token
        if (accessTokenJson.access_token && (nowTime - accessTokenJson.createTime < (accessTokenJson.expires_in - 1800) * 1000)) {
            return accessTokenJson
        } else {
            const { data } = await axios({
                url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
            })
            if (data.access_token) {
                    global.accessTokenJson = {...data,createTime:nowTime}
            }
            return data
        }

    },
    sendWxMessage: async (openid, access_token, title, desc) => {
        const json = {
            touser: openid,
            template_id: 'yMeH7QzldYLJlR1WeQ9QylxNN_lqopRcODU5ACRRQ-w',
            topcolor: "#FF0000",
            data: {
                title: {
                    value: title,
                    color: "#173177"
                },
                desc: {
                    value: desc,
                    color: '#173177'
                }
            }
        }
        const { data } = await axios({
            method: "post",
            url: `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`,
            data: json
        })
        return data
    }
}