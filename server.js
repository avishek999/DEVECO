import { SMTP } from "./config/config.js";
import { sendEMail } from "./service/emailService.js";

sendEMail("Test Email", "Hello! This is a test email sent from Node.js."); 
  