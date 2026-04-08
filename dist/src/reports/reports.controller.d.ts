import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    dashboard(from?: string, to?: string): Promise<{
        range: {
            from: string;
            to: string;
        };
        stats: {
            label: string;
            value: string;
            subtext: string;
            trend: string;
        }[];
        revenueTrend: {
            name: string;
            pv: number;
        }[];
        taskDistribution: {
            name: string;
            value: number;
        }[];
    }>;
    create(createReportDto: CreateReportDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReportDto: UpdateReportDto): string;
    remove(id: string): string;
}
