import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Database health check
      () => this.db.pingCheck('database'),
      // Memory health check - warn if using more than 300MB
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      // Memory RSS health check - warn if using more than 300MB
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
      // Disk health check - warn if using more than 80% of disk space
      () =>
        this.disk.checkStorage('storage', {
          thresholdPercent: 0.8,
          path: '/',
        }),
    ]);
  }
}
