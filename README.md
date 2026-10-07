# Compras Seguras

Protótipo educativo em português, HTML/CSS/JavaScript, sem dependências de instalação, backend de dados ou operação financeira. Usa ViaCEP para consulta de endereço e oferece integração opcional com GA4. Versão 1.0.0.

## Abrir

É necessário Node.js 18 ou mais recente. Abra um terminal nesta pasta e execute:

```powershell
node server.mjs
```

Abra http://localhost:8080 no navegador. Para encerrar o servidor, pressione Ctrl+C. Não abra index.html diretamente: módulos JavaScript precisam de servidor HTTP.

Para usar um celular na mesma rede, abra `http://IP-DO-COMPUTADOR:8080`. A rede e o firewall devem permitir esse acesso. O servidor serve arquivos estáticos; não recebe registros dos participantes. Compartilhamento e área de transferência dependem do navegador e de contexto seguro (HTTPS ou localhost). Se não disponíveis, há um campo de texto para cópia manual.

## Usar e reiniciar

Começar → três perguntas iniciais → guia → anúncio → loja → pagamento fictício → espelho → três perguntas finais → resultado. Desistir por suspeita está disponível no anúncio, na loja e no pagamento e leva ao mesmo encerramento educativo. No resultado, “Praticar novamente” cria outra sessão. Recarregar também inicia uma sessão nova.

Somente a sessão atual é salva sob a chave `compras-seguras-session` do armazenamento local. Não há retomada após recarregar, histórico acumulado. A coleta de métricas centralizadas depende da configuração opcional do GA4. “Apagar registro local” remove o registro salvo. A atividade permanece em memória até recarregar ou reiniciar. Se o armazenamento estiver indisponível, a jornada continua em memória.

## Verificar

```powershell
node --test tests/model.test.mjs
node --check js/app.js
```

Consulte `docs/validacao.md` para evidências e pendências. Testes do modelo não substituem avaliação visual, navegação por teclado, Android, iPhone ou piloto. Nenhuma conformidade global de acessibilidade é declarada.

## Arquivos

- `index.html`, `css/main.css`: estrutura, componentes e layout responsivo.
- `js/model.js`: conteúdo, quizzes, eventos únicos e relógio de análise.
- `js/app.js`: nove telas, painéis modais, feedback e compartilhamento.
- `assets/fritadeira.svg`: ilustração local do produto fictício.
- `tests/model.test.mjs`: testes de lógica com relógio controlado.
- `docs/roteiro.md`: conteúdo, estados e roteiro da oficina.
- `docs/validacao.md`: registro dos testes, escopo das evidências e limitações.

A atividade usa um guia textual. O GA4 é opcional; consulte as instruções abaixo.

## Google Analytics 4 e armazenamento

O localStorage usa a chave compras-seguras-session e guarda a sessão atual (respostas, notas, eventos e tempo). Esses dados ficam no navegador, não na pasta do projeto nem no Git. O CEP e o endereço ficam em memória; o CEP é enviado ao ViaCEP para consultar o endereço.

Para ativar GA4, preencha measurementId em js/analytics-config.js com o ID G-XXXXXXXXXX do fluxo Web. Sem ID, nenhum script do Analytics é carregado. O ID é público e pode entrar no Git; nunca coloque credenciais ou API secrets no frontend.

A integração envia activity_step e os eventos do modelo, com etapa, duração e pontuação dos questionários. Não envia CEP, endereço, respostas individuais ou ID interno da sessão. A confirmação fictícia usa aceitou_pix_suspeito, não purchase.

No GA4, valide em Tempo real ou DebugView (debug: true na configuração durante o teste; desative depois). Cadastre dimensões/métricas personalizadas para activity_stage, quiz_score e analysis_ms se precisar usá-las nos relatórios. Desative a coleta automática de interações com formulários na medição otimizada do fluxo para evitar coletar informações dos campos.

GA4 serve para métricas agregadas; não é um backup completo dos registros individuais. Bloqueadores e falhas de rede podem impedir o envio.

## Git

Versione os arquivos do projeto; não há dados de participantes nesses arquivos. O .gitignore exclui logs, dependências e arquivos de ambiente. Para publicar, crie um repositório e configure seu remoto; salvar no Git não hospeda o site.

## Supabase

Esta aplicação usa a API REST, sem Next.js ou middleware. A configuração pública está em js/supabase-config.js. Execute supabase/setup.sql uma vez no SQL Editor do projeto para criar participacoes e sua política de acesso. Visitantes podem apenas inserir; não ler, alterar ou apagar resultados. A chave pública não permite executar esse SQL.

O envio ocorre ao responder o questionário final. A tela mostra sucesso ou falha e permite tentar novamente, mantendo o mesmo ID para evitar duplicação. Sem envio concluído, o registro permanece no armazenamento local da sessão; não há reenvio automático após recarregar. Participações incompletas não são enviadas.

Em Table Editor → participacoes você poderá consultar e exportar os resultados. CEP e endereço não são enviados. A coleta pública permite envios fabricados por terceiros; antes de uma aplicação pública em grande escala, acrescente validação e proteção contra abuso no servidor.
