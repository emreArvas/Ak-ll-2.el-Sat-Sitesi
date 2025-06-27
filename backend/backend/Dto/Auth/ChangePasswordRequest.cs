using System.ComponentModel.DataAnnotations;

namespace Loginoperations.Dto;

public class ChangePasswordRequest
{
    [Required(ErrorMessage = "Aktivasyon kodu zorunlu bir alan")]
    public string ActivationCode { get; set; }
    [Required(ErrorMessage = "Şifre zorunlu bir alandır.")]
    [MinLength(8, ErrorMessage = "Şifre en az 8 karakter içermelidir.")]
    [MaxLength(256, ErrorMessage = "Şifre en fazla 256 karakter içerebilir.")]
    [RegularExpression("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$", ErrorMessage = "Lütfen en az bir büyük harf, bir küçük harf ve bir rakam içeren en az 8 karakter uzunluğunda bir şifre kullanın.")]
    public string NewPassword { get; set;}
}