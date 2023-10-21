/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthOutputDto } from '../models/AuthOutputDto';
import type { LoginDto } from '../models/LoginDto';
import type { SignupDto } from '../models/SignupDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns AuthOutputDto 
     * @throws ApiError
     */
    public signup(
requestBody: SignupDto,
): CancelablePromise<AuthOutputDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns AuthOutputDto 
     * @throws ApiError
     */
    public login(
requestBody: LoginDto,
): CancelablePromise<AuthOutputDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns AuthOutputDto 
     * @throws ApiError
     */
    public authenticate(): CancelablePromise<AuthOutputDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/authenticate',
        });
    }

    /**
     * @returns UserDto 
     * @throws ApiError
     */
    public getMe(): CancelablePromise<UserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/me',
        });
    }

}
