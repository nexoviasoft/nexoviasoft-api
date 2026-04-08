declare class ShiftDto {
    day?: string;
    startTime?: string;
    endTime?: string;
    time?: string;
    label?: string;
    type?: string;
}
export declare class CreateScheduleDto {
    teamId: number;
    shifts: Array<ShiftDto | null>;
    weekStartDate?: string;
    weekEndDate?: string;
}
export {};
