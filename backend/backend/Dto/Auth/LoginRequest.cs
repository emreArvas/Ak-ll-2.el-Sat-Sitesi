using System.ComponentModel.DataAnnotations;

namespace Loginoperations.Dto;

public class LoginRequest
{
    [Required(ErrorMessage = "E posta girmek zorunludur")]
    [EmailAddress(ErrorMessage = "Lütfen doğru bir biçimde email adresi girin")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Şifre girmek zorunludur")]
    public string Password { get; set; }
}