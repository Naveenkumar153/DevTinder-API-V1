
export interface SignupRequest {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
};

export interface SigninRequest {
    emailId: string;
    password: string;
};