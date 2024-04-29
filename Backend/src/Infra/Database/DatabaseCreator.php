<?php

namespace App\Infra\Database;

class DatabaseCreator
{
    const SQLITE = 'sqlite';
    const SQL = 'sql';
    private \PDO $connection;
    public function __construct(private string $dbType)
    {
        $this->connection = DatabaseManager::getInstance();
    }
    public function down()
    {
        $sql = 'DROP TABLE IF EXISTS trecho_voo;
                DROP TABLE IF EXISTS trecho;
                DROP TABLE IF EXISTS voo;
                DROP TABLE IF EXISTS passagem;
                DROP TABLE IF EXISTS passageiro;
                DROP TABLE IF EXISTS aeronave;
                DROP TABLE IF EXISTS cia_aerea;
                DROP TABLE IF EXISTS usuario;
        ';
        $this->connection->exec($sql);
    }
    public function up()
    {
        $this->down();
        try {
            $this->createTableUsuario();
            $this->createTableAeronave();
            $this->createTableCiaAerea();
            $this->createTablePassageiro();
            $this->createTablePassagem();
            $this->createTableVoo();
            $this->createTableTrecho();
            $this->createTableTrechoVoo();
        } catch (\Exception $e) {
            echo "Erro ao criar tabelas do banco de dados: " . $e->getMessage() . $e->getTraceAsString();
        }
        return;
    }
    private function createTableUsuario()
    {
        $sql = "DROP TABLE IF EXISTS usuario;
            CREATE TABLE usuario (
            id INTEGER PRIMARY KEY,
            nome VARCHAR(80),
            email VARCHAR(40),
            senha VARCHAR(10),
            cpf CHAR(11),
            telefone VARCHAR (15),
            logradouro VARCHAR(80),
            numero_endereco VARCHAR (4),
            municipio VARCHAR(50),
            uf CHAR(2),
            data_hora_cadastro DATE
        );";
        $this->connection->exec($sql);
    }
    private function createTablePassagem()
    {
        $sql = "CREATE TABLE passagem (
            id INTEGER PRIMARY KEY,
            id_usuario_comprador INTEGER,
            valor DECIMAL(7,2),
            id_passageiro INTEGER,
            id_cia_aerea INTEGER,
            data_compra DATE";

        if ($this->dbType == self::SQLITE) {
            $sql .=  ',
                FOREIGN KEY (id_cia_aerea) REFERENCES cia_aerea(id),
                FOREIGN KEY (id_usuario_comprador) REFERENCES usuario(id),
                FOREIGN KEY (id_passageiro) REFERENCES passageiro(id)
            );
                ';
        } else {
            $sql .= ');
         
                ALTER TABLE passagem ADD CONSTRAINT FK_passagem_2
                    FOREIGN KEY (id_cia_aerea)
                    REFERENCES cia_aerea (id)
                    ON DELETE CASCADE;
                 
                ALTER TABLE passagem ADD CONSTRAINT FK_passagem_3
                    FOREIGN KEY (id_usuario_comprador)
                    REFERENCES usuario (id);
                 
                ALTER TABLE passagem ADD CONSTRAINT FK_passagem_4
                    FOREIGN KEY (id_passageiro)
                    REFERENCES passageiro (id);';
        }

        $this->connection->exec($sql);
    }
    private function createTableCiaAerea()
    {
        $sql = "CREATE TABLE cia_aerea (
            id INTEGER PRIMARY KEY,
            cnpj CHAR(14),
            razao_social VARCHAR(80),
            telefone VARCHAR(15),
            email VARCHAR(60),
            codigo_iata VARCHAR(4)
        );";
        $this->connection->exec($sql);
    }
    private function createTablePassageiro()
    {
        $sql = "CREATE TABLE passageiro (
            id INTEGER PRIMARY KEY,
            nome VARCHAR(80),
            cpf CHAR(11),
            email VARCHAR(60),
            telefone VARCHAR(15),
            telefone_contato VARCHAR(15)
        );";
        $this->connection->exec($sql);
    }
    private function createTableAeronave()
    {
        $sql = "CREATE TABLE aeronave (
            id INTEGER PRIMARY KEY,
            sigla CHAR(4),
            quantidade_assentos INTEGER,
            marca VARCHAR(20),
            quantidade_fileiras INTEGER,
            quantidade_colunas INTEGER,
            assentos_prioritarios INTEGER,
            assentos_por_fila INTEGER,
            assentos_por_coluna INTEGER
        );";
        $this->connection->exec($sql);
    }
    private function createTableVoo()
    {
        $sql = "CREATE TABLE voo (
            id INTEGER PRIMARY KEY,
            id_aeronave INTEGER,
            id_companhia INTEGER,
            numero INTEGER,
            cod_origem CHAR(3),
            cod_destino CHAR(3),
            data_hora_saida DATE,
            data_hora_chegada DATE,
            tempo_voo INTEGER";
        if ($this->dbType == self::SQLITE) {
            $sql .= ',
            FOREIGN KEY (id_aeronave) REFERENCES aeronave(id),
            FOREIGN KEY (id_companhia) REFERENCES cia_aerea(id)
        );';
        } else {
            $sql .= '
        );
         
        ALTER TABLE voo ADD CONSTRAINT FK_voo_2
            FOREIGN KEY (id_aeronave)
            REFERENCES aeronave (id);
         
        ALTER TABLE voo ADD CONSTRAINT FK_voo_3
            FOREIGN KEY (id_companhia)
            REFERENCES cia_aerea (id);';
        }
        $this->connection->exec($sql);
    }
    private function createTableTrecho()
    {
        $sql = "CREATE TABLE trecho (
            id INTEGER PRIMARY KEY,
            id_passagem INTEGER,
            assento VARCHAR(3)
        
        ";

        if ($this->dbType == self::SQLITE) {
            $sql .= ',
            FOREIGN KEY (id_passagem) REFERENCES passagem(id)
        );';
        } else {
            $sql .= ');
         
            ALTER TABLE trecho ADD CONSTRAINT FK_trecho_2
                FOREIGN KEY (id_passagem)
                REFERENCES passagem (id);';
        }
        $this->connection->exec($sql);
    }
    private function createTableTrechoVoo()
    {
        $sql = "CREATE TABLE trecho_voo (
            id_trecho INTEGER,
            id_voo INTEGER,
            id INTEGER PRIMARY KEY,
            UNIQUE (id_voo, id_trecho)
        ";


        if ($this->dbType == self::SQLITE) {
            $sql .= ',
                FOREIGN KEY (id_trecho) REFERENCES trecho(id),
                FOREIGN KEY (id_voo) REFERENCES voo(id)
            );';
        } else {
            $sql .= ');
         
                ALTER TABLE trecho_voo ADD CONSTRAINT FK_trecho_voo_1
                    FOREIGN KEY (id_trecho)
                    REFERENCES trecho (id)
                    ON DELETE RESTRICT;
                 
                ALTER TABLE trecho_voo ADD CONSTRAINT FK_trecho_voo_2
                    FOREIGN KEY (id_voo)
                    REFERENCES voo (id)
                    ON DELETE RESTRICT;';
        }
        $this->connection->exec($sql);
    }
}
