using System.ComponentModel.DataAnnotations;

namespace Loginoperations.Dto.Product;

public class AddProductRequest
{
    [Required(ErrorMessage = "Başlık boş değer olamaz")]
    public string Title { get; set; }
    [Required(ErrorMessage = "Açıklama boş değer olamaz")]
    public string Description { get; set; }
    public string Image { get; set; } 
    [Required(ErrorMessage = "Fiyat boş değer olamaz")]
    public decimal Price { get; set; }
    [Required(ErrorMessage = "Konum boş değer olamaz")]
    public string Location { get; set; }
}