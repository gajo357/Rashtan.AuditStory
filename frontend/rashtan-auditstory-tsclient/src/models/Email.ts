interface Email {
  name: string;
  subject: string;

  content: string;
}

export type SendEmail = (e: Email) => Promise<boolean>;

export default Email;
