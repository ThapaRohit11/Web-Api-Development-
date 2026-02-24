//backend routes
export const API = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        USER: "/api/auth/user"
    },
    USER: {
        PROFILE: "/api/user/profile"
    },
    ADMIN: {
        USERS: "/api/admin/users",
        USER_BY_ID: (id: string) => `/api/admin/users/${id}`
    },
    RECIPE: {
        LIST: "/api/recipes",
        MY: "/api/recipes/my",
        BY_ID: (id: string) => `/api/recipes/${id}`
    }
}