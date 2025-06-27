using Loginoperations.Context;
using Loginoperations.Dto;
using Loginoperations.Service;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Net.Http;

// Enable legacy timestamp behavior
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure PostgreSQL connection with Supabase
builder.Services.AddDbContext<DContext>(options =>
    options.UseNpgsql("Host=aws-0-eu-central-1.pooler.supabase.com;Database=postgres;Username=postgres.odphyypsdrvnkgtlhpqk;Password=Rf_526577;Pooling=true;Minimum Pool Size=0;Maximum Pool Size=100;Connection Idle Lifetime=60;Connection Pruning Interval=10"));

builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<MailService>();
builder.Services.AddScoped<DtoConverter>();
builder.Services.AddHttpClient();

// Add Background Service for pinging
builder.Services.AddHostedService<PingBackgroundService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("Content-Disposition"));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply CORS policy before authorization
app.UseCors("AllowAnyOrigin");

app.UseAuthorization();

app.MapControllers();

// Get the application URL
var urls = app.Urls;
var baseUrl = urls.FirstOrDefault() ?? "https://localhost:7001";

app.Run();

// Background Service for pinging
public class PingBackgroundService : BackgroundService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<PingBackgroundService> _logger;
    private readonly string _baseUrl;

    public PingBackgroundService(IHttpClientFactory httpClientFactory, ILogger<PingBackgroundService> logger, IWebHostEnvironment env)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
        _baseUrl = env.IsDevelopment() ? "https://localhost:7001" : "https://emre-rntz.onrender.com";
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                var response = await client.GetAsync($"{_baseUrl}/api/ping");
                _logger.LogInformation($"Ping response: {response.StatusCode}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Ping failed: {ex.Message}");
            }

            // Wait for 14 minutes
            await Task.Delay(TimeSpan.FromMinutes(14), stoppingToken);
        }
    }
}