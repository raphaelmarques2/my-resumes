/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfileDto } from '../models/ProfileDto';
import type { UpdateProfileDto } from '../models/UpdateProfileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProfilesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param id 
     * @returns ProfileDto 
     * @throws ApiError
     */
    public getProfileById(
id: string,
): CancelablePromise<ProfileDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/profiles/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns ProfileDto 
     * @throws ApiError
     */
    public patchProfile(
id: string,
requestBody: UpdateProfileDto,
): CancelablePromise<ProfileDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/profiles/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param userId 
     * @returns ProfileDto 
     * @throws ApiError
     */
    public getProfileByUserId(
userId: string,
): CancelablePromise<ProfileDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{userId}/profile',
            path: {
                'userId': userId,
            },
        });
    }

}
