import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import { Award, BookOpen, Activity } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ progressCount: 0, certificateCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [progressResponse, certificatesResponse] = await Promise.all([
          api.get('/progress/status'),
          api.get('/certificates')
        ]);
        
        setStats({
          progressCount: progressResponse.data.completedContentIds.length,
          certificateCount: certificatesResponse.data.length,
        });
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    if(user) {
        fetchDashboardData();
    }
  }, [user]);

  if (loading) return <div>Carregando seu dashboard...</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-2">Bem-vindo(a) de volta, {user?.user_metadata?.full_name}!</h1>
      <p className="text-lg text-text-secondary mb-10">Aqui está um resumo da sua jornada na Elevate.</p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-lg border flex items-center gap-4">
          <BookOpen className="text-blue-500" size={40} />
          <div>
            <p className="text-3xl font-bold text-text-primary">{stats.progressCount}</p>
            <p className="text-text-secondary">Aulas Concluídas</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg border flex items-center gap-4">
          <Award className="text-green-500" size={40} />
          <div>
            <p className="text-3xl font-bold text-text-primary">{stats.certificateCount}</p>
            <p className="text-text-secondary">Certificados</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg border flex items-center gap-4">
          <Activity className="text-orange-500" size={40} />
          <div>
            <p className="text-lg font-semibold text-text-primary">Continue Aprendendo</p>
            <p className="text-sm text-text-secondary">Sua próxima aula te espera!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;