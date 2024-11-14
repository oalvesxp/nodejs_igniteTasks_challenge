# Ignite Tasks

Desafio do módulo Fundamentos do Node.js do curso da Rocketseat

## Sobre o Desafio

Nesse desafio você desenvolverá uma API para realizar o CRUD de suas _tasks_ (tarefas).

A API deve conter as seguintes funcionalidades:

- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV

### Rotas e regras de negócio

Antes das rotas, vamos entender qual a estrutura (propriedades) que uma task deve ter:

- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

#### Rotas

- `POST - /tasks` </br>

  Deve ser possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição. </br>
  Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.

  ***

- `GET - /tasks` </br>

  Deve ser possível listar todas as tasks salvas no banco de dados. </br>
  Também deve ser possível realizar uma busca, filtrando as tasks pelo `title` e `description`

  ***

- `PUT - /tasks/:id` </br>

  Deve ser possível atualizar uma task pelo `id`. </br>
  No `body` da requisição, deve receber somente o `title` e/ou `description` para serem atualizados. </br>
  Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa. </br>
  Antes de realizar a atualização, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

  ***

- `DELETE - /tasks/:id` </br>

  Deve ser possível remover uma task pelo `id`. </br>
  Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

  ***

- `PATCH - /tasks/:id/complete` </br>

  Deve ser possível marcar a task como completa ou não. Isso significa que se a task estiver concluída, deve voltar ao seu estado “normal”. </br>
  Antes da alteração, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

### E a importação do CSV?

Normalmente em uma API, a importação de um CSV acontece enviando o arquivo pela rota, por meio de outro formato, chamado `multipart/form-data`.

## Indo além

Algumas sugestões do que pode ser implementado:

- Validar se as propriedades `title` e `description` das rotas `POST` e `PUT` estão presentes no `body` da requisição. </br>
- Nas rotas que recebem o `/:id`, além de validar se o `id` existe no banco de dados, retornar a requisição com uma mensagem informando que o registro não existe.
