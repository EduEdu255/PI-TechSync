# Backend Techsync

Trata-se de API REST para realização de consultas de vôos para companhias aéreas usando framework Laravel

## Instalação
1. Renomear o arquivo `.env.example` para `.env`

2. Executar na pasta do backend o comando `composer install`

3. Depois de finalizada a instalação, executar o comando `php artisan jwt:secret`

4. Configurar a conexão com o banco de dados no arquivo localizado em `config/database.php`

5. Criar o banco de dados informado e depois rodar o comando de criação das tabelas `php artisan migrate`

6. Editar o arquivo `.env` para inserir informações sobre API de Voos Amadeus (`AMADEUS_API_KEY` e `AMADEUS_API_SECRET`).
   As chaves da API podem ser obtidos, após o cadastro, no site [Amadeus for Developers](https://developers.amadeus.com/my-apps), após criar um novo APP no site (gratuito).

7. Subir o servidor, com o comando `php artisan serve`. O servidor deve subir na porta 8000, sendo os endpoints acessíveis através do [http://localhost:8000/docs/api](http://localhost:8000/docs/api) (pode demorar a carregar).


