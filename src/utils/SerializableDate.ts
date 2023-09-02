export interface SerializableDate {
    iso8601: string;
    getDate(): Date;
}

export class DateTime implements SerializableDate  {
    iso8601: string;
    
    constructor(date?: Date | null | undefined) {
        if (!date) {
            date = new Date();
        }
        this.iso8601 = JSON.stringify(date);
    }
    getDate(): Date {
        return new Date(this.iso8601);
    }
}
