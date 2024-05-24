import { useCallback, useEffect, useState } from "react";
import { deleteItem, fetchData } from "../../Services/apiService";
import Tooltip from "../../components/Tooltip";
import { Link } from "react-router-dom";

function AeronaveList() {
    const [aeronaves, setAeronaves] = useState([]);

    function getAeronaves() {
        fetchData("aeronave").then((_) => {
            setAeronaves(_.data)
        }, (err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getAeronaves()
    }, [])

    function deleteAeronave(id) {
        deleteItem("aeronave", id).then((_) => {
            getAeronaves();
        }, (err) => {
            console.log(err)
        })
    }

    return (
        <>
        <div className="flex justify-around w-[60%]">
            <div className="text-3xl text-center m-auto">Aeronaves disponíveis</div>
            <div>
                <Tooltip message="Cadastrar Nova Aeronave">
                    <Link to="/aeronave/new">
                        <img src="/images/add.svg" className=" h-[32px] w-[32px]"></img>
                    </Link>
                </Tooltip>
            </div>
        </div>
            <div className="font-[Rubik] w-[80%] m-auto">
                {aeronaves.map(mapAeronave)}
            </div>
        </>
    )

    function mapAeronave(aeronave) {
        return (
            <div key={aeronave.id} className=" bg-white grid grid-cols-4 gap-10 shadow-lg rounded-lg p-10 mb-2">
                <span>Sigla: <span className="font-bold">{aeronave.sigla}</span></span>
                <span>Nome: <span className="font-bold">{aeronave.marca}</span></span>
                <span>Quantidade Assentos: <span className="font-bold">{aeronave.quantidadeAssentos}</span></span>
                <div className="flex gap-2">
                    <Tooltip message="Editar Aeronave">
                        <Link to={"/aeronave/" + aeronave.id}><img src="/images/edit.svg"></img></Link>
                    </Tooltip>
                    <Tooltip message="Remover Aeronave">
                        <button type="button">
                            <img src="/images/delete.svg"></img>
                        </button>
                    </Tooltip>
                </div>
            </div>
        )
    }
}

export default AeronaveList;