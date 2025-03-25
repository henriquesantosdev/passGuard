import { Module } from '@nestjs/common';
import { VaultController } from './vault.controller';
import { VaultService } from './vauts.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VaultController],
  providers: [VaultService],
  exports: [],
})
export class VaultModule {}
