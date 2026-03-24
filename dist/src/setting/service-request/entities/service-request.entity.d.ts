import { OurClient } from '../../our-client/entities/our-client.entity';
import { PricePackage } from '../../home/price-package/entities/price-package.entity';
import { OurService } from '../../our-service/entities/our-service.entity';
export declare class ServiceRequest {
    id: number;
    client: OurClient;
    clientId: number;
    pricePackage: PricePackage;
    pricePackageId: number;
    service: OurService;
    serviceId: number;
    serviceType: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
