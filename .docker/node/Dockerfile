FROM node:18-slim
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

ENV TZ Asia/Tokyo

WORKDIR /app

RUN apt-get update -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false && \
    apt-get -y --no-install-recommends install git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# uid=1000
USER node
