/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEducationDto } from '../models/CreateEducationDto';
import type { EducationDto } from '../models/EducationDto';
import type { UpdateEducationDto } from '../models/UpdateEducationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EducationsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns EducationDto 
     * @throws ApiError
     */
    public createEducation(
requestBody: CreateEducationDto,
): CancelablePromise<EducationDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/educations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns EducationDto 
     * @throws ApiError
     */
    public getEducation(
id: string,
): CancelablePromise<EducationDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/educations/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns EducationDto 
     * @throws ApiError
     */
    public patchEducation(
id: string,
requestBody: UpdateEducationDto,
): CancelablePromise<EducationDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/educations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns any 
     * @throws ApiError
     */
    public deleteEducation(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/educations/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param userId 
     * @returns EducationDto 
     * @throws ApiError
     */
    public listUserEducations(
userId: string,
): CancelablePromise<Array<EducationDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{userId}/educations',
            path: {
                'userId': userId,
            },
        });
    }

}
