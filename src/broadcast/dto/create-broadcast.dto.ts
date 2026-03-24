export class CreateBroadcastDto {
  subject!: string;
  content!: string;

  // Optional metadata (used for UI)
  senderName?: string;
  senderRole?: string;
  tag?: string;
  attachments?: number;

  // Optional scheduling
  scheduledAt?: string; // ISO string
}
