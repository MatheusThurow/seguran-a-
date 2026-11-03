# Compras Seguras

## Apresentação

O **Compras Seguras** é um projeto educativo que utiliza uma simulação de compra online para incentivar a identificação de sinais de risco em ofertas na internet.

O participante observa um anúncio, investiga uma loja fictícia e decide se deseja continuar ou interromper a compra. A experiência inclui questionários, orientações e explicações sobre os sinais encontrados.

**Toda a compra é simulada. Não há pagamento ou entrega real.**

🔗 **[Acessar o site](https://matheusthurow.github.io/seguran-a-/)**  
📊 **[Consultar os resultados gerais](https://matheusthurow.github.io/seguran-a-/resultados.html)**

## Problema abordado

Descontos expressivos, mensagens de urgência e páginas com aparência convincente podem dificultar a avaliação de uma oferta.

O projeto oferece um ambiente de prática no qual o participante pode observar esses elementos e exercitar verificações antes de tomar uma decisão.

## Objetivo geral

Promover a educação para compras online mais seguras por meio de uma experiência interativa de investigação e tomada de decisão.

## Objetivos específicos

- Incentivar a comparação de preços e a reflexão diante de mensagens de urgência.
- Orientar a verificação do endereço da loja, dos dados da empresa e das avaliações.
- Destacar a importância de conferir as condições de pagamento e o destinatário do Pix.
- Personalizar o produto apresentado conforme a faixa etária.
- Comparar o desempenho nos questionários inicial e final.
- Disponibilizar resultados para análise descritiva das participações.

## Público e personalização

A atividade contempla diferentes faixas etárias. O participante informa sua faixa na abertura, e o sistema define automaticamente o produto apresentado.

| Faixa etária | Produto |
|---|---|
| Menores de 18 anos | PlayStation 5 (PS5) |
| 18 a 29 anos | Fritadeira elétrica (Air Fryer) |
| 30 a 44 anos | Máquina de lavar |
| 45 a 59 anos | Geladeira |
| 60 anos ou mais | Jogo de cama |

O mesmo produto acompanha o participante no anúncio, na loja e no resumo do pedido, sem seleção manual do item.

Os preços são definidos para a atividade e não representam ofertas comerciais reais.

## Etapas da atividade

1. **Boas-vindas:** apresentação da proposta e informação da faixa etária.
2. **Questionário inicial:** três perguntas sobre segurança em compras online.
3. **Guia de segurança:** orientações baseadas em “Pare, confira e compre”.
4. **Anúncio:** apresentação da oferta correspondente à faixa etária.
5. **Loja fictícia:** investigação do produto, preço, endereço, empresa e avaliações.
6. **Pagamento fictício:** análise das condições de pagamento e do destinatário.
7. **Revisão das escolhas:** explicações das pistas e apresentação das interações registradas.
8. **Questionário final:** três perguntas para comparação com o desempenho inicial.
9. **Resultado:** pontuações, respostas explicadas e orientações para compartilhar.

O participante pode desistir por suspeita no anúncio, na loja ou no pagamento e seguir para o encerramento educativo.

## Funcionalidades

- Ofertas automáticas por faixa etária.
- Imagens e preços específicos para cada produto.
- Questionários inicial e final.
- Guia de segurança disponível durante a investigação.
- Painéis explicativos sobre sete sinais de risco:
  - Preço.
  - Urgência.
  - Endereço da loja.
  - Dados da empresa.
  - Avaliações.
  - Condições de pagamento.
  - Destinatário do pagamento.
- Consulta de endereço pelo CEP usando o ViaCEP.
- Frete e prazo de entrega simulados.
- Registro de interações e tempo de análise com a aba visível.
- Comparação entre as pontuações inicial e final.
- Cópia e compartilhamento das orientações.
- Painel público com indicadores, gráficos, filtros e exportação em CSV.
- Layout responsivo.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e layout responsivo |
| JavaScript | Navegação, questionários e regras da atividade |
| Node.js | Servidor local e testes automatizados |
| Firebase Authentication | Autenticação anônima |
| Cloud Firestore | Armazenamento das participações |
| Firebase Analytics / Google Analytics 4 | Eventos de uso |
| ViaCEP | Consulta de endereço |
| Git e GitHub | Versionamento |
| GitHub Pages | Hospedagem |
| GitHub Actions | Testes e publicação automatizada |

A interface foi desenvolvida sem framework. Os serviços Firebase são carregados por CDN.

## Dados e resultados

A sessão atual é registrada no armazenamento local do navegador. Ao concluir o questionário final, o sistema tenta enviar ao Firestore:

- Respostas e pontuações.
- Decisão tomada na simulação.
- Faixa etária.
- Eventos de interação.
- Tempos da atividade.

A interface informa se o envio foi concluído e permite tentar novamente em caso de falha.

Não são solicitados nome, documento ou dados bancários. O CEP é enviado ao ViaCEP para consulta; o CEP e o endereço consultado não fazem parte da participação enviada ao Firestore.

O painel possui acesso público. As regras incluídas no projeto permitem leitura pública das participações e vinculam a criação à autenticação anônima. Atualização e exclusão pelo cliente são bloqueadas. O funcionamento depende das configurações efetivamente publicadas no Firebase.

Recarregar a página inicia uma nova sessão, sem retomada automática da anterior.

## Como executar localmente

**Pré-requisito:** Node.js 22, versão utilizada no fluxo de publicação.

Na pasta do projeto, execute:

```sh
npm start
```

Depois, acesse:

```text
http://localhost:8080/
```

Para encerrar o servidor, pressione `Ctrl+C`.

Não é necessário instalar dependências para iniciar o servidor local. A aplicação deve ser aberta pelo servidor, pois utiliza módulos JavaScript. As integrações externas precisam de conexão com a internet.

## Estrutura do projeto

```text
assets/                 Imagens dos produtos e identidade visual
css/                    Estilos da atividade e dos resultados
js/
  app.js                Telas, navegação e interações
  model.js              Questionários e modelo da sessão
  offers.js             Produtos e preços por faixa etária
  storage.js            Envio das participações
  results.js            Indicadores, gráficos e exportação
  firebase-app.js       Inicialização do Firebase
  analytics.js          Eventos de uso
  analytics-config.js   Configuração da integração
tests/                  Testes automatizados
.github/workflows/      Publicação automatizada
index.html              Página principal
resultados.html         Painel de resultados
server.mjs              Servidor local
firestore.rules         Regras de acesso ao banco
```

Os arquivos de Supabase presentes no repositório pertencem a uma integração anterior. O envio atual utiliza Firestore.

## Testes e avaliação

Para executar os testes automatizados:

```sh
npm test
```

Os testes verificam pontuações, eventos, contagem de tempo, seleção dos produtos por faixa etária e consistência das informações apresentadas.

Esses testes não substituem avaliações de usabilidade com participantes nem inspeção visual em diferentes dispositivos.

A comparação dos questionários descreve o desempenho imediato na sessão. Uma melhora de pontuação não comprova retenção posterior ou eficácia educativa de longo prazo. Abrir uma pista ou permanecer mais tempo na loja também não comprova reconhecimento do risco.

O painel pode conter participações de demonstração e teste, que devem ser consideradas na interpretação dos indicadores.

## Possibilidades de continuidade

- Realizar uma aplicação piloto com participantes.
- Avaliar a compreensão das perguntas e explicações.
- Ampliar a verificação de acessibilidade.
- Testar a experiência em diferentes dispositivos.
- Separar registros de teste de uma futura coleta acadêmica.
- Avaliar o aprendizado após um intervalo de tempo.

## Mensagem central

**PARE:** diante de preços muito baixos e pressão para decidir.

**CONFIRA:** endereço oficial, empresa, reputação e destinatário do pagamento.

**COMPRE:** somente depois de verificar; se houver suspeita, interrompa.
