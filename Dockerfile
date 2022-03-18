FROM mcr.microsoft.com/playwright:v1.20.0-focal

RUN apt-get update && apt-get install -y \
  curl \
  gnupg \
  git \
  vim \
  lsb-release

RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg \
  && mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg \
  && echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs)-prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list

RUN apt-get update && apt-get install -y \
  azure-functions-core-tools \
  dotnet-sdk-2.1

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
     AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY package.json ./
RUN npm install
COPY . . 
