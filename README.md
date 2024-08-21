# Projeto Helm Deployment

Aluno: Henrique Silva Rabelo - 202010698

Este projeto usa Helm para gerenciar a implantação de vários serviços no Kubernetes. O script `deploy.sh` automatiza a instalação dos charts Helm para PostgreSQL, backend e frontend. Abaixo estão as instruções para executar o script e informações sobre o uso de port-forwarding.

## Scripts e Comandos

- `deploy.sh`

Este script realiza as seguintes ações:

1. **Instala o PostgreSQL:**
   Navega até o diretório `postgresql-helm` e instala o chart Helm para PostgreSQL usando o arquivo `values.yaml`.

2. **Instala o Backend:**
   Navega até o diretório `back-helm` e instala o chart Helm para o backend usando o arquivo `values.yaml`.

3. **Instala o Frontend:**
   Navega até o diretório `frontend-helm` e instala o chart Helm para o frontend usando o arquivo `values.yaml`.

4. **Aguarda 5 segundos:**
   Este intervalo é para garantir que todos os serviços estejam totalmente iniciados antes de tentar o port-forwarding.

5. **Configura o Port-Forwarding:**
   Usa `kubectl port-forward` para encaminhar a porta `3000` do serviço `frontend-frontend-helm` para a porta `3000` local. Isso permite que o frontend seja acessado através do navegador local.

### Como Rodar o Script

1. **Clone o Repositório:**
   Clone o repositório contendo os charts Helm e o script `deploy.sh` para seu ambiente local.

2. **Torne o Script Executável e execute:**
   No terminal, navegue até o diretório onde o script está localizado e torne-o executável:

   ```sh
   chmod +x deploy.sh && ./deploy.sh
   ```

3. **Acesse o Frontend:**
   Após a execução do script, abra um navegador e acesse `http://localhost:3000` para visualizar o frontend.

## Explicação do Uso do Port-Forwarding

Problema com NodePort: A configuração do NodePort não estava permitindo o acesso externo ao serviço do frontend como esperado.
Port-Forwarding como Solução Temporária: O port-forwarding redireciona o tráfego da porta local para a porta do serviço no cluster Kubernetes, permitindo o acesso ao frontend através de http://localhost:3000 enquanto o problema com a configuração do NodePort é resolvido.
Se houver necessidade de acesso externo permanente, será necessário revisar e corrigir a configuração do NodePort ou considerar outras soluções como o uso de um LoadBalancer adequado ou Ingress Controller.
