using Loginoperations.Context;
using Loginoperations.Dto;
using Loginoperations.Dto.Product;
using Loginoperations.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Loginoperations.Controllers;
[ApiController]
[Route("api/v1/[controller]")]


public class CartController : ControllerBase
{
    private readonly DContext _context;
    private readonly DtoConverter _converter;

    public CartController(DContext context)
    {
        _context = context;
    }

    // sepete ekle 
    [HttpPost("addCart/{userId}/{productId}")]
    public async Task<IActionResult> addCart(int userId, int productId)
    {
        var dbUser = _context.Users.FirstOrDefault(x => x.Id == userId);
        var dbProduct = _context.Products.FirstOrDefault(x => x.Id == productId);
        if (dbUser == null || dbProduct == null)
        {
            return BadRequest("Kullanici veya ürün bulunamadi");
        }

        Cart cart = new Cart();
        cart.User = dbUser;
        cart.Product = dbProduct;
        cart.ProductId = productId;
        cart.UserId = userId;
        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();
        return Ok("Ürün Sepete Eklendi");
    }
    // sepetten kaldir
    [HttpDelete("removeCart/{cartId}")]
    public async Task<IActionResult> remove(int cartId)
    {
        var db = _context.Carts.FirstOrDefault(x => x.Id == cartId);
        if (db == null)
        {
            return BadRequest("Ürün sepette değil");
        }

        _context.Remove(db);
        await _context.SaveChangesAsync();
        return Ok("Ürün Silindi");
    }
    // kullanicinin sepetindeki listeleri getir
    [HttpGet("carts/{userId}")]
    public async Task<IActionResult> getCartList(int? userId)
    {
        List<Cart> carts = _context.Carts.ToList();
        List<CartDto> cartList = new List<CartDto>();
        foreach (var cart in carts)
        {
            if (cart != null && cart.UserId == userId)
            {
                var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == cart.ProductId);
                if (product != null)
                {
                    cartList.Add(new CartDto(cart.Id, product));
                }

            }
        }

        return Ok(cartList);
    }



}