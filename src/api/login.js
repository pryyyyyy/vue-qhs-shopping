import request from '@/utils/request'

// 获取图形验证码
export const getPicCode = () => {
    return request.get('/captcha/image')
}

// 发送手机验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
    return request.post('/captcha/sendSmsCaptcha', {
        form: {
            captchaCode,
            captchaKey,
            mobile
        }
    })
}

// 验证码登录
export const codeLogin = (mobile, smsCode) => {
    return request.post('/passport/login', {
        form: {
            isParty: false,
            mobile,
            partyData: {},
            smsCode
        }
    }, {
        headers: {
            platform: 'H5',
            'Content-Type': 'application/json'
        }
    })
}
