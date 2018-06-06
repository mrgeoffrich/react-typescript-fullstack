export interface IBuildStatus {
    key: number;
    Status: string;
    TemplateId: number;
    TemplateName: string;
    StartTime: Date;
    FinishTime?: Date;
}
