namespace Loginoperations.Dto.Product;

public class CartDto
{
    public int Id { get; set; }
    public Model.Product Product { get; set; }

    public CartDto(int _id, Model.Product _product)
    {
        Id = _id;
        Product = _product;
    }
}