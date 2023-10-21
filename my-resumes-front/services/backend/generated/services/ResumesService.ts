/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateResumeDto } from '../models/CreateResumeDto';
import type { ResumeDto } from '../models/ResumeDto';
import type { UpdateResumeDto } from '../models/UpdateResumeDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ResumesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns ResumeDto 
     * @throws ApiError
     */
    public createResume(
requestBody: CreateResumeDto,
): CancelablePromise<ResumeDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/resumes',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns ResumeDto 
     * @throws ApiError
     */
    public getResumeById(
id: string,
): CancelablePromise<ResumeDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/resumes/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns ResumeDto 
     * @throws ApiError
     */
    public patchResume(
id: string,
requestBody: UpdateResumeDto,
): CancelablePromise<ResumeDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/resumes/{id}',
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
    public deleteResume(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/resumes/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param userId 
     * @returns ResumeDto 
     * @throws ApiError
     */
    public listUserResumes(
userId: string,
): CancelablePromise<Array<ResumeDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{userId}/resumes',
            path: {
                'userId': userId,
            },
        });
    }

    /**
     * @param id 
     * @returns any 
     * @throws ApiError
     */
    public addExperienceToResume(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/resumes/{id}/experiences',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param experienceId 
     * @returns any 
     * @throws ApiError
     */
    public removeExperienceFromResume(
id: string,
experienceId: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/resumes/{id}/experiences/{experienceId}',
            path: {
                'id': id,
                'experienceId': experienceId,
            },
        });
    }

}
