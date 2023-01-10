# Simple Decrypt Database
 Decript database names


Projeto criado para descriptografar dados de um serviço.

Este projeto pega o json gerado pelo banco de dados e descriptografa os parâmetros 'full_name' e 'nickname' e depois retorna uma instrução sql para que possa ser inserida no banco de dados e modificar os registros.


Para iniciar:
* yarn install
* coloque as variaveis no .env
* inicie o arquivo index.js


! Note:
* Todos os arquivos criptografados enviados são de um banco local onde não há importância divulgar, mesmo que você ache as chaves que o gerou você verá diversos nomes ficticios sem sentido algum...