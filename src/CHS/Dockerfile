# Use the official .NET SDK 8.0 as a build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /CHS

# Copy the .csproj files and restore dependencies
COPY ["CHS.API/CHS.API.csproj", "CHS.API/"]
COPY ["CHS.DataAccess/CHS.DataAccess.csproj", "CHS.DataAccess/"]
COPY ["CHS.Entities/CHS.Entities.csproj", "CHS.Entities/"]
RUN dotnet restore "CHS.API/CHS.API.csproj"

# Copy the rest of the application code and build the application
COPY . .
WORKDIR "/CHS/CHS.API"
RUN dotnet build "CHS.API.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "CHS.API.csproj" -c Release -o /app/publish

# Use the official ASP.NET Core runtime 8.0 as a base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CHS.API.dll"]
