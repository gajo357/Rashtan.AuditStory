#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Rashtan.AuditStory.API/Rashtan.AuditStory.API.csproj", "Rashtan.AuditStory.API/"]
COPY ["Rashtan.AuditStory.Workflows/Rashtan.AuditStory.Workflows.fsproj", "Rashtan.AuditStory.Workflows/"]
COPY ["Rashtan.AuditStory.Repository.Interface/Rashtan.AuditStory.Repository.Interface.csproj", "Rashtan.AuditStory.Repository.Interface/"]
COPY ["Rashtan.AuditStory.Dto/Rashtan.AuditStory.Dto.fsproj", "Rashtan.AuditStory.Dto/"]
COPY ["Rashtan.AuditStory.PaypalPayment/Rashtan.AuditStory.PaypalPayment.csproj", "Rashtan.AuditStory.PaypalPayment/"]
COPY ["Rashtan.AuditStory.Common/Rashtan.AuditStory.Common.fsproj", "Rashtan.AuditStory.Common/"]
COPY ["Rashtan.AuditStory.DtoValidation/Rashtan.AuditStory.DtoValidation.fsproj", "Rashtan.AuditStory.DtoValidation/"]
COPY ["Rashtan.AuditStory.MongoRepository/Rashtan.AuditStory.MongoRepository.csproj", "Rashtan.AuditStory.MongoRepository/"]
RUN dotnet restore "Rashtan.AuditStory.API/Rashtan.AuditStory.API.csproj"
COPY . .
WORKDIR "/src/Rashtan.AuditStory.API"
RUN dotnet build "Rashtan.AuditStory.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Rashtan.AuditStory.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Rashtan.AuditStory.API.dll"]