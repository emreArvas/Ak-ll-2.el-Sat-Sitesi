namespace Loginoperations.Service;

using System;
using System.Net;
using System.Net.Mail;

public class MailService 
{
    public static void SendActivationCodeEmail(string recipientEmail, string activationCode)
    {
        try
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("denemeeticaret45@gmail.com", "jnpqekzwuqewrcsb"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("your-email@example.com"),
                Subject = "Aktivasyon Kodu",
                Body = $"Hesabınızı etkinleştirmek için aşağıdaki aktivasyon kodunu kullanın: {activationCode}",
                IsBodyHtml = true,
            };

            mailMessage.To.Add(recipientEmail);

            smtpClient.Send(mailMessage);
        }
        catch (Exception ex)
        {
            Console.WriteLine("E-posta gönderme hatası: " + ex.Message);
            
        }
    }
}
