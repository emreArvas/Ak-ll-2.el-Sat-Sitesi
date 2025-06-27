using Loginoperations.Dto.Response;

namespace Loginoperations.Dto.Product;

public class ProductsResponse
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Image { get; set; } = "default";
    public decimal Price { get; set; }
    public string Location { get; set; }
    
    public int UserId { get; set; }
  
    public UserDto User { get; set; }
    
    public DateTimeOffset DatePosted { get; set;}

    public ProductsResponse()
    {
    }

    public ProductsResponse(int ıd, string title, string description, string ımage, decimal price, string location, int userId, UserDto user, DateTimeOffset datePosted)
    {
        Id = ıd;
        Title = title;
        Description = description;
        Image = ımage;
        Price = price;
        Location = location;
        UserId = userId;
        User = user;
        DatePosted = datePosted;
    }
}