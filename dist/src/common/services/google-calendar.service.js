"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GoogleCalendarService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCalendarService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const crypto_1 = require("crypto");
let GoogleCalendarService = GoogleCalendarService_1 = class GoogleCalendarService {
    constructor() {
        this.logger = new common_1.Logger(GoogleCalendarService_1.name);
        this.calendarId = 'primary';
        this.lastRequestTime = 0;
        this.requestQueue = Promise.resolve();
        const clientEmail = 'connect@squadlog-485516.iam.gserviceaccount.com';
        const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCa3Ggb1IaSIR+V\n2YFj3tQ3mcw1nuEJX1bYXqJrn+sx8TaxOMJI/QwlkoQEFgIlCCQn6x6fFq4/w7zt\nO1ZoeMLYptdS5jREbVV1M9+IgAFgsyokvC2z64dGWyCyCZimRyND5krP4l09qo+e\nRV7LL5x7onAzk0E3FS0gopSkbMUXfBzplVNoRSYcRjjRzTfSJOf2Ad7eROIKKxfv\nPyqPhTtGMptLlyD2rLJsovt+jud3IKzg4LvO24NgHxn5W3jA1/bu1rZ9iojJCwZQ\ncrmzNHzp0QEEG+3ZYz5/tQrpRDB0rda+pbZ9wH5RtCQXYhpmjdgcqQXFsP5QcYs6\nExiBO8+NAgMBAAECgf8PhFMPuMkm/SXTylduWPnHkcuaTjzf1SEIn+QLePFFNG2A\nS/5RzMkLedOPiIphnLSEQSedymxiqwETGPUTwk3wio94vOIiCNiSdFpCW+tSAzCe\n2RE06iy23UjJ7R7qpFnXPH7vA0KMxgzCQch7Oe77Ueh7o1ILW8AFNr0FR0hMzUUQ\n4FVobED/3XjhA/tiojk9EMME4Pn6/zffg0D+gsF912GkYaBs+sCI5OyBSq6BO7Ia\nZvNknVH8MR3tZCNUfAqXIpsAmVwN6/Nt4yuvS2r+17YOO5vM1kGRQ9lwuMwSgtcQ\nYtKUynchkEDcvFxaq8YN/XGNmAL0PA5ihGqjw5ECgYEAzm4uB+2twtPbCvMRSZP5\nxD2hhWPKx0p8CAcTSGcGf2a6/ddql6/nnr0hBIPLYrrOc6o9q18ERtrE0Ro5r8UC\nafdSatZeifjHwQlkwzes+kyhIbMSo/Xe9L0C40dOQPe0MZk1renbwD7GzPBZuA6O\n+oLE05W0bk52ISGpMBfHZLUCgYEAwAweSO/69wtx80IXGmJ+CJnN/xkPeLLCoa2P\nj3onLD+ep9vH3to1AsfDoCKAm7SMMlFk75YeSGJ9kJj9rCCq1SJ23N3EN7YQF1Go\nVxLWpNHRj1weKHhDHbjk34jRmlFOcORyNxm6I9IEV0Gu/icxvjYgRVPviu375vN9\nDdtwHnkCgYAC9FzATEySX0nhTD1RGkcW4fLv38/FLnG8A63o+WCEbkn63Bxwc1oT\nUY2pbOF6VkYiLauYSlHbWcI7Y+6zb1Rrg9iwIsVToDXrs2C30pItOu+Lde6sXhaE\n1je2XQznrSPtGc5E4PX+OGfMAxyln7+4IisDBD+C3KigLMUpJQ37iQKBgBhZMPnE\nW0g5DkBuL6mrtRj4DxL5pWmDGIQREjN5pD/K7R2REt0hQzlQBHBoD3AuStwST77E\nhKBexFax3u+U0LPnA7Tq9PavQYkDVFl9zPLmmzAW2Mf+v1ukVng0y4ZKKqzLeeOc\ngmoKNXyumjYk1/yqthq0EpnFpHtagY9hM+zZAoGAb5PydqOe+ZCq2PrcqAkQBjgz\nNHJfs0ZmD8iFPvUG19XumdfSwy1To0a33/It5ba1+BaXL0cTFwZBWJtj35ADaV8H\nHIcbqTW4OSYesDYmXlc3zM9b7ioPM4S+6r1+mYrZtB2ko1dm33ocXRCGW5asR0vH\nmFfDb13rIM+zwdKy27c=\n-----END PRIVATE KEY-----\n-u46GiEi_2A7jMClvHiFHq6C9diGT';
        this.calendarId = 'primary';
        const auth = new googleapis_1.google.auth.GoogleAuth({
            credentials: { client_email: clientEmail, private_key: privateKey },
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });
        this.calendar = googleapis_1.google.calendar({
            version: 'v3',
            auth,
            retryConfig: {
                retry: 0,
            },
        });
    }
    async createMeetEvent(data) {
        return this.scheduleRequest(async () => {
            const requestId = (0, crypto_1.randomUUID)();
            const res = await this.executeWithBackoff(() => this.calendar.events.insert({
                calendarId: this.calendarId,
                conferenceDataVersion: 1,
                requestBody: {
                    summary: data.summary,
                    description: data.description,
                    start: { dateTime: data.start },
                    end: { dateTime: data.end },
                    attendees: data.attendees,
                    conferenceData: {
                        createRequest: {
                            requestId,
                            conferenceSolutionKey: { type: 'hangoutsMeet' },
                        },
                    },
                },
            }));
            return {
                eventId: res.data.id ?? undefined,
                meetLink: res.data.hangoutLink ?? undefined,
            };
        });
    }
    async scheduleRequest(fn) {
        const queueItem = async () => {
            const now = Date.now();
            const wait = Math.max(0, 1000 - (now - this.lastRequestTime));
            if (wait > 0)
                await new Promise((resolve) => setTimeout(resolve, wait));
            try {
                return await fn();
            }
            finally {
                this.lastRequestTime = Date.now();
            }
        };
        const next = this.requestQueue.then(queueItem, queueItem);
        this.requestQueue = next;
        return next;
    }
    async executeWithBackoff(fn, attempt = 1) {
        try {
            return await fn();
        }
        catch (error) {
            const status = error.response?.status || error.code;
            const isRetryable = (status === 429 || (status >= 500 && status < 600)) && attempt <= 5;
            if (!isRetryable) {
                throw error;
            }
            const delay = Math.pow(2, attempt) * 1000;
            this.logger.warn(`Request failed (${status}). Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return this.executeWithBackoff(fn, attempt + 1);
        }
    }
};
exports.GoogleCalendarService = GoogleCalendarService;
exports.GoogleCalendarService = GoogleCalendarService = GoogleCalendarService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleCalendarService);
//# sourceMappingURL=google-calendar.service.js.map