using System.ComponentModel.DataAnnotations;

namespace Loginoperations.Dto.Product;

public class UpdateProductRequest
{
    
    [Required(ErrorMessage = "Başlık boş olamaz")]
    public string Title { get; set; }
    [Required(ErrorMessage = "Açıklama boş olamaz")]
    public string Description { get; set; }
    [Required(ErrorMessage = "Fiyat boş olamaz")]
    public decimal Price { get; set; }
    public string Location { get; set; }
}