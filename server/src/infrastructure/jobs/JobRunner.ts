// jobs/JobRunner.ts
import cron from 'node-cron';
import { RouteFactory } from '../http/routes/RouteFactory';
import { DrizzlePostgreRepository } from '../repository/DrizzlePostgreRepository';
import { BCryptHashPwd } from '../../domain/services/BCryptHashPwd';
import { JwtTokenGenerator } from '../../domain/services/JwtTokenGenerator';
import { queryParams } from '../../domain/helpers/queryParams';
import { RunAllJobsActiveUseCase } from '../../domain/use_cases/RunAllJobsActiveUseCase';
import { RedisCacheProvider } from '../../domain/services/RedisCacheService';

export class JobRunner {
  static start() {
    const db = new DrizzlePostgreRepository();
    const hash = new BCryptHashPwd();
    const token = new JwtTokenGenerator();

    const factory = RouteFactory.getInstance(db, hash, token);

    const db_instance = factory.getDbConnection(); // se tiver private, você pode expor no factory também

    // a cada 10 sec, executa o use case
    cron.schedule('*/5 * * * *', async () => {
      // a cada 5 minutos, executa o use case
      // cron.schedule("*/1 * * * *", async () => {
      console.log('Executando RunAllJobsActiveUseCase...');
      try {
        const cache = new RedisCacheProvider();
        const runAllJobsActiveUseCase = new RunAllJobsActiveUseCase(
          db_instance,
          cache
        );

        await runAllJobsActiveUseCase.execute(undefined, queryParams(), 'JOB');
      } catch (err) {
        console.error('Erro ao rodar cron:', err);
      }
    });
  }
}
