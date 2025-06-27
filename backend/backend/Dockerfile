# Base image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["Loginoperations.csproj", "./"]
RUN dotnet restore "Loginoperations.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "Loginoperations.csproj" -c Release -o /app/build

# Publish image
FROM build AS publish
RUN dotnet publish "Loginoperations.csproj" -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "Loginoperations.dll"] 