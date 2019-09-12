FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["Rashtan.AuditStory.API/Rashtan.AuditStory.API.csproj", "Rashtan.AuditStory.API/"]
COPY ["Rashtan.AuditStory.Payment/Rashtan.AuditStory.Payment.fsproj", "Rashtan.AuditStory.Payment/"]
COPY ["Rashtan.AuditStory.Dto/Rashtan.AuditStory.Dto.fsproj", "Rashtan.AuditStory.Dto/"]
COPY ["Rashtan.AuditStory.Workflows/Rashtan.AuditStory.Workflows.fsproj", "Rashtan.AuditStory.Workflows/"]
COPY ["Rashtan.AuditStory.Repository.Interface/Rashtan.AuditStory.Repository.Interface.csproj", "Rashtan.AuditStory.Repository.Interface/"]
COPY ["Rashtan.AuditStory.DbModel/Rashtan.AuditStory.DbModel.fsproj", "Rashtan.AuditStory.DbModel/"]
COPY ["Rashtan.AuditStory.DtoDbMapper/Rashtan.AuditStory.DtoDbMapper.fsproj", "Rashtan.AuditStory.DtoDbMapper/"]
COPY ["Rashtan.AuditStory.Common/Rashtan.AuditStory.Common.fsproj", "Rashtan.AuditStory.Common/"]
COPY ["Rashtan.AuditStory.DtoValidation/Rashtan.AuditStory.DtoValidation.fsproj", "Rashtan.AuditStory.DtoValidation/"]
COPY ["Rashtan.AuditStory.MongoRepository/Rashtan.AuditStory.MongoRepository.csproj", "Rashtan.AuditStory.MongoRepository/"]
RUN dotnet restore "Rashtan.AuditStory.API/Rashtan.AuditStory.API.csproj"
COPY . .
WORKDIR "/src/Rashtan.AuditStory.API"
RUN dotnet build "Rashtan.AuditStory.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Rashtan.AuditStory.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Rashtan.AuditStory.API.dll"]