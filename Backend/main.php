<?php

use App\Entities\Aeronave;
use App\Entities\CiaAerea;
use App\Entities\Passageiro;
use App\Entities\Trecho;
use App\Entities\Usuario;
use App\Entities\Voo;
use App\Infra\Database\DatabaseCreator;
use App\Infra\Database\DatabaseManager;

require 'autoloader.php';


$db = DatabaseManager::getInstance();
try {
    $db->query('SELECT * FROM usuario');
} catch (\PDOException $e) {
    $creator = new DatabaseCreator(DatabaseCreator::SQLITE);
    $creator->up();
}

$A320 = new Aeronave("A320", 23, 6, 6);
$cia = new CiaAerea("Gol Linhas Aéreas", "12345678963541", "G3");
$voo = new Voo(1083, "JUA", "GRU", $A320, $cia);
$voo->setDataHoraSaida(new DateTimeImmutable());
$voo->setDataHoraChegada((DateTimeImmutable::createFromInterface(new DateTime())->add(new \DateInterval("PT3H"))));
$user = new Usuario("anon@anon.com", "Anonymous");
$user->setCpf("12345678912")->setTelefone("88997711335")->setLogradouro("São Miguel");
$passageiro = new Passageiro($user->getNome(), $user->getCpf(), $user->getTelefone());
$passageiro2 = new Passageiro("Passageiro 2", "78945612312", "123456783");
$passagem = $user->comprarPassagem(577.99, $passageiro, [$voo], $cia);
$passagem = $user->comprarPassagem(585.99, $passageiro2, [$voo], $cia);
$user->marcarAssento($passageiro, "5D", $passagem->getTrechos()[0]);
$user->marcarAssento($passageiro2, "23F", $passagem->getTrechos()[0]);
echo "Vôo saindo de {$voo->getCodigoOrigem()} para {$voo->getCodigoDestino()}, no dia {$voo->getDataHoraSaida()->format('d/m/Y')} com {$voo->getQuantidadeAssentosDisponiveis()} assentos disponíveis e {$voo->getQuantidadeAssentosOcupados()} assentos ocupados\n";
echo "Assentos Disponíveis\n";
foreach ($voo->getAssentosDisponiveis() as $disponivel) {
    echo $disponivel->getCodigo() . "\t";
}

echo "\nAssentos Ocupados\n";
foreach ($voo->getAssentosOcupados() as $ocupado) {
    echo $ocupado->getCodigo() . "\t" . $ocupado->getPassageiro()->getNome() . "\n";
}

$voo->printMapa();
