using Loginoperations.Context;
using Loginoperations.Dto;
using Loginoperations.Dto.Product;
using Loginoperations.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Loginoperations.Controllers;
[ApiController]
[Route("api/v1/[controller]")]
public class ProductController : ControllerBase
{
 private readonly DContext _context;
 private readonly DtoConverter _converter;

 public ProductController(DContext context,DtoConverter converter)
 {
  _context = context;
  _converter = converter;
 }

 // ürün ekle 
 [HttpPost("add/{UserId}")]
 public async Task<IActionResult> AddProduct(int UserId,[FromBody] AddProductRequest productRequest)
 {
  User user = _context.Users.FirstOrDefault(x => x.Id == UserId);
  if (user == null)
  {
   return BadRequest("Kullanici Bulunamadi");
  }

  Product? product = new Product();
  product.Title = productRequest.Title;
  product.User = user;
  product.Description = productRequest.Description;
  product.Image = productRequest.Image;
  product.Location = productRequest.Location;
  product.Price = productRequest.Price;
  product.UserId = UserId;
  _context.Products.Add(product);
  await _context.SaveChangesAsync();
  return Ok(product);
 }
 
 // ürün sil
 [HttpDelete("delete/{id}")]
 public async Task<IActionResult> DeleteProduct(int id)
 {
  var db = _context.Products.FirstOrDefault(x => x.Id == id);
  if (db == null)
  {
   return BadRequest("Ürün bulunamadi");
  }

  _context.Products.Remove(db);
  await _context.SaveChangesAsync();
  return Ok("Ürün Silindi");
 }
 
 // ürün güncelle
 [HttpPut("Update/{productId}")]
 public async Task<IActionResult> updateProduct([FromBody] UpdateProductRequest productRequest,int productId)
 {
  var db = _context.Products.FirstOrDefault(x => x.Id == productId);
  if (db == null)
  {
   return BadRequest("Ürün Bulunamadi");
  }

  db.Title = productRequest.Title;
  db.Description = productRequest.Description;
  db.Price = productRequest.Price;
  db.Location = productRequest.Location;
  _context.Products.Update(db);
  await _context.SaveChangesAsync();
  return Ok(productId+" idli ürün güncellendi");
 }
 
 // tüm ürünlerin listesini getirme
 [HttpGet("products")]
 public async Task<List<ProductsResponse>> getProducts()
 {
  List<Product?> products = _context.Products.ToList();
  List<ProductsResponse> productsList = new List<ProductsResponse>();
  foreach (var product in products)
  {
   productsList.Add(_converter.convertProduct(product));
  }

  return productsList;
 }
 // bir kullaniciya ait ürünleri getirme
 [HttpGet("products/{userId}")]
 public async Task<List<ProductsResponse>> GetUserProducts(int userId)
 {
  List<Product?> products = _context.Products.ToList();
  List<ProductsResponse> productsList = new List<ProductsResponse>();
  foreach (var product in products)
  {
   if (product.UserId == userId)
   {
    productsList.Add(_converter.convertProduct(product));
   }
  }
  return productsList;
 }
 // bir productu getir
 [HttpGet("get/{productId}")]
 public async Task<IActionResult> getProduct(int productId)
 {
  var db = _context.Products.FirstOrDefault(x => x.Id == productId);
  if (db == null)
  {
   return BadRequest("Ürün Bulunamadi");
  }
  var convertP = _converter.convertProduct(db);
  return Ok(convertP);
 }

 
}
