module.exports = {
    success: (res, values={}) => {
        const obj = {
            success: true,
            values
        }
        res.json(obj)
    },
    fail: (res, err) => {
        console.log(err)
        const obj = {
            success: false,
            reason: err.message
        }
        res.json(obj)
    },
    emailLoginAuthJson: (token, { _id, email, name, username, phone_number, created_on }) => {
        return {
            token,
            user: { _id, email, name, username, phone_number, created_on }
        }
    },
}
