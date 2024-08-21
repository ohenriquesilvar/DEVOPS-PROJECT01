
#!/bin/sh

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

# Aguarda 5 segundos
echo "Aguardando 10 segundos para garantir que os serviços estejam prontos..."
sleep 10

echo "Port-forwarding do frontend iniciado. Acesse http://localhost:3000 para visualizar o frontend."

# Inicia o port-forwarding
kubectl port-forward --namespace default svc/frontend-frontend-helm 3000:3000


