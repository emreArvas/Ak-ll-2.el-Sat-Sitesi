using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Toolbelt.ComponentModel.DataAnnotations.Schema.V5;

namespace Loginoperations.Dto;

public class CreateUserDto
{
    [Required(ErrorMessage = "Kullanici adi girmek zorunludur")]
    public string Username { get; set; }
    [Required(ErrorMessage = "E posta girmek zorunludur")]
    [EmailAddress(ErrorMessage = "Lütfen doğru bir biçimde email adresi girin")]
    [IndexColumn(IsUnique = true)]
    public string Email { get; set; }
    [Required(ErrorMessage = "Şifre zorunlu bir alandır.")]
    [MinLength(8, ErrorMessage = "Şifre en az 8 karakter içermelidir.")]
    [MaxLength(256, ErrorMessage = "Şifre en fazla 256 karakter içerebilir.")]
    [RegularExpression("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$", ErrorMessage = "Lütfen en az bir büyük harf, bir küçük harf ve bir rakam içeren en az 8 karakter uzunluğunda bir şifre kullanın.")]
    public string Password { get; set; }
}