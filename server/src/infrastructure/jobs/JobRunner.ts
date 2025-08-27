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
    const db_instance = factory.getDbConnection();

    let isRunning = false;

    cron.schedule("*/2 * * * *", async () => {
      if (isRunning) {
        console.warn('JobRunner: execução anterior ainda em andamento, pulando tick.');
        return;
      }
      isRunning = true;
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
      } finally {
        isRunning = false;
      }
    });
  }
}
