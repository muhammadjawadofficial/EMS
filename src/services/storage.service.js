const TOKEN_KEY = 'token'
const CURRENT_EMPLOYEE_ID = 'currentEmployeeId'
const IS_ADMIN = 'isAdmin'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
**/
const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },

    removeToken() {
        localStorage.clear()
    },
    
    getCurrentEmployeeId() {
        return localStorage.getItem(CURRENT_EMPLOYEE_ID)
    },

    saveCurrentEmployeeId(currentEmployeeId) {
        localStorage.setItem(CURRENT_EMPLOYEE_ID, currentEmployeeId)
    },
    
    getIsAdmin() {
        return localStorage.getItem(IS_ADMIN)
    },

    saveIsAdmin(isAdmin) {
        localStorage.setItem(IS_ADMIN, isAdmin)
    },
}

export { TokenService }