/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AuthService } from './services/AuthService';
import { DefaultService } from './services/DefaultService';
import { ExperiencesService } from './services/ExperiencesService';
import { ProfilesService } from './services/ProfilesService';
import { ResumesService } from './services/ResumesService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class BackendClient {

    public readonly auth: AuthService;
    public readonly default: DefaultService;
    public readonly experiences: ExperiencesService;
    public readonly profiles: ProfilesService;
    public readonly resumes: ResumesService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.auth = new AuthService(this.request);
        this.default = new DefaultService(this.request);
        this.experiences = new ExperiencesService(this.request);
        this.profiles = new ProfilesService(this.request);
        this.resumes = new ResumesService(this.request);
    }
}
