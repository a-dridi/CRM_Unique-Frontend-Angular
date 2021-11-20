export interface MailReminder {
    _id: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    reminderTitle: string;
    reminderText: string;
    reminderDate: Date;
}