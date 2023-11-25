import { IntervaloTempo } from "@/types/Enum/IntervaloTempo";
import { UnidadeDosagem } from "@/types/Enum/UnidadeDosagem";
import TratamentoNode from "@/types/tratNode";

const graphTratamento: Record<string, TratamentoNode> = {
    node1: {
      id: 1,
      tipo: 0,
      nome: "Instabilidade Hemodinâmica",
      variavel: "instabilidade_hemodinamica",
      condicao: "instabilidade_hemodinamica",
      mensagem: "",
      dest: {
          sim: 2,
          nao: 3
      },
      posicao: [150, 712.5],
    },
    node2: {
        id: 2,
        tipo: 0,
        nome: "Infecção Prévia",
        variavel: "infeccao",
        condicao: "infeccao",
        mensagem: "",
        dest: {
            nao: 4,
            esbl: 5,
            mrsa: 6,
            epc: 7,
            vre: 8
        },
        posicao:[400, 227.5]
    },
    node3: {
        id: 3,
        tipo: 0,
        nome: "Infecção Prévia",
        variavel: "infeccao",
        condicao: "infeccao",
        mensagem: "",
        dest: {
            nao: 9,
            esbl: 10,
            mrsa: 11,
            epc: 12,
            vre: 13
        },
        posicao:[400, 1217.5]
    },
    node4: {
        id: 4,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            medicacoes: [
              {
                medicamento: {
                  id: 0,
                  nome: "Amicacina"
                },
                dose: 2,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              // {
              //   medicamento: {
              //     id: 1,
              //     nome: "Pipe-Zato"
              //   },
              //   dose: 4.5,
              //   unidade_dosagem: UnidadeDosagem.G,
              //   intervalo: 6,
              //   intervalo_tempo: IntervaloTempo.HORAS
              // }
            ],
            "cuidados": []
          },
          "mensagem": "Cefepime 2g 8/8h 2ª opção - Pipe-Tazo 4,5g 6/6h",
          "dest": 14,
        posicao:[650, 10]
    },
    node5: {
        id: 5,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 0,
                  nome: "Amicacina"
                },
                dose: 2,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 2,
                  nome: "Amicacina"
                },
                dose: 15,
                unidade_dosagem: UnidadeDosagem.MG_KG,
                intervalo: 1,
                intervalo_tempo: IntervaloTempo.DIAS
              },
              {
                medicamento: {
                  id: 3,
                  nome: "Meropenem"
                },
                dose: 1,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Cefepime 2g 8/8h + Amicacina 15mg/kg/dia 2ª opção (pacientes com disfunção renal) - Meropenem 1g 8/8h",
        dest: 14,
        posicao:[650, 110]
    },
    node6: {
        id: 6,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 4,
                  nome: "Vancomicina"
                },
                dose: 15,
                unidade_dosagem: UnidadeDosagem.MG_KG,
                intervalo: 12,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 0,
                  nome: "Amicacina"
                },
                dose: 2,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Vancomicina 15mg/kg 12/12h + Cefepime 2g 8/8h",
        dest: 14,
        posicao:[650, 210]
    },
    node7: {
        id: 7,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 3,
                  nome: "Meropenem"
                },
                dose: 2,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 2,
                  nome: "Amicacina"
                },
                dose: 15,
                unidade_dosagem: UnidadeDosagem.MG_KG,
                intervalo: 1,
                intervalo_tempo: IntervaloTempo.DIAS
              },
              //{
              //   medicamento: {
              //     id: 3,
              //     nome: "Meropenem"
              //   },
              //   dose: 2,
              //   unidade_dosagem: UnidadeDosagem.G,
              //   intervalo: 8,
              //   intervalo_tempo: IntervaloTempo.HORAS
              // },
              // {
              //   medicamento: {
              //     id: 5,
              //     nome: "Poliximina B"
              //   },
              //   dose: 25000,
              //   unidade_dosagem: UnidadeDosagem.UI_KG,
              //   intervalo: 1,
              //   intervalo_tempo: IntervaloTempo.DIAS
              // }
            ],
            "cuidados": []
          },
        mensagem: "Meropenem 2g 8/8h + Amicacina 15mg/kg/dia 2ª opção - Meropenem 2g 8/8h + Polimixina B 25.000UI/Kg/dia (÷ 2 ou 3)",
        dest: 14,
        posicao:[650, 310]
    },
    node8: {
        id: 8,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 0,
                  nome: "Amicacina"
                },
                dose: 2,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              // {
              //   medicamento: {
              //     id: 6,
              //     nome: "Linezolida"
              //   },
              //   dose: 2,
              //   unidade_dosagem: UnidadeDosagem.G,
              //   intervalo: 8,
              //   intervalo_tempo: IntervaloTempo.HORAS
              // }
            ],
            "cuidados": []
          },
        mensagem: "Cefepime 2g 8/8h (adicionar Linezolida 600mg 12/12h se infecção por VRE nos últimos 30 dias)",
        dest: 14,
        posicao:[650, 410]
    },
    node9: {
        id: 9,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 4,
                  nome: "Vancomicina"
                },
                dose: 15,
                unidade_dosagem: UnidadeDosagem.MG_KG,
                intervalo: 12,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 3,
                  nome: "Meropenem"
                },
                dose: 1,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
        dest: 14,
        posicao:[650, 1000]
    },
    node10: {
        id: 10,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 4,
                  nome: "Vancomicina"
                },
                dose: 15,
                unidade_dosagem: UnidadeDosagem.MG_KG,
                intervalo: 12,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 3,
                  nome: "Meropenem"
                },
                dose: 1,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
        dest: 14,
        posicao:[650, 1100]
    },
    node11: {
        id: 11,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 4,
                  nome: "Vancomicina"
                },
                dose: 15,
                unidade_dosagem: UnidadeDosagem.MG_KG,
                intervalo: 12,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 3,
                  nome: "Meropenem"
                },
                dose: 1,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Vancomicina 15mg/kg 12/12h + Meropenem 1g 8/8h",
        dest: 14,
        posicao:[650, 1200]
    },
    node12: {
        id: 12,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 4,
                  nome: "Vancomicina"
                },
                dose: 1,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 12,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 3,
                  nome: "Meropenem"
                },
                dose: 1,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 2,
                  nome: "Amicacina"
                },
                dose: 15,
                unidade_dosagem: UnidadeDosagem.MG_KG,
                intervalo: 1,
                intervalo_tempo: IntervaloTempo.DIAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Vancomicina 1g 12/12h + Meropenem 2g 8/8h + Amicacina 15mg/kg/dia",
        dest: 14,
        posicao:[650, 1300]
    },
    node13: {
        id: 13,
        tipo: 1,
        nome: "Notificar Prescrição",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 6,
                  nome: "Linezolida"
                },
                dose: 600,
                unidade_dosagem: UnidadeDosagem.MG,
                intervalo: 12,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 3,
                  nome: "Meropenem"
                },
                dose: 1,
                unidade_dosagem: UnidadeDosagem.G,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Linezolida 600mg 12/12h + Meropenem 1g 8/8h",
        dest: 14,
        posicao:[650, 1400]
    },
    node14: {
        id: 14,
        tipo: 0,
        nome: "Infecção Viral?",
        variavel: "instabilidade_hemodinamica, infeccao_pele, pneumonia, gram_crescente",
        condicao: "infeccao_cateter OU infeccao_pele OU pneumonia OU gram_crescente",
        mensagem: "",
        dest: {
            sim: 15,
            nao: 16
        },
        posicao:[1200, 695]
    },
    node15: {
        id: 15,
        tipo: 1,
        nome: "Adicionar Medicação",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 4,
                  nome: "Vancomicina"
                },
                dose: 15,
                unidade_dosagem: UnidadeDosagem.MG_KG,
                intervalo: 12,
                intervalo_tempo: IntervaloTempo.HORAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Adicionar Vancomicina 15mg/kg/dose EV 12/12h ao esquema inicial",
        dest: 16,
        posicao:[1300, 750]
    },
    node16: {
        id: 16,
        tipo: 0,
        nome: "Sintomas Respiratórios?",
        variavel: "sintomas_resp, rx_torax_alterado",
        condicao: "sintomas_resp OU rx_torax_alterado",
        mensagem: "",
        dest: {
            sim: 17,
            nao: 18
        },
        posicao:[1500, 695]
    },
    node17: {
        id: 17,
        tipo: 1,
        nome: "Revisar Tratamento",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 7,
                  nome: "Azitromicina"
                },
                dose: 500,
                unidade_dosagem: UnidadeDosagem.MG,
                intervalo: 1,
                intervalo_tempo: IntervaloTempo.DIAS
              }
            ],
            "cuidados": [
              { descricao: "Solicitar TC de Tórax" },
              { descricao: "Considerar Tratamento de Pneumocistose em pacientes com hipoxemia grave e uso prolongado de corticoides ou QTX com análogos da purina" },
              { descricao: "Considerar Influenza, em particular nos meses de inverno" }
            ]
          },
        mensagem: "- Solicitar TC de tórax - Adicionar Azitromicina 500mg EV/VO 1x/dia - Considerar tratamento de Pneumocistose (SMT/TMP 15 a 20mg de TMP/kg/dia ÷3/4) em pacientes com hipoxemia grave e uso prolongado de corticoides ou QTX com análogos da purina - Considerar Influenza, em particular nos meses de inverno",
        dest: 18,
        posicao:[1600, 750]
    },
    node18: {
      id: 18,
      tipo: 0,
      nome: "Sepse?",
      variavel: "sepse_abdominal, tiflite, celulite_perianal",
      condicao: "sepse_abdominal OU tiflite OU celulite_perianal",
      mensagem: "",
      dest: {
          sim: 19,
          nao: 20
      },
      posicao:[1800, 695]
    },
    node19: {
        id: 19,
        tipo: 1,
        nome: "Adicionar Medicação",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 8,
                  nome: "Metronidazol"
                },
                dose: 500,
                unidade_dosagem: UnidadeDosagem.MG,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Acrescentar cobertura p/ anaeróbio (Metronidazol EV 500mg 8/8h)",
        dest: 20,
        posicao:[1900, 750]
      },
    node20: {
        id: 20,
        tipo: 0,
        nome: "Úlceras bucais?",
        variavel: "ulcera_bucal",
        condicao: "ulcera_bucal",
        mensagem: "",
        dest: {
            sim: 21,
            nao: 22
        },
        posicao:[2100, 695]
      },
    node21: {
        id: 21,
        tipo: 1,
        nome: "Prescrever Medicação",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [
              {
                medicamento: {
                  id: 9,
                  nome: "Aciclovir"
                },
                dose: 5,
                unidade_dosagem: UnidadeDosagem.MG_KG,
                intervalo: 8,
                intervalo_tempo: IntervaloTempo.HORAS
              },
              {
                medicamento: {
                  id: 10,
                  nome: "Fluconazol"
                },
                dose: 200,
                unidade_dosagem: UnidadeDosagem.MG,
                intervalo: 1,
                intervalo_tempo: IntervaloTempo.DIAS
              }
            ],
            "cuidados": []
          },
        mensagem: "Aciclovir EV 5mg/kg 3x/dia + Fluconazol EV 200mg/dia",
        dest: 22,
        posicao:[2200, 750]
    },
    node22: {
        id: 22,
        tipo: 0,
        nome: "Diarreia?",
        variavel: "diarreia",
        condicao: "diarreia",
        mensagem: "",
        dest: {
            sim: 23,
            nao: 24
        },
        posicao:[2400, 695]
    },
    node23: {
      id: 23,
      tipo: 1,
      nome: "Diagnosticar colite",
      variavel: "",
      condicao: "",
      prescricao: {
        "medicacoes": [],
        "cuidados": [
            { descricao: "Solicitar coprocultura, pesquisa de toxina A e B e leucócitos fecais" },
            { descricao: "se sintomas de colite: Adicionar Metronidazol 500mg VO 8/8h" }
        ]
      },
      mensagem: " Solicitar coprocultura, pesquisa de toxina A e B e leucócitos fecais - Se sinais/sintomas de colite: Metronidazol 500mg VO 8/8h",
      dest: 24,
      posicao:[2500, 750]
    },
    node24: {
      id: 24,
      tipo: 0,
      nome: "Infecão cateter?",
      variavel: "infec_cateter",
      condicao: "infec_cateter",
      mensagem: "",
      dest: {
          sim: 25,
          nao: "n"
      },
      posicao:[2700, 695]
  },
    node25: {
        id: 25,
        tipo: 1,
        nome: "Remover cateter",
        variavel: "",
        condicao: "",
        prescricao: {
            "medicacoes": [],
            "cuidados": [
                { descricao: "Remover o cateter se houver suspeita de infecção relacionada ao cateter E choque séptico refratário aos antibióticos" },
                { descricao: "Coletar culturas e amostra de secreção do sítio de saída se houver secreção purulenta" }
            ]
          },
        mensagem: "Remover o cateter se houver suspeita de infecção relacionada ao cateter E choque séptico refratário aos antibióticos - Coletar culturas e amostra de secreção do sítio de saída se houver secreção purulenta",
        dest: "n",
        posicao:[2800, 750]
    }
  };
  
export default graphTratamento;