import { describe, expect, it } from 'vitest';
import { IMonitGroup } from '../interfaces/IMonitGroup';
import { MonitGroup } from '../MonitGroup';

describe('Monitoration Group', () => {
  it('should create a new Monitoration Group', async () => {
    // Arrange
    const props: IMonitGroup = {
      group_name: 'Social Media Monitoring',
      group_description: '',
      created_by: 'a',
    };

    const new_group = new MonitGroup(props);

    expect(new_group).toBeInstanceOf(MonitGroup);
  });

  it('should create a new Monitoration Group w default props filled', async () => {
    // Arrange
    const props: IMonitGroup = {
      group_name: 'Social Media Monitoring',
      group_description: '',
      created_by: 'a',
    };

    const new_group = new MonitGroup(props);
    const group_info = new_group.getMonitGroup();

    expect(group_info.active).toBe(true);
    expect(group_info.created_at).toBeDefined();
  });
});
