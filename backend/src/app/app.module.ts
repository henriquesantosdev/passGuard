import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { APP_GUARD } from '@nestjs/core';
import { VaultModule } from 'src/vaults/vault.module';

@Module({
  imports: [UserModule, AuthModule, VaultModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthTokenGuard,
    },
  ],
})
export class AppModule {}
