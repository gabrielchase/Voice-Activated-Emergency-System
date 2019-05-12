const axios = require('axios')
const { FCM_URL, FCM_AUTHORIZATION_KEY } = require('../config/config')

module.exports = {
    sendFCM: async (data) => {
        const headers = {
            headers: {
                Authorization: `key=${FCM_AUTHORIZATION_KEY}`,
                'Content-Type': 'application/json'
            }
        }
        const body = {
            "notification": {
                "body": "Someone needs help at location",
                "title": "Emergency!"
            },
            "priority": "high",
            "data": {
                "click_action": "FLUTTER_NOTIFICATION_CLICK",
                "id": "1",
                "latitude": `${data.latitude}`,
                "longitude": `${data.longitude}`
            },
            "to": "/topics/all"
        }
        console.log(headers, data)
        const res = await axios.post(FCM_URL, body, headers)
        console.log('res: ', res.data)        
    }
}
