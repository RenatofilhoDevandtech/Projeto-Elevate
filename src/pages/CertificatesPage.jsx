import  { useState, useEffect } from 'react';
import { Award, Download, Share2, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../services/api';
import Button from '../components/Common/Button';
import { Link } from 'react-router-dom';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        // 1. Busca os certificados do usuário logado na nossa rota protegida
        const response = await api.get('/certificates');
        setCertificates(response.data);
      } catch (err) {
        setError('Não foi possível carregar seus certificados. Tente novamente mais tarde.');
        console.error("Erro ao buscar certificados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleDownload = async (certId, pathTitle) => {
    try {
      // 2. Chama a API para o download, recebendo o arquivo como um 'blob'
      const response = await api.get(`/certificates/${certId}/download`, {
        responseType: 'blob',
      });
      // Cria uma URL temporária para o arquivo em memória
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      // Define o nome do arquivo a ser baixado
      link.setAttribute('download', `Certificado-Elevate-${pathTitle.replace(/\s+/g, '-')}.pdf`);
      document.body.appendChild(link);
      link.click(); // Simula o clique no link para iniciar o download
      link.parentNode.removeChild(link); // Remove o link após o download
    } catch (err) {
      alert('Erro ao baixar o certificado.');
      console.error("Erro no download:", err);
    }
  };

  const handleShare = (uniqueCode) => {
    // 3. Monta a URL pública de validação e a copia para a área de transferência
    const url = `${window.location.origin}/certificado/${uniqueCode}`;
    navigator.clipboard.writeText(url);
    alert('Link de validação copiado para a área de transferência! Agora você pode compartilhá-lo no LinkedIn.');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-brand-blue" size={40} />
        <p className="ml-4 text-lg">Carregando seus certificados...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-danger-red bg-red-50 p-6 rounded-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-8">Meus Certificados</h1>
      {certificates.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-xl shadow-md border">
          <Award size={52} className="mx-auto text-brand-gray-dark mb-4" />
          <h2 className="text-2xl font-semibold text-text-primary">Sua galeria de conquistas está vazia.</h2>
          <p className="text-text-secondary mt-2 mb-6">Conclua uma trilha de aprendizado para ganhar seu primeiro certificado e exibi-lo aqui!</p>
          <Link to="/trilhas">
            <Button variant="primary">Explorar Trilhas</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {certificates.map(cert => (
            <div key={cert.id} className="bg-brand-white p-6 rounded-xl shadow-lg border border-brand-gray-medium transition-shadow hover:shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div className="bg-green-100 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                  <Award className="text-brand-green" size={32} />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-brand-blue">{cert.paths.title}</h2>
                  <p className="text-sm text-text-secondary mt-1">
                    Emitido em: {new Date(cert.issued_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Código: {cert.unique_code}</p>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0 sm:ml-auto">
                  <Button onClick={() => handleDownload(cert.id, cert.paths.title)} variant="primary" size="sm" leftIcon={<Download size={16}/>}>
                    Baixar PDF
                  </Button>
                  <Button onClick={() => handleShare(cert.unique_code)} variant="outline" size="sm" leftIcon={<Share2 size={16}/>}>
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