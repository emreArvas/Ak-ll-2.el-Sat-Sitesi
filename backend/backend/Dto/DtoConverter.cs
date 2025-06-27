using Loginoperations.Context;
using Loginoperations.Dto.Product;
using Loginoperations.Dto.Response;
using Loginoperations.Model;

namespace Loginoperations.Dto;

public class DtoConverter
{
    private readonly DContext _context;

    public DtoConverter(DContext context)
    {
        _context = context;
    }

    public  UserDto convertUser(User? user)
    {
        if (user == null)
        {
            return null;
        }
        return new UserDto(user.Id,user.Username);
    }

    public ProductsResponse convertProduct(Model.Product product)
    {
        User db = _context.Users.FirstOrDefault(x => x.Id == product.UserId);
        if (product == null || db==null )
        {
            return  new ProductsResponse();
        }
       
        return new ProductsResponse(product.Id,product.Title,product.Description,product.Image,product.Price,product.Location,product.UserId,convertUser(db),product.DatePosted);
    }

    public CartResponse convertCart(Cart cart)
    {
        Model.Product product = _context.Products.FirstOrDefault(x => x.Id == cart.ProductId);
        User user = _context.Users.FirstOrDefault(x => x.Id == cart.UserId);
        if (cart == null || product==null || user==null)
        {
            return new CartResponse();
        }
        
        return new CartResponse(cart.Id,convertProduct(product),convertUser(user));
    }
}