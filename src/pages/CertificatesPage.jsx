import React from 'react';
import UnderConstruction from '../components/Common/UnderConstruction';

const CertificatesPage = () => {
  return (
    <UnderConstruction
      pageName="Meus Certificados"
      expectedFeatures={[
        "Listagem de todos os certificados conquistados.",
        "Opção de download do certificado em PDF.",
        "Compartilhamento fácil em redes sociais (LinkedIn).",
        "Validação de autenticidade do certificado (opcional).",
        "Visualização do progresso para próximos certificados."
      ]}
    />
  );
};

export default CertificatesPage;