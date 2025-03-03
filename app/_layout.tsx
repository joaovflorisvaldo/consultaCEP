import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../global.css";

export default function CepSearch() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<any>(null);
  const [savedAddresses, setSavedAddresses] = useState<any[]>(
    JSON.parse(localStorage.getItem("savedAddresses") || "[]")
  );
  const [cache, setCache] = useState<any>(
    JSON.parse(localStorage.getItem("cepCache") || "{}")
  );

  useEffect(() => {
    localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
    localStorage.setItem("cepCache", JSON.stringify(cache));
  }, [savedAddresses, cache]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) setCep(value);
  };

  const saveToCache = (cep: string, data: any) => {
    const newCache = {
      ...cache,
      [cep]: { ...data, timestamp: Date.now() }
    };
    setCache(newCache);
    localStorage.setItem("cepCache", JSON.stringify(newCache));
  };

  const fetchAddress = async () => {
    if (cep.length !== 8) return; // Garante que o CEP tem 8 dígitos antes de buscar

    const cachedData = cache[cep];

    if (cachedData && Date.now() - cachedData.timestamp < 3600000) {
      setAddress(cachedData);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setAddress(data);
        saveToCache(cep, data); // Salva no cache com timestamp
      } else {
        Swal.fire("Erro", "CEP inválido", "error");
      }
    } catch (error) {
      Swal.fire("Erro", "Erro ao buscar o CEP", "error");
    }
  };

  const saveAddress = () => {
    if (address) {
      if (savedAddresses.some((addr) => addr.cep === address.cep)) {
        Swal.fire("Aviso", "Este CEP já está salvo", "warning");
        return;
      }
      setSavedAddresses([...savedAddresses, address]);
      setAddress(null);
      setCep("");
      Swal.fire("Sucesso", "Endereço salvo com sucesso", "success");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-xl font-bold text-center mb-4">Buscar CEP</h1>
      
      <input
        type="text"
        value={cep}
        onChange={handleCepChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Digite o CEP"
        maxLength={8}
      />

      <button
        onClick={fetchAddress}
        disabled={cep.length !== 8}
        className={`w-full p-2 rounded mb-2 
          ${cep.length === 8 ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-400 cursor-not-allowed"}`}
      >
        Consultar
      </button>

      {address && (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade:</strong> {address.localidade} - {address.uf}</p>
          <button
            onClick={saveAddress}
            className="w-full bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600"
          >
            Salvar
          </button>
        </div>
      )}

      {savedAddresses.length === 0 ? (
        <div className="bg-white p-4 rounded shadow mt-4 text-center">
          Nenhum endereço salvo
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold mt-4">Endereços Salvos</h2>
          <ul className="bg-white p-4 rounded shadow max-h-40 overflow-auto">
            {savedAddresses.map((addr, index) => (
              <li key={addr.cep} className="border-b p-2">
                {addr.logradouro}, {addr.bairro}, {addr.localidade} - {addr.uf}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
