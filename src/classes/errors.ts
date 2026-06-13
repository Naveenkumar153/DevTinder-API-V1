
export class AppError extends Error {
    constructor(
        public readonly statusCode: number,
        public message: string,
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    };
};

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad Request') {
        super(400, message);
    };
};

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
        super(401, message);
    };
};

export class NotFoundError extends AppError {
    constructor(message: string = 'Not Found') {
        super(404, message);
    };
};

export class ConflictError extends AppError {
    constructor(message: string = 'Conflict') {
        super(409, message);
    };
};

export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
        super(403, message);
    };
};

export class ValidationError extends AppError {
    constructor(message: string = 'Validation Error') {
        super(422, message);
    };
};

export class UnprocessableEntityError extends AppError {
    constructor(message: string = 'Unprocessable Entity') {
        super(422, message);
    };
};

export class ConflictResourceError extends AppError {
    constructor(message: string = 'Resource Already Exists') {
        super(409, message);
    };
};

export class GoneError extends AppError {
    constructor(message: string = 'Resource Has Been Deleted') {
        super(410, message);
    };
};

export class TooManyRequestsError extends AppError {
    constructor(message: string = 'Too Many Requests') {
        super(429, message);
    };
};

export class InternalServerError extends AppError {
    constructor(message: string = 'Internal Server Error') {
        super(500, message);
    };
};

export class ServiceUnavailableError extends AppError {
    constructor(message: string = 'Service Unavailable') {
        super(503, message);
    };
};