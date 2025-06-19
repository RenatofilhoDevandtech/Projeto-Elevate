import { useState, useEffect } from 'react';
import { Award, Download, Share2, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';
import api from '../services/api';
import Button from '../components/Common/Button';
import { Link } from 'react-router-dom';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true); // Renomeado de setLoadingPaths para setLoading
  const [error, setError] = useState(''); // Renomeado de setPathsError para setError
  const [downloadingCertId, setDownloadingCertId] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => { // Função renomeada para ser mais clara
      try {
        setLoading(true); // Usando o estado correto
        // **CORREÇÃO:** Busca os certificados do usuário, não trilhas em destaque
        const response = await api.get('/certificates'); 
        setCertificates(response.data.data || []); // Define os certificados
      } catch (err) {
        console.error("Erro ao buscar certificados:", err);
        setError(err.response?.data?.error || 'Não foi possível carregar seus certificados. Tente novamente mais tarde.'); // Usando o estado correto
      } finally {
        setLoading(false); // Usando o estado correto
      }
    };
    fetchCertificates();
  }, []); // Dependência vazia para executar apenas uma vez na montagem

  const handleDownload = async (certId, pathTitle) => {
    setDownloadingCertId(certId);
    try {
      const response = await api.get(`/certificates/${certId}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificado-Elevate-${pathTitle.replace(/\s+/g, '-')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      alert('Certificado baixado com sucesso!'); // Feedback simples. Considere um toast.
    } catch (err) {
      console.error("Erro no download:", err);
      alert(err.response?.data?.error || 'Ocorreu um erro ao baixar o certificado. Tente novamente.');
    } finally {
      setDownloadingCertId(null);
    }
  };

  const handleShare = (uniqueCode) => {
    const url = `${window.location.origin}/certificado/${uniqueCode}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Link de validação copiado para a área de transferência! Agora você pode compartilhá-lo no LinkedIn.');
      })
      .catch((err) => {
        console.error('Erro ao copiar link:', err);
        alert('Não foi possível copiar o link de validação. Por favor, tente novamente.');
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh] font-sans"> {/* Ajustado bg, shadow, font */}
        <Loader2 className="animate-spin text-brand-blue mb-4" size={40} /> {/* Ajustado text-brand-blue */}
        <p className="ml-4 text-lg text-text-secondary font-semibold">Carregando seus certificados...</p> {/* Ajustado text-text-secondary */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center py-20 bg-danger-red/10 border border-danger-red/20 text-danger-red rounded-xl shadow-custom-medium min-h-[50vh] px-4 font-sans"> {/* Ajustado bg, border, text, shadow, font, layout para mobile */}
        <AlertTriangle size={32} className="mr-0 sm:mr-4 mb-4 sm:mb-0 flex-shrink-0" /> {/* Ajustado margin para responsividade */}
        <p className="text-center sm:text-left text-lg font-semibold">{error}</p> {/* Ajustado alinhamento de texto */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 font-sans"> {/* Ajustado font */}
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">Meus Certificados</h1> {/* Ajustado text-primary para text-text-primary */}
      {certificates.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-xl shadow-custom-medium border border-brand-gray-medium"> {/* Ajustado bg, shadow, border */}
          <Award size={52} className="mx-auto text-brand-gray-dark mb-4" /> {/* Ajustado text */}
          <h2 className="text-2xl font-semibold text-text-primary">Sua galeria de conquistas está vazia.</h2> {/* Ajustado text-primary para text-text-primary */}
          <p className="text-text-secondary mt-2 mb-6 max-w-xl mx-auto px-4"> {/* Ajustado text-secondary */}
            Conclua uma trilha de aprendizado para ganhar seu primeiro certificado e exibi-lo aqui!
          </p>
          <Link to="/trilhas">
            <Button variant="primary" size="lg" className="py-4 px-8"> {/* Ajustado px */}
              Explorar Trilhas
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {certificates.map(cert => (
            <div key={cert.id} className="bg-brand-white p-6 rounded-xl shadow-custom-light border border-brand-gray-medium transition-shadow hover:shadow-custom-medium"> {/* Ajustado bg, shadow, border, hover */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div className="bg-brand-green/10 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6 flex-shrink-0"> {/* Ajustado bg-brand-green/10 */}
                  <Award className="text-brand-green" size={32} /> {/* Ajustado text-brand-green */}
                </div>
                <div className="flex-grow min-w-0">
                  <h2 className="text-xl font-bold text-brand-blue truncate">{cert.paths.title}</h2> {/* Ajustado text-brand-blue */}
                  <p className="text-sm text-text-secondary mt-1"> {/* Ajustado text-secondary */}
                    Emitido em: {new Date(cert.issued_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-text-secondary mt-1 truncate">Código: {cert.unique_code}</p> {/* Ajustado text-secondary */}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 sm:ml-auto">
                  <Button
                    onClick={() => handleDownload(cert.id, cert.paths.title)}
                    variant="primary"
                    size="sm"
                    leftIcon={<Download size={16}/>}
                    isLoading={downloadingCertId === cert.id}
                    disabled={downloadingCertId === cert.id}
                    className="py-2.5 px-4" // Ajustado padding para consistência
                  >
                    Baixar PDF
                  </Button>
                  <Button
                    onClick={() => handleShare(cert.unique_code)}
                    variant="outline"
                    size="sm"
                    leftIcon={<Share2 size={16}/>}
                    className="py-2.5 px-4" // Ajustado padding para consistência
                  >
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CertificatesPage;