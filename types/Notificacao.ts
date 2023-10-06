interface Notificacao {
  id: number;
  idTipoNotificacao?: number;
  horaEnvio?: string;
  horaVisualizacao?: string;
  lidaPor?: string;
  idPaciente?: number;
  isLida: boolean;
  tipoNotificacao: TipoNotificacao;
}
