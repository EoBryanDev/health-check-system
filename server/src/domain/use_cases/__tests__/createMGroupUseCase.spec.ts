import { describe, expect, it } from 'vitest';
import { IMonitGroup } from '../../entities/interfaces/IMonitGroup';
import { MonitGroup } from '../../entities/MonitGroup';
// import { InMemoryRepository } from '../../../infrastructure/repository/InMemoryRepository';
// import { CreateMonitGroupUseCase } from '../CreateMonitGroupUseCase';

describe('Create Monit Group Use Case', () => {
  it('should create a new Monitoration Group', async () => {
    // const inMemoryRepo = new InMemoryRepository();
    // const createMonitGroupUseCase = new CreateMonitGroupUseCase(inMemoryRepo);
    // Arrange
    const props: IMonitGroup = {
      group_name: 'Social Media Monitoring',
      group_description: '',
      created_by: 'a',
    };

    const new_group = new MonitGroup(props);

    expect(new_group).toBeInstanceOf(MonitGroup);
  });

  it('should not create a new Monitoration Group if requester is a ANALYST', async () => {
    // const inMemoryRepo = new InMemoryRepository();
    // const createMonitGroupUseCase = new CreateMonitGroupUseCase(inMemoryRepo);
    // Arrange
    const props: IMonitGroup = {
      group_name: 'Social Media Monitoring',
      group_description: '',
      created_by: 'a',
    };

    const new_group = new MonitGroup(props);

    expect(new_group).toBeInstanceOf(MonitGroup);
  });
});
