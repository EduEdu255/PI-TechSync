import Plano from "../components/Plano";
import { useState, useEffect, useContext } from "react";
import { fetchData, postData } from "../Services/apiService";
import Loading from "../components/Loading";
import SnackBar from "../components/SnackBar";
import { Input } from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../Services/LoginContext';


const AdesaoPlanos = () => {
  const [planos, setPlanos] = useState(null);
  const [formasPagamento, setFormasPagamento] = useState(null);
  const [erro, setErro] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedFormaPagamento, setSelectedFormaPagamento] = useState(null);
  const [processando, setProcessando] = useState(false);
  const { setLoggedUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
    getPlanById(planId);
  };

  const methods = useForm();

  function getPlanById(planId) {
    if (!planos) {
      return null;
    }
    planos.forEach((plan) => {
      if (plan.id === planId) {
        setSelectedPlan(plan);
      }
    });
  }

  function callSnackBar(message) {
    setErro({ message: message });
    setTimeout(() => {
      setErro(null);
    }, 3000);
  }

  function handleFormSubmit(data) {
    if (!selectedPlan) {
      callSnackBar(
        "Você deve selecionar um plano para assinar! Clique em qualquer plano para escolhê-lo."
      );
      return;
    }
    console.log(data)
    const dados = {
      forma_pagamento: data.forma_pagamento,
      plano: selectedPlan.id,
      parcelas: parseInt(data.parcelas ?? 1),
    };
    console.log(dados)
    setProcessando(true);
    postData("assinatura", dados)
      .then(
        (resAssinatura) => {
          const idAssinatura = resAssinatura.id;
          const dadosPagamento = {
            forma_pagamento: data.forma_pagamento,
            assinatura: idAssinatura,
            valor: selectedPlan.valor / dados.parcelas,
            detalhe_forma_pagamento: data.numero_cartao,
          };
          setProcessando(true)
          postData("pagamento", dadosPagamento).then(
            (resPagamento) => {
              console.log(resPagamento)
              fetchData("/cia_aerea/profile").then(
                (user) => {
                  setLoggedUser(user);
                  sessionStorage.setItem("loggedUser", JSON.stringify(user));
                  navigate("/cia");
                },
                (error) => {
                  console.log(error);
                }
              );
              navigate("/cia");
            },
            (err) => {
              console.log(err);
              setErro({
                message:
                  "Erro ao processar pagamento:" + err.response.data.message,
              });
            }
          ).finally(() => setProcessando(false));
        },
        (error) => {
          console.log(error);
          setErro({
            message:
              "Erro ao realizar assinatura: " + error.response.data.message,
          });
        }
      )
      .finally(() => {
        setProcessando(false);
      });

    console.log(data);
  }

  async function fetchPlanos() {
    try {
      const result = await fetchData("plano");
      setPlanos(result.data);
      setErro(null);
    } catch (error) {
      setPlanos([]);
      setErro({ message: error.response.data.message });
      console.log(error);
    }
  }
  async function fetchFormasPagamento() {
    try {
      const result = await fetchData("forma_pagamento");
      setFormasPagamento(result.data);
      setErro(null);
    } catch (error) {
      setPlanos([]);
      console.log(error);
      setErro({ message: error.response.data.message });
    }
  }

  function selectFormaPagamento(formaPagamento) {
    const option = formaPagamento.target.selectedOptions[0];
    setSelectedFormaPagamento(null);
    formasPagamento.forEach((element) => {
      if (element.id === option.value) {
        setSelectedFormaPagamento(element);
      }
    });
  }

  useEffect(() => {
    fetchPlanos();
    fetchFormasPagamento();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-900 to-blue-700 text-white h-auto p-10">
      {processando && <Loading />}
      {erro ? <SnackBar message={erro.message} type="danger" /> : null}
      <h2 className="text-center text-3xl font-bold mb-6">
        Clique em um dos nossos planos para escolher a melhor opção para sua
        empresa.
      </h2>
      <FormProvider {...methods}>
        <form className="w-full  bg-gradient-to-r from-purple-900 to-blue-700 text-white h-auto">
          <div className="p-10">
            {planos ? (
              <div className="flex items-center justify-center flex-wrap gap-10">
                {planos.map((plano) => (
                  <Plano
                    key={plano.id}
                    plano={plano}
                    limite={500}
                    selecionado={plano.id === selectedPlanId}
                    onSelect={() => handlePlanSelect(plano.id)}
                  />
                ))}
              </div>
            ) : (
              <Loading />
            )}
          </div>
          <h2 className="text-center text-3xl font-bold mb-6">
            Escolha uma forma de pagamento
          </h2>
          <div className="p-10 text-black m-auto flex items-center justify-center">
            {formasPagamento ? (
              <select
                name="forma_pagamento"
                className="w-[25%] rounded-md h-10"
                {...methods.register("forma_pagamento", {required: {value: true, message: "Deve escolher uma forma de pagamento"}, onChange: (e) => selectFormaPagamento(e)})}
              >
                <option></option>
                {formasPagamento.map(optionFormaPagamento)}
              </select>
            ) : (
              <Loading />
            )}
          </div>
          {formDetalhePagamento(selectedFormaPagamento, selectedPlan, methods)}
          <button
            onClick={methods.handleSubmit(handleFormSubmit)}
            className="flex m-auto w-[50%] bg-[#3758D0] h-14 gap-2 rounded-2xl  items-center text-gray-50 font-semibold justify-center mt-5"
          >
            Assinar
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

function optionFormaPagamento(formaPagamento) {
  return (
    <option value={formaPagamento.id} key={formaPagamento.id}>
      {formaPagamento.nome}
    </option>
  );
}

function getParcelas(formaPagamento, plano, methods) {
  if (!formaPagamento || !plano) {
    return null;
  }
  let qteParcelas = parseInt(formaPagamento.parcelas);
  let valor = parseFloat(plano.valor);
  let parcelas = [];
  for (let i = 1; i <= qteParcelas; i++) {
    parcelas.push({ qt: i, valor: (valor / i).toFixed(2) });
  }
  return (
    <>
      <label htmlFor="parcelas" className="font-medium">
        Parcelas
      </label>
      <select
        name="parcelas"
        className="border flex items-center justify-between h-14 rounded-2xl w-full text-black"
        id="parcelas"
        {...methods.register("parcelas", {
          required: {
            value: true,
            message: "Obrigatório escolher a quantidade de parcelas",
          },
        })}
      >
        <option></option>
        {parcelas.map((p) => {
          return (
            <option value={p.qt} key={p.qt}>
              {p.qt} {p.qt > 1 ? "parcelas" : "parcela"} - {emReais(p.valor)}
              /mês
            </option>
          );
        })}
      </select>
    </>
  );
}
function emReais(valor) {
  let real = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return real.format(valor);
}

const formDetalhePagamento = (formaPagamento, plano, methods) => {
  if (!formaPagamento) {
    return null;
  }
  if (formaPagamento.nome == "Cartão de Crédito") {
    return (
      <div className="w-[50%] m-auto">
        <Input
          name="numero_cartao"
          label="Número Cartão"
          labelColor="FFFFFF"
          type="text"
          placeholder="Número do Cartão"
          id="numero_cartao"
          validation={{
            validate: (v) => {
              const pattern = /^\d{4} \d{4} \d{4} \d{4}$/;
              return (
                pattern.test(v) || "Deve ser no formato XXXX XXXX XXXX XXXX"
              );
            },
          }}
        />
        <Input
          name="nome_cartao"
          label="Nome no Cartão"
          labelColor="FFFFFF"
          type="text"
          id="nome_cartao"
          placeholder="Nome no Cartão"
        />
        <Input
          name="validade"
          label="Mês/Ano validade (MM/YY)"
          type="text"
          id="validade"
          placeholder="MM/YY"
          labelColor="FFFFFF"
          validation={{
            validate: (v) => {
              const pattern = /^(\d\d)\/(\d\d)$/;
              const exist = v.match(pattern);
              if (!exist) {
                return false || "Deve ser no formato MM/YY";
              }
              if (exist) {
                let month = parseInt(exist[1]);
                if (month < 1 || month > 12) {
                  return false || "Mês deve ser entre 1 e 12";
                }
                let year = parseInt(exist[2]);
                if (year < 24 || year > 50) {
                  return (
                    false ||
                    `Ano 20${year.toString().padStart(2, "0")} não é aceito`
                  );
                }
              }

              return true || "Deve ser no formato MM/YY";
            },
          }}
        />
        <Input
          name="CCV"
          label="CCV"
          type="text"
          id="CCV"
          placeholder="123"
          labelColor="FFFFFF"
          validation={{
            validate: (v) => {
              const pattern = /\d{3}/;
              return pattern.test(v) || "Composto de 3 dígitos";
            },
          }}
        />
        {getParcelas(formaPagamento, plano, methods)}
      </div>
    );
  } else if (formaPagamento.nome == "Cartão de Débito") {
    return (
      <div className="w-[50%] m-auto">
        <Input
          name="numero_cartao"
          label="Número Cartão"
          labelColor="FFFFFF"
          type="text"
          placeholder="Número do Cartão"
          id="numero_cartao"
          validation={{
            validate: (v) => {
              const pattern = /^\d{4} \d{4} \d{4} \d{4}$/;
              return (
                pattern.test(v) || "Deve ser no formato XXXX XXXX XXXX XXXX"
              );
            },
          }}
        />
        <Input
          name="nome_cartao"
          label="Nome no Cartão"
          labelColor="FFFFFF"
          type="text"
          id="nome_cartao"
          placeholder="Nome no Cartão"
        />
        <Input
          name="validade"
          label="Mês/Ano validade (MM/YY)"
          type="text"
          id="validade"
          placeholder="MM/YY"
          labelColor="FFFFFF"
          validation={{
            validate: (v) => {
              const pattern = /^(\d\d)\/(\d\d)$/;
              const exist = v.match(pattern);
              if (!exist) {
                return false || "Deve ser no formato MM/YY";
              }
              if (exist) {
                let month = parseInt(exist[1]);
                if (month < 1 || month > 12) {
                  return false || "Mês deve ser entre 1 e 12";
                }
                let year = parseInt(exist[2]);
                if (year < 24 || year > 50) {
                  return (
                    false ||
                    `Ano 20${year.toString().padStart(2, "0")} não é aceito`
                  );
                }
              }

              return true || "Deve ser no formato MM/YY";
            },
          }}
        />
      </div>
    );
  } else if (formaPagamento.nome == "Pix") {
    return null;
  } else {
    return null;
  }
};

export default AdesaoPlanos;
