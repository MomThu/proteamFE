import * as yup from 'yup'
import { Regex } from 'common/constants'

yup.addMethod(yup.string, 'isPhone', function () {
    return this.test({
        message: (data) => {
            return `yup.string.phone|${JSON.stringify(data)}`
        },
        test: function (value) {
            return !value || Regex.PHONE.test(value)
        },
    })
})

yup.addMethod(yup.string, 'isAlphaNumeric', function () {
    return this.test({
        message: (data) => {
            return `yup.string.isAlphaNumeric|${JSON.stringify(data)}`
        },
        test: function (value) {
            return !value || Regex.ALPHA_NUMERIC.test(value)
        },
    })
})

yup.addMethod(
    yup.string,
    'isNotSpecialCharacters',
    function (regex = Regex.GENERAL_SPECIAL_CHARACTERS) {
        return this.test({
            message: (data) => {
                return `yup.string.isNotSpecialCharacters|${JSON.stringify(
                    data
                )}`
            },
            test: function (value) {
                return !value || !regex.test(value)
            },
        })
    }
)

export default yup
