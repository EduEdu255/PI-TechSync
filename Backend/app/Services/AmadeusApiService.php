<?php

namespace App\Services;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Carbon;

class AmadeusApiService
{

    private $base_url = "https://test.api.amadeus.com";
    private $token;
    public function __construct()
    {
        $token = Cache::get('amadeus_token');
        if (!!$token) {
            $expiration = $token['exp'];
            $exp = (new \DateTime())->setTimestamp($expiration);
            if ($exp < new \DateTime()) {
                $token = null;
                Cache::delete('amadeus_token');
            }
        }

        if (!$token) {
            $body = ["client_id" => env('AMADEUS_API_KEY'), 'client_secret' => env('AMADEUS_API_SECRET'), 'grant_type' => 'client_credentials'];
            $login = Http::asForm()->post("$this->base_url/v1/security/oauth2/token", $body);
            if ($login->ok()) {
                $response = $login->json();
                $actk = $response['access_token'];
                $exp = now()->addSeconds($response['expires_in'])->getTimestamp();
                $token = ['access_token' => $actk, 'exp' => $exp];
                Cache::set('amadeus_token', $token, $exp);
            } else {
                throw new AuthorizationException("Não foi possível logar na API Amadeus, verifique a configuração das credenciais");
            }
        }
        $this->token = $token['access_token'];
    }

    public function procuraVooGet(string $origem, string $destino, \DateTimeInterface $saida, \DateTimeInterface $retorno = null, array $cias = ['LA', 'G3', 'AD'])
    {
        $url = "$this->base_url/v2/shopping/flight-offers?originLocationCode=$origem&destinationLocationCode=$destino&departureDate={$saida->format('Y-m-d')}&adults=1&currencyCode=BRL&includedAirlineCodes=" . implode(',', $cias);
        if ($retorno) {
            $url .= "&returnDate={$retorno->format('Y-m-d')}";
        }
        $busca = Http::acceptJson()->withToken($this->token)->get($url);
        if ($busca->successful()) {
            return $busca->json();
        }
        return [];
    }

    public function procuraVooPost(string $origem, string $destino, \DateTimeInterface $saida, \DateTimeInterface $retorno = null, array $cias = ['LA', 'G3', 'AD'])
    {
        $url = "$this->base_url/v2/shopping/flight-offers";
        $body = [
            "currencyCode" => 'BRL',
            "originDestinations" => [[
                "id" => "1",
                "originLocationCode" => $origem,
                "destinationLocationCode" => $destino,
                "departureDateTimeRange" => [
                    "date" => $saida->format('Y-m-d')
                ]
            ]],
            "travelers" => [[
                "id" => "1",
                "travelerType" => "ADULT",
                "fareOptions" => [
                    "STANDARD"
                ]
            ]],
            "sources" => ["GDS"],
            "searchCriteria" => [
                "flightFilters" => [
                    "cabinRestrictions" => [
                        [
                            "cabin" => "ECONOMY",
                            "coverage" => "MOST_SEGMENTS",
                            "originDestinationIds" => ['1']
                        ]
                    ],
                    "carrierRestrictions" => [
                        "includedCarrierCodes" => $cias
                    ]
                ]
            ]
        ];
        if ($retorno) {
            $body['originDestinations'][] = [
                "id" => "2",
                "originLocationCode" => $destino,
                "destinationLocationCode" => $origem,
                "departureDateTimeRange" => [
                    "date" => $retorno->format('Y-m-d')
                ]
            ];
            $body['searchCriteria']['flightFilters']['cabinRestrictions'][0]['originDestinationIds'][] = '2';
        }

        $busca = Http::acceptJson()->withToken($this->token)->post($url, $body);
        if ($busca->successful()) {
            return $busca->json();
        }
        return [];
    }
}
