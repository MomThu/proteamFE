export const Regex = {
    PHONE: /^[0-9]{1,255}$/,
    INT_PATTERN: `^\\d+$`,
    FLOAT_PATTERN: `^\\d+\\.\\d{0,2}$`,
    ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
    GENERAL_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>,().^*!%]+/,
    TAX_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>^*!]+/,
    MEMO_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>^*!]+/,
    WEBSITE_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>^*!]+/,
    EMAIL_SPECIAL_CHARACTERS: /[$&:;=?#|'<>,()^*!%]+/,
    CHILDREN_TYPE_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>,().^*!%@/\\~`"]+/,
    NAME_SPECIAL_CHARACTERS: /[$&+:;=?#|'<>,().^*!%@/\\~`"]+/,
}
