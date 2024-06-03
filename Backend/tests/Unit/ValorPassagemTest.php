<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use DateTime;
use App\Models\Helpers\PassagemLocal;
use App\Models\CiaAerea;
use App\Models\Busca;

class ValorPassagemTest extends TestCase
{
    public function test_valor_passagem_aumenta_90_porcento_se_abaixo_de_2_meses_e_alta_estacao(): void
    {
        $passagem = new PassagemLocal(100,new CiaAerea(['razao_social' => 'Teste', 'cnpj' => 'teste']),"JDO","GRU",new DateTime('2024-07-12'),new DateTime('2024-08-14'),'P15',[],new Busca(['origem' => 'JDO', 'destino' => 'GRU']));
        $this->assertEquals(190, $passagem->getPreco());
    }
    public function test_valor_passagem_aumenta_30_porcento_se_abaixo_de_2_meses(): void
    {
        $passagem = new PassagemLocal(100,new CiaAerea(['razao_social' => 'Teste', 'cnpj' => 'teste']),"JDO","GRU",new DateTime('2024-06-12'),new DateTime('2024-07-14'),'P15',[],new Busca(['origem' => 'JDO', 'destino' => 'GRU']));
        $this->assertEquals(130, $passagem->getPreco());
    }

    public function test_valor_passagem_diminui_30_porcento_se_acima_de_6_meses(): void
    {
        $passagem = new PassagemLocal(100,new CiaAerea(['razao_social' => 'Teste', 'cnpj' => 'teste']),"JDO","GRU",new DateTime('2025-04-12'),new DateTime('2024-08-14'),'P15',[],new Busca(['origem' => 'JDO', 'destino' => 'GRU']));
        $this->assertEquals(70, $passagem->getPreco());
    }

    public function test_valor_passagem_dobra_se_na_proxima_semana(): void
    {
        $passagem = new PassagemLocal(100,new CiaAerea(['razao_social' => 'Teste', 'cnpj' => 'teste']),"JDO","GRU",new DateTime('2024-06-04'),new DateTime('2024-09-14'),'P15',[],new Busca(['origem' => 'JDO', 'destino' => 'GRU']));
        $this->assertEquals(200, $passagem->getPreco());
    }

    public function test_lanca_excecao_se_data_saida_e_no_passado(): void
    {
        $this->expectException('ValueError');
        $passagem = new PassagemLocal(100,new CiaAerea(['razao_social' => 'Teste', 'cnpj' => 'teste']),"JDO","GRU",new DateTime('2024-05-12'),new DateTime('2024-09-14'),'P15',[],new Busca(['origem' => 'JDO', 'destino' => 'GRU']));
    }

    public function test_valor_passagem_normal_se_acima_de_2_meses_e_abaixo_de_6_meses(): void
    {
        $passagem = new PassagemLocal(100,new CiaAerea(['razao_social' => 'Teste', 'cnpj' => 'teste']),"JDO","GRU",new DateTime('2024-09-12'),new DateTime('2024-09-14'),'P15',[],new Busca(['origem' => 'JDO', 'destino' => 'GRU']));
        $this->assertEquals(100, $passagem->getPreco());
    }

}
