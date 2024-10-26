FROM continuumio/miniconda:latest

# Setting Environment Variables
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    CONDA_ALWAYS_YES=true \
    PYTHONDONTWRITEBYTECODE=1 \
    DEBIAN_FRONTEND=noninteractive \
    PATH=/opt/conda/bin:$PATH

# Install system dependencies
RUN apt-get update -o Acquire::AllowReleaseInfoChange=true && \
    apt-get upgrade -y && \
    apt-get install -y \
    cargo \
    curl \
    postgresql-client \
    bash && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    /opt/conda/bin/pip install --upgrade pip && \
    /opt/conda/bin/pip install psycopg2-binary


# Create necessary directories
RUN mkdir -p /backend

# Copy application code
COPY . /backend

# Static and media directories
RUN mkdir -p /backend/static-files /backend/media-files

# Setup scripts
RUN mkdir -p /scripts
COPY ./scripts /scripts
RUN chmod +x /scripts/wait-for-it.sh /scripts/dev.sh

# Copy the Conda requirements file
COPY ./requirements.yml /backend/requirements.yml

# Install Python dependencies in the conda environment
RUN conda env create -f /backend/requirements.yml && \
    conda clean -a && \
    echo "source activate voyex_22" > ~/.bashrc && \
    conda run -n voyex_22 python --version

# Switch to the backend directory
WORKDIR /backend

# Ensure the shell uses bash
SHELL ["/bin/bash", "-c"]
