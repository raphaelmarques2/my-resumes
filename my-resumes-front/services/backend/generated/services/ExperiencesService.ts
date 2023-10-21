/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateExperienceDto } from '../models/CreateExperienceDto';
import type { ExperienceDto } from '../models/ExperienceDto';
import type { UpdateExperienceDto } from '../models/UpdateExperienceDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ExperiencesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns ExperienceDto 
     * @throws ApiError
     */
    public createExperience(
requestBody: CreateExperienceDto,
): CancelablePromise<ExperienceDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/experiences',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns ExperienceDto 
     * @throws ApiError
     */
    public getExperience(
id: string,
): CancelablePromise<ExperienceDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/experiences/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns ExperienceDto 
     * @throws ApiError
     */
    public patchExperience(
id: string,
requestBody: UpdateExperienceDto,
): CancelablePromise<ExperienceDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/experiences/{id}',
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
    public deleteExperience(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/experiences/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param userId 
     * @returns ExperienceDto 
     * @throws ApiError
     */
    public listUserExperiences(
userId: string,
): CancelablePromise<Array<ExperienceDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{userId}/experiences',
            path: {
                'userId': userId,
            },
        });
    }

}
