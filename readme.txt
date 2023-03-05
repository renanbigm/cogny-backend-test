Para este desafio, implementei o código com uma CLI para facilitar a interação do usuário. 
Para executar a aplicação, basta abrir o terminal na pasta raiz do projeto e digitar o comando "node index.js".

Ao ser executado, o código irá pedir que você informe os anos que deseja calcular a soma da população. 
É importante mencionar que apenas os anos entre 2013 e 2020 são aceitos. 
Se não quiser digitar, basta pressionar Enter e será gerada a soma da população dos EUA entre os anos de 2018 a 2020.

Além disso, ao executar a aplicação, uma VIEW será criada automaticamente no banco de dados,
contendo a soma da população dos anos 2018, 2019 e 2020. Essa VIEW estará disponível para consultas futuras,
sem a necessidade de executar novamente o código para realizar a soma.

Com base nos anos informados, o código irá consumir a API disponibilizada e gravar o resultado na tabela "api_data" do banco de dados.
Em seguida, irá realizar a soma da propriedade "Population" dos anos informados e exibir o resultado no console.

-------------------------------------------------------------------------------------------------------------------
                                                    < Desafio >
1. Consumir a API (https://datausa.io/api/data?drilldowns=Nation&measures=Population) e gravar o resultado na tabela "api_data" no na coluna "doc_record".
Saida da API:
{"data":[{"ID Nation":"01000US","Nation":"United States","ID Year":2020,"Year":"2020","Population":326569308,"Slug Nation":"united-states"},...

2. Realizar a somatoria da propriedade "Population" dos anos 2020, 2019 e 2018 e appresentar o resultado no console.
Implementar de duas formas o algoritmo:
    a. em memoria no nodejs usando map, filter, for etc
    b. usando SELECT no postgres, pode fazer um SELECT inline no nodejs.
    c. usando SELECT no postgres, pode fazer uma VIEW no banco de dados.

Obrigatório:
Utilizar somente as libs instalas no projeto massivejs e axios.
Não instalar nenhuma outra lib de terceiro e não utilizar TypeScript.
Trocar a propriedade DATABASE_SCHEMA para o id do seu usuario do github.

Referencias:
https://massivejs.org/
https://axios-http.com/

Ferramentas:
https://tableplus.com/
Postgres: por utilizar o PG fornecido pela nuvem HEROKU a string de conexao está no arquivo .env
