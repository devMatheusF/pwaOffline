# Aplicação de Notas Offline com IndexedDB e PWA

Este projeto demonstra uma aplicação web simples que funciona **completamente offline**, utilizando **IndexedDB** para persistência local de dados e configurado como uma **Progressive Web App (PWA)** para garantir que todos os recursos estejam disponíveis mesmo sem conexão à internet.

---

## Tecnologias utilizadas

- **HTML, CSS e JavaScript Vanilla**
- **IndexedDB** para persistência offline estruturada
- **Service Worker** para controle de cache offline
- **Manifest.json** para transformar em PWA

---

## Conceitos-chave

### Offline-First

A proposta **offline-first** é uma abordagem onde a aplicação é projetada desde o início para funcionar mesmo sem acesso à internet, garantindo:

- Continuidade de uso sem interrupções;
- Armazenamento local seguro;
- Sincronização posterior (quando necessário).

Essa abordagem é útil principalmente em ambientes com conectividade limitada ou intermitente.

### IndexedDB

O IndexedDB é uma API nativa dos navegadores que permite o armazenamento de dados estruturados de forma assíncrona. Seus principais benefícios são:

- Armazenamento local escalável;
- Suporte a objetos complexos;
- Operações assíncronas;
- Indexação de dados para consultas rápidas;
- Suporte a múltiplas transações seguras.

### Progressive Web App (PWA)

Com o uso de PWA, sua aplicação pode ser:

- Instalada como um app no dispositivo do usuário;
- Executada em tela cheia, sem a barra do navegador;
- Acessada offline, mesmo após reiniciar o dispositivo.

Componentes essenciais para isso:

- `manifest.json`: define comportamento e aparência da aplicação;
- `service-worker.js`: intercepta requisições e entrega recursos do cache quando offline.

---

## Quando usar esse tipo de abordagem?

Essa arquitetura é indicada em aplicações:

- Utilizadas em campo (vendas, inspeções, cadastros);
- Que exigem resposta imediata e autonomia da rede;
- Que funcionam como ferramentas pessoais de produtividade (notas, tarefas, controle financeiro).

---

## 📂 Estrutura do Projeto

```bash
📁 public/
  ├── index.html
  ├── manifest.json
  ├── service-worker.js
📁 src/
  └── app.js
