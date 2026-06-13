
export interface SignupRequest extends UserOptionalInfo{
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
};

export interface UserOptionalInfo {
    age?: number;
    gender?: string;
    bio?: string;
    profilePicture?: string;
};


export interface SigninRequest {
    emailId: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    userId?: string;
    error?: string;
}