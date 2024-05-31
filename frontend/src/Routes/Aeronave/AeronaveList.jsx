import { useEffect, useState } from "react";
import { deleteItem, fetchData } from "../../Services/apiService";
import Tooltip from "../../components/Tooltip";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { MdAddCircleOutline } from "react-icons/md";
import ConfirmationDialog from '../../components/ConfirmationDialog';

function AeronaveList() {
  const [aeronaves, setAeronaves] = useState([]);
  const [processando, setProcessando] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [aeronaveToDeleteId, setAeronaveToDeleteId] = useState(null);

  function getAeronaves() {
    setProcessando(true);
    fetchData("aeronave").then(
      (_) => {
        setAeronaves(_.data);
        setProcessando(false);
      },
      (err) => {
        console.log(err);
        setProcessando(false);
      }
    );
  }
  function handleDeleteClick(id) {
        setIsConfirmationOpen(true);
        setAeronaveToDeleteId(id);
  }

  useEffect(() => {
    getAeronaves();
  }, []);

    function handleConfirmation(confirmed) {
      if (confirmed) {
        deleteAeronave(aeronaveToDeleteId);
      } else {
        setAeronaveToDeleteId(null);
        setIsConfirmationOpen(false);
      }
    }

  function deleteAeronave(id) {
    setProcessando(true);
    deleteItem("aeronave", id).then(
      () => {
        getAeronaves();
      },
      (err) => {
        console.log(err);
        setProcessando(false);
      }
    );
        setAeronaveToDeleteId(null);
        setIsConfirmationOpen(false);
  }

  return (
    <div className="bg-[#EEEEEE]">
      {processando && <Loading />}
      <div className="flex flex-col justify-center align-middle">
        <div className="flex m-auto gap-12 items-center">
          <div className="text-3xl text-center m-10 font-semibold text-[#3758D0]">
            Aeronaves disponíveis
          </div>
          <div>
            <Tooltip message="Cadastrar Nova Aeronave">
              <Link to="/cia/aeronave/new" className="flex bg-[#3758D0] border-2 text-white px-3 py-2 rounded-md items-center gap-2 hover:bg-[#EEEE] hover:text-[#3758D0] hover:border-2 hover:border-[#3758D0] transition">
                <p className=" font-medium">
                  Adicionar
                </p>
                <MdAddCircleOutline
                  size={"2em"}
                  style={{ verticalAlign: "middle", }}
                />
              </Link>
            </Tooltip>
          </div>
        </div>
        <div className="font-[Rubik] w-[80%] m-auto">
          {aeronaves.map(mapAeronave)}
        </div>
        {isConfirmationOpen && (
          <ConfirmationDialog
            message="Tem certeza que deseja apagar essa Aeronave? Essa ação não poderá ser revertida!"
            onConfirm={handleConfirmation}
            onCancel={() => handleConfirmation(false)}
          />
        )}
      </div>
    </div>
  );

  function mapAeronave(aeronave) {
    return (
      <div
        key={aeronave.id}
        className=" bg-white grid grid-cols-4 gap-10 shadow-lg rounded-lg p-10 mb-2"
      >
        <span>
          Sigla: <span className="font-bold">{aeronave.sigla}</span>
        </span>
        <span>
          Nome: <span className="font-bold">{aeronave.marca}</span>
        </span>
        <span>
          Quantidade Assentos:{" "}
          <span className="font-bold">{aeronave.quantidadeAssentos}</span>
        </span>
        <div className="flex gap-2">
          <Tooltip message="Editar Aeronave">
            <Link to={"/cia/aeronave/" + aeronave.id}>
              <img src="/images/edit.svg"></img>
            </Link>
          </Tooltip>
          <Tooltip message="Remover Aeronave">
            <button type="button"
              onClick={() => handleDeleteClick(aeronave.id)}
              disabled={processando}
            >
                        <img src="/images/delete.svg"></img>
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default AeronaveList;
