using Loginoperations.Dto.Response;

namespace Loginoperations.Dto.Product;

public class CartResponse
{
    public int  Id { get; set; }
    public ProductsResponse Product { get; set; }
    public UserDto User { get; set; }

    public CartResponse(int _id, ProductsResponse _product, UserDto _user)
    {
        Id = _id;
        Product = _product;
        User = _user;
    }
    public CartResponse(){}
}