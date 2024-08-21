#!/bin/sh

# Função para verificar se todos os pods estão prontos
check_pods_ready() {
  echo "Verificando se todos os pods estão prontos..."
  local namespace=$1
  local timeout=$2
  local start_time=$(date +%s)

  while true; do
    local elapsed_time=$(($(date +%s) - start_time))
    if [ "$elapsed_time" -ge "$timeout" ]; then
      echo "Tempo limite de verificação excedido."
      return 1
    fi

    # Verifica o status dos pods
    if kubectl get pods --namespace "$namespace" | grep -E '0/1'; then
      echo "Alguns pods ainda não estão prontos. Verificando novamente em 10 segundos..."
      sleep 10
    else
      echo "Todos os pods estão prontos."
      return 0
    fi
  done
}

# Remove releases existentes
helm delete frontend
helm delete backend
helm delete postgres

# Instala o PostgreSQL
cd postgresql-helm || { echo "Failed to cd to postgresql-helm"; exit 1; }
helm install postgres . -f values.yaml
cd ..

# Instala o backend
cd back-helm || { echo "Failed to cd to back-helm"; exit 1; }
helm install backend . -f values.yaml
cd ..

# Instala o frontend
cd frontend-helm || { echo "Failed to cd to frontend-helm"; exit 1; }
helm install frontend . -f values.yaml

# Aguarda até que todos os pods estejam prontos
echo "Aguardando até que todos os pods estejam prontos..."
if check_pods_ready "default" 300; then
  echo "Todos os pods estão prontos. Iniciando o port-forwarding."

  
  echo "Acesse o frontend em http://localhost:3000"

  
  # Inicia o port-forwarding
  kubectl port-forward --namespace default svc/frontend-frontend-helm 3000:3000



else
  echo "Não foi possível garantir que todos os pods estão prontos. Abortando o port-forwarding."
  exit 1
fi
