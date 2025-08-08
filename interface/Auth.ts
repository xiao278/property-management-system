interface LoginForm {
    username: string;
    password: string;
}

interface TokenUserInfo {
    username: string;
    isAdmin: boolean;
    firstname: string;
    lastname: string;
}

export { LoginForm, TokenUserInfo }