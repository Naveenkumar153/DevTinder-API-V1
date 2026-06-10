export interface SignupRequest {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    age?: number;
    gender?: string;
    bio?: string;
    profilePicture?: string;
}

export interface SigninRequest {
    emailId: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    userId?: string;
    error?: string;
}