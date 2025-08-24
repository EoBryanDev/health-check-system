export type TJobExecutionMode = 'all' | 'group';

export interface IRunJobInputDTO {
    id?: string;
    mode: TJobExecutionMode;
}