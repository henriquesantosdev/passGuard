import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaClient],
  exports: [PrismaClient],
})
export class PrismaModule {}
