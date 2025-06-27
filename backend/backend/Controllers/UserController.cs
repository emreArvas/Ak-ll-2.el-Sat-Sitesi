using Loginoperations.Context;
using Loginoperations.Dto;
using Loginoperations.Model;
using Loginoperations.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Loginoperations.Controllers;
[ApiController]
[Route("api/v1/[controller]")]
public class UserController :ControllerBase
{
    private readonly DContext _context;
    private readonly PasswordService _passwordService; 
    private readonly MailService _mailService;
    
    public UserController(DContext context, PasswordService passwordService,MailService mailService)
    {
        _context = context;
        _passwordService = passwordService;
        _mailService = mailService;
    }

    [HttpPost("create")]
    //kayıt
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto? user)
    {
        bool isEmailUnique = _context.Users.All(i => i.Email != user.Email);
        if (!isEmailUnique)
        {
            return BadRequest("Bu mail zaten kayıtlı");
        }

       
        User? db = new User();
        if (user == null)
        {
            return NotFound();
        }
        db.Email = user.Email;
        db.Username = user.Username;
        db.Password = _passwordService.HashPassword(user.Password);
        _context.Users.Add(db);
        await _context.SaveChangesAsync();
        return Ok("Başari ile kayıt olundu");
    }
   // giriş
   [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        if (loginRequest == null)
        {
            return BadRequest("Geçersiz istek.");
        }

        var dbUser = await _context.Users.FirstOrDefaultAsync(i => i.Email == loginRequest.Email);

        if (dbUser == null)
        {
            return BadRequest("Kullanıcı bulunamadı.");
        }

        var isPassword = _passwordService.VerifyPassword(loginRequest.Password, dbUser.Password);

        if (!isPassword)
        {
            return BadRequest("Şifre hatalı, lütfen tekrar deneyin.");
        }

        return Ok(dbUser.Id);
    }
    [HttpPut("forgot")]
    // şifremi unuttum
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest email)
    {
        var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == email.Email);
        if (dbUser == null)
        {
            return BadRequest("Kullanici Bulunamadi");
        }
        dbUser.ActivationCode=new Random().Next(100000, 999999).ToString();
        _context.Users.Update(dbUser);
        await _context.SaveChangesAsync();
        MailService.SendActivationCodeEmail(email.Email,dbUser.ActivationCode);
        return Ok("Aktivasyon kodunuz mail adresinize gönderildi");
    }
    // activasyon kodu doğrula ve şifre değiştir
    [HttpPut("changePassword/{email}")]
    public async Task<IActionResult> changePassword(string email,[FromBody]ChangePasswordRequest change)
    {
        var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        if (dbUser == null)
        {
            return BadRequest("Sistem hatası, lütfen tekrar deneyin.");
        }
        else if (dbUser.ActivationCode != change.ActivationCode)
        {
            return BadRequest("Hatalı Kod girdiniz");
        }
        dbUser.Password = _passwordService.HashPassword(change.NewPassword);
        dbUser.ActivationCode = "default";
        _context.Users.Update(dbUser);
        await _context.SaveChangesAsync();
        return Ok("Şifre başarı ile değiştirildi");
    }
    // kullanici sil
    [HttpDelete("/{id}")]
    public async Task<IActionResult> deleteUser(int id)
    {
        var db = await _context.Users.FirstOrDefaultAsync(x=>x.Id==id);
        if (db == null)
        {
            return NotFound("Kullanici Bulunamadi");
        }
        
        _context.Users.Remove(db);
         try
         {
             await _context.SaveChangesAsync();
         }
         catch (Exception e)
         {
             return NotFound("Kullanici Bulunamadi");
         }
        return Ok("Kullanici başarı ile silindi");
    }

}