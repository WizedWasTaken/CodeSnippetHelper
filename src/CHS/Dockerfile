# Base image for both Node and .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-backend
WORKDIR /src

# Copy the .NET backend source code
COPY ["CHS.API/CHS.API.csproj", "CHS.API/"]
COPY ["CHS.DataAccess/CHS.DataAccess.csproj", "CHS.DataAccess/"]
COPY ["CHS.Entities/CHS.Entities.csproj", "CHS.Entities/"]
RUN dotnet restore "./CHS.API/CHS.API.csproj"

# Copy the remaining backend source code and build
COPY . .
WORKDIR "/src/CHS.API"
RUN dotnet build "./CHS.API.csproj" -c Release -o /app/build
RUN dotnet publish "./CHS.API.csproj" -c Release -o /app/publish

# Build the frontend using Node.js
FROM node:18-alpine AS build-frontend
WORKDIR /app

# Copy the frontend source code and install dependencies
COPY CHS.Client/client/package*.json ./
RUN npm install

# Copy the remaining frontend source code and build
COPY CHS.Client/client/ .
RUN npm run build

# Final stage: create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

RUN apt-get update && apt-get install -y nodejs npm

# Copy the published backend code
COPY --from=build-backend /app/publish ./backend

# Copy the built frontend code
COPY --from=build-frontend /app/.next ./frontend

# Expose ports for both applications
EXPOSE 5003 3003

# Start both the backend and frontend servers
CMD ["sh", "-c", "dotnet ./backend/CHS.Api.dll & npm run start --prefix /app/frontend"]
