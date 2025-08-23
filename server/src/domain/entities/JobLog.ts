import { IJobLog } from './interfaces/IJobLog';

class JobLog {
  private props: IJobLog;

  constructor(job_log_payload: IJobLog) {
    const job_log_constructor: IJobLog = {
      job_log_id: job_log_payload.job_log_id ?? undefined,
      job_id: job_log_payload.job_id,
      start_at: job_log_payload.start_at,
      duration: job_log_payload.duration,
    };

    this.props = job_log_constructor;
  }

  public getJobLogInfo() {
    return this.props;
  }
}

export { JobLog };
