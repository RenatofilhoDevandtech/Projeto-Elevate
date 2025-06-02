import React, { useState } from 'react';
import { Award, Download, Share2, CheckCircle, TrendingUp } from 'lucide-react';
import Button from '../components/Common/Button';

const mockCertificates = [
  {
    id: 1,
    name: 'React Básico',
    date: '2024-05-10',
    code: 'ABC123',
    pdfUrl: '/certificados/react-basico.pdf'
  },
  {
    id: 2,
    name: 'JavaScript Avançado',
    date: '2024-06-01',
    code: 'XYZ789',
    pdfUrl: '/certificados/js-avancado.pdf'
  }
];

function CertificatesPage() {
  const [certificates] = useState(mockCertificates);

  const handleDownload = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  const handleShare = (cert) => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://seusite.com/certificado/${cert.code}`;
    window.open(url, '_blank');
  };

  const handleValidate = (code) => {
    alert(`Certificado ${code} validado!`);
  };

  return (
    <div className="space-y-24 sm:space-y-32 md:space-y-40">
      {/* Cabeçalho da página */}
      <section className="text-center pt-20 pb-20 sm:pt-28 sm:pb-32 bg-gradient-to-br from-[var(--brand-blue)] via-blue-600 to-purple-700 text-white rounded-b-3xl shadow-2xl overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Award size={54} className="mx-auto mb-6 text-[var(--brand-yellow),#FFD700]" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tighter">
            Certificados
          </h1>
          <p className="text-lg sm:text-xl mb-2 max-w-xl mx-auto opacity-90">
            Visualize, baixe e compartilhe suas conquistas.
          </p>
        </div>
      </section>

      {/* Lista de certificados */}
      <section className="container mx-auto px-4">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-[var(--text-primary)]">
            Minhas conquistas
          </h2>
          <p className="text-md sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Certificados emitidos após completar trilhas e desafios.
          </p>
        </div>
        {certificates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="bg-[var(--brand-white)] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow"
              >
                <Award className="text-[var(--brand-blue)] mb-3" size={32} />
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">{cert.name}</h3>
                <div className="text-xs text-[var(--text-secondary)] mb-2">
                  Emitido em: {new Date(cert.date).toLocaleDateString()}
                </div>
                <div className="text-xs mb-4 opacity-70">
                  Código: <span className="font-mono">{cert.code}</span>
                </div>
                <div className="flex flex-wrap gap-2 w-full justify-center mt-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={Download}
                    className="!px-4"
                    onClick={() => handleDownload(cert.pdfUrl)}
                  >
                    Baixar PDF
                  </Button>
                  <Button
                    variant="tertiary"
                    size="sm"
                    leftIcon={Share2}
                    className="!px-4"
                    onClick={() => handleShare(cert)}
                  >
                    Compartilhar
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    leftIcon={CheckCircle}
                    className="!px-4"
                    onClick={() => handleValidate(cert.code)}
                  >
                    Validar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--text-secondary)] py-8">
            Nenhum certificado disponível ainda.
          </p>
        )}
      </section>

      {/* Progresso para próximos certificados */}
      <section className="container mx-auto px-4">
        <div className="bg-[var(--brand-gray)] rounded-3xl py-12 px-6 shadow-lg text-center">
          <TrendingUp size={40} className="mx-auto mb-4 text-[var(--brand-green)]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
            Progresso para o próximo certificado
          </h2>
          <p className="text-md sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
            Complete trilhas e desafios para desbloquear mais certificados.
          </p>
          {/* Barra ilustrativa */}
          <div className="w-full max-w-lg mx-auto h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="bg-[var(--brand-blue)] h-3 rounded-full animate-pulse-slow" style={{ width: '40%' }} />
          </div>
          <div className="text-xs opacity-70">40% de progresso na próxima trilha</div>
        </div>
      </section>
    </div>
  );
}

export default CertificatesPage;