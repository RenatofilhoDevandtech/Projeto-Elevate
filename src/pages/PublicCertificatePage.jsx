import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ShieldX, Loader2, Rocket, AlertTriangle } from 'lucide-react';
import api from '../services/api';

// Função auxiliar para limpar classes Tailwind:
// Reescrita manualmente para garantir pureza dos caracteres.
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const PublicCertificatePage = () => {
  const { uniqueCode } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!uniqueCode) {
        setLoading(false);
        setError('Nenhum código de certificado foi fornecido na URL.'); 
        return;
    }

    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get(`/certificates/validate/${uniqueCode}`);
        setCertificate(response.data);
      } catch (err) {
        console.error("Falha ao validar certificado:", err);
        setError(err.response?.data?.error || 'Este código de certificado é inválido ou não foi encontrado.');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [uniqueCode]);

  // Feedback de carregamento
  if (loading) {
    return (
      <div className={cleanTailwindClasses("min-h-screen bg-brand-gray flex flex-col items-center justify-center p-6")}>
        <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue")} size={48} />
        <p className={cleanTailwindClasses("mt-4 text-lg text-text-secondary")}>Validando certificado...</p>
      </div>
    );
  }
  
  return (
    <div className={cleanTailwindClasses("min-h-screen bg-brand-gray flex items-center justify-center p-6")}>
      <div className={cleanTailwindClasses("w-full max-w-2xl bg-brand-white p-8 sm:p-12 rounded-xl shadow-custom-medium text-center border-t-4 border-brand-blue")}>
        {/* Logo Elevate */}
        <Link 
          to="/" 
          className={cleanTailwindClasses("text-2xl font-bold text-brand-blue hover:text-brand-green transition-colors duration-300 group flex items-center justify-center mb-6")}
          aria-label="Voltar para a página inicial Elevate"
        >
            <span>Elevate</span>
            <Rocket
              size={26}
              className={cleanTailwindClasses("ml-2 transform transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110")}
              aria-hidden="true"
            />
        </Link>

        {/* Exibição de Erro ou Certificado Válido */}
        {error ? (
          <>
            <AlertTriangle className={cleanTailwindClasses("mx-auto text-danger-red mb-4")} size={50} />
            <h1 className={cleanTailwindClasses("text-2xl font-bold text-danger-red mb-2")}>Falha na Validação</h1>
            <p className={cleanTailwindClasses("text-text-secondary mt-2")}>{error}</p>
          </>
        ) : (
          <>
            <CheckCircle className={cleanTailwindClasses("mx-auto text-brand-green mb-4")} size={50} />
            <h1 className={cleanTailwindClasses("text-2xl font-bold text-brand-green mb-2")}>Certificado Válido</h1>
            <p className={cleanTailwindClasses("text-text-secondary mt-4")}>A Elevate certifica que</p>
            <p className={cleanTailwindClasses("text-4xl font-extrabold text-brand-blue my-4")}>{certificate?.userName}</p>
            <p className={cleanTailwindClasses("text-text-secondary")}>concluiu com sucesso a trilha de aprendizado de</p>
            <p className={cleanTailwindClasses("text-2xl font-bold text-text-primary mt-2")}>{certificate?.pathTitle}</p>
            <div className={cleanTailwindClasses("text-sm text-text-secondary mt-12 pt-6 border-t border-brand-gray-medium")}>
              Emitido em: {certificate?.issuedDate} <br/>
              Código de Verificação: <span className={cleanTailwindClasses("font-semibold")}>{certificate?.uniqueCode}</span>
              {certificate?.validationUrl && (
                  <p className={cleanTailwindClasses("mt-2")}>
                      <a href={certificate.validationUrl} target="_blank" rel="noopener noreferrer" className={cleanTailwindClasses("text-brand-blue hover:underline")}>
                          Verificar novamente
                      </a>
                  </p>
              )}
            </div>
          </>
        )}
        {/* Botão Voltar para a Elevate */}
        <Link
          to="/"
          className={cleanTailwindClasses("text-sm text-brand-blue hover:underline mt-6 inline-block")}
        >
          Voltar para a Elevate
        </Link>
      </div>
    </div>
  );
};

export default PublicCertificatePage;