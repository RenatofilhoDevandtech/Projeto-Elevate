import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// CORREÇÃO: Adicionamos o ícone 'Rocket'
import { CheckCircle, ShieldX, Loader2, Rocket } from 'lucide-react';
import api from '../services/api';

const PublicCertificatePage = () => {
  const { uniqueCode } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!uniqueCode) {
        setLoading(false);
        setError('Nenhum código de certificado fornecido.');
        return;
    }
    const fetchCertificate = async () => {
      try {
        const response = await api.get(`/certificates/validate/${uniqueCode}`);
        setCertificate(response.data);
      } catch (err) { // A variável 'err' agora será usada
        // CORREÇÃO: Adicionamos o console.error para registrar o erro e remover o aviso do ESLint.
        console.error("Falha ao validar certificado:", err);
        setError('Este código de certificado é inválido ou não foi encontrado.');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [uniqueCode]);

  if (loading) {
    return (
        <div className="min-h-screen bg-brand-gray flex flex-col items-center justify-center p-4">
            <Loader2 className="animate-spin text-brand-blue" size={48} />
            <p className="mt-4 text-lg text-text-secondary">Validando certificado...</p>
        </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-brand-gray flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-xl shadow-2xl text-center border-t-4 border-brand-blue">
        <Link to="/" className="text-2xl font-bold text-brand-blue hover:text-brand-green transition-colors duration-300 group flex items-center justify-center mb-8">
            <span>Elevate</span>
            {/* CORREÇÃO: Substituímos o emoji pelo componente de ícone Rocket */}
            <Rocket
              size={26}
              className="ml-1.5 transform transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110"
            />
        </Link>

        {error ? (
          <>
            <ShieldX className="mx-auto text-danger-red mb-4" size={50} />
            <h1 className="text-2xl font-bold text-danger-red">Falha na Validação</h1>
            <p className="text-text-secondary mt-2">{error}</p>
          </>
        ) : (
          <>
            <CheckCircle className="mx-auto text-brand-green mb-4" size={50} />
            <h1 className="text-2xl font-bold text-brand-green">Certificado Válido</h1>
            <p className="text-text-secondary mt-4">A Elevate certifica que</p>
            <p className="text-4xl font-extrabold text-brand-blue my-4">{certificate?.userName}</p>
            <p className="text-text-secondary">concluiu com sucesso a trilha de aprendizado de</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{certificate?.pathTitle}</p>
            <div className="text-xs text-gray-400 mt-10 pt-4 border-t">
              Emitido em: {certificate?.issuedDate} <br/>
              Código de Verificação: {certificate?.uniqueCode}
            </div>
          </>
        )}
        <Link to="/" className="text-sm text-brand-blue hover:underline mt-8 inline-block">
          Voltar para a Elevate
        </Link>
      </div>
    </div>
  );
};

export default PublicCertificatePage;