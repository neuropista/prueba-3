import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  RefreshCw, 
  Copy, 
  BookOpen, 
  HelpCircle, 
  Clock, 
  User, 
  Award, 
  ChevronRight, 
  AlertCircle, 
  Check, 
  RotateCcw, 
  Building, 
  CreditCard, 
  MessageSquare, 
  Layers, 
  TrendingUp, 
  Search, 
  ExternalLink,
  Shield,
  ThumbsUp,
  FileCheck,
  Zap,
  Info
} from 'lucide-react';

const QUESTION_BANK = [
  // --- NIVEL 1: ATENCIÓN ESTÁNDAR (3 Preguntas) ---
  {
    id: 'L1_Q1',
    level: 1,
    caseTitle: 'Caso A: Doble cobro por venta online en CyberWeek',
    retailSector: 'E-Commerce / Electrodomésticos',
    questionText: 'Un cliente llama angustiado porque en su estado de cuenta bancario figuran dos cargos por S/ 1,299.00 correspondientes a la misma compra de un Smart TV realizada en el sitio web durante el CyberDay. Al revisar la evidencia, ¿cuál debe ser la primera acción de atención e-commerce según el protocolo?',
    options: [
      {
        id: 0,
        text: 'Informar al cliente que debe arreglar el problema directamente con su banco emisor, ya que el sistema de la tienda solo registra la boleta generada.',
        isCorrect: false,
        feedback: 'Incorrecto. La tienda debe responsabilizarse de verificar la pasarela de pagos antes de derivar al cliente a su entidad financiera.'
      },
      {
        id: 1,
        text: 'Validar la doble captura transaccional en el ERP/Pasarela, ofrecer contención empática informando el plazo de extorno (24-48h bancarias) e iniciar el ticket de extorno preventivo.',
        isCorrect: true,
        feedback: '¡Correcto! Cumple con la contención inicial, verificación en la pasarela transaccional y el trámite preventivo de extorno con plazo claro.'
      },
      {
        id: 2,
        text: 'Efectuar una transferencia bancaria inmediata de devolución en efectivo desde la caja chica de la tienda física más cercana.',
        isCorrect: false,
        feedback: 'Incorrecto. La devolución de ventas e-commerce pagadas con tarjeta no se ejecuta en efectivo en tiendas físicas por temas de conciliación y seguridad.'
      },
      {
        id: 3,
        text: 'Anular ambas transacciones en la plataforma y pedirle al cliente que vuelva a realizar la compra online con otra tarjeta.',
        isCorrect: false,
        feedback: 'Incorrecto. Anular la orden correcta dejaría al cliente sin su producto reservado en CyberWeek y generaría mayor malestar.'
      }
    ],
    hint: '💡 Pista de Política Interna: Ante duplicidad de cobros en pasarelas de pago (Niubiz/Izipay), se debe verificar primero si existen dos capturas de autorización o solo una reserva de línea de crédito, manteniendo empatía sin solicitar que el cliente rehaga el pago.',
    indecopiNorm: 'Art. 19 del Código de Protección y Defensa del Consumidor: Los proveedores responden por la idoneidad de los servicios de pago implementados en sus plataformas e-commerce.',
    evidences: {
      ticket: {
        title: 'Voucher Niubiz / Pasarela E-Commerce',
        lowLevelAuth: 'Nivel Bajo (Captura de Voucher)',
        code: 'TRX-CYBER-98421',
        details: [
          'Transacción 1: S/ 1,299.00 | Estado: APROBADO (10:14:02 hrs)',
          'Transacción 2: S/ 1,299.00 | Estado: CAPTURADO DUPLICADO (10:14:05 hrs)',
          'Tarjeta: VISA Credito **** **** **** 4092',
          'Comercio: Retail Peru E-Commerce S.A.C.'
        ]
      },
      chat: {
        title: 'Hilo de Chat Atento al Cliente',
        midLevelAuth: 'Nivel Medio (Transcripción de Chat)',
        messages: [
          { sender: 'Cliente (Juan Pérez)', time: '10:20', text: '¡Hola! Revisé la app de mi banco y me cobraron dos veces el televisor de S/ 1,299. Tengo la tarjeta sobregirada por su culpa.' },
          { sender: 'Bot Posventa', time: '10:21', text: 'Transfiriendo con un ejecutivo del área de extornos e-commerce...' }
        ]
      },
      erp: {
        title: 'Trazabilidad ERP / OMS Pedidos',
        highLevelAuth: 'Nivel Alto (Registro de Auditoría)',
        orderId: 'PED-ONLINE-77412',
        status: 'CONFIRMADO (1 sola unidad reservada en Almacén Lurín)',
        logs: [
          '[10:14:02] Tokenización aprobada por pasarela.',
          '[10:14:05] Reintento automático de pasarela genera duplicidad de cobro financiero.',
          '[10:15:00] Generación de Boleta Electrónica B004-00129482 (Por S/ 1,299.00).'
        ]
      }
    },
    competencies: {
      objeciones: 25,
      normativa: 25,
      empatia: 25,
      protocolo: 25
    }
  },
  {
    id: 'L1_Q2',
    level: 1,
    caseTitle: 'Caso B: Negativa de garantía de electrodoméstico con informe contradictorio',
    retailSector: 'Tiendas Físicas / Postventa Post-Garantía',
    questionText: 'Una clienta reclama por la negativa de garantía de una lavadora comprada hace 2 meses. El Servicio Técnico del fabricante rechazó la reparación indicando "Uso indebido por sobrecarga", pero las fotos adjuntas en el informe ERP muestran la faja del motor limpia y sin desgaste por peso. ¿Cómo debe proceder el ejecutivo?',
    options: [
      {
        id: 0,
        text: 'Rechazar definitivamente el reclamo amparándose en que la palabra del Servicio Técnico Oficial es inapelable.',
        isCorrect: false,
        feedback: 'Incorrecto. El ejecutivo debe auditar las inconsistencias técnicas antes de dar una respuesta final.'
      },
      {
        id: 1,
        text: 'Cuestionar internamente el dictamen ante la inconsistencia visual de las pruebas, aplicar la duda a favor del consumidor (In Dubio Pro Consumidor) y autorizar el cambio o reparación por contingencia.',
        isCorrect: true,
        feedback: '¡Excelente! Identificaste la contradicción probatoria en el informe ERP y aplicaste el principio de idoneidad y satisfacción asegurada.'
      },
      {
        id: 2,
        text: 'Exigir a la clienta que pague un peritaje independiente privado y lo presente en la tienda para reconsiderar el caso.',
        isCorrect: false,
        feedback: 'Incorrecto. Cargar el costo de la prueba técnica al consumidor ante inconsistencias internas vulnera el debido procedimiento de atención.'
      },
      {
        id: 3,
        text: 'Sugerir a la clienta que ponga un reclamo en el Libro de Reclamaciones para que el área legal resuelva en 15 días hábiles.',
        isCorrect: false,
        feedback: 'Incorrecto. El Libro de Reclamaciones es un derecho del cliente, pero no debe usarse como vía de escape para evitar resolver un caso operativo evidente.'
      }
    ],
    hint: '💡 Pista de Ley de Protección al Consumidor: Cuando exista discrepancia fehaciente entre la conclusión escrita del informe técnico y las evidencias fotográficas del producto en el expediente, prevalece la idoneidad probatoria a favor del usuario.',
    indecopiNorm: 'Directiva INDECOPI N° 002-2021: El proveedor debe garantizar la veracidad e idoneidad objetiva de los diagnósticos técnicos antes de declarar la improcedencia de una garantía.',
    evidences: {
      ticket: {
        title: 'Solicitud de Garantía y Guía de Taller',
        lowLevelAuth: 'Nivel Bajo (Ticket de Soporte)',
        code: 'GAR-ELECTRO-4022',
        details: [
          'Producto: Lavadora Carga Frontal 16KG',
          'Fecha de compra: Hace 62 días',
          'Dictamen Técnico ST: RECHAZADO (Código E-04 Uso Indebido)',
          'Costo estimado reparación solicitada: S/ 450.00'
        ]
      },
      chat: {
        title: 'Registro de Atención Presencial / CRM',
        midLevelAuth: 'Nivel Medio (Comentarios en CRM)',
        messages: [
          { sender: 'Asesor Tienda San Miguel', time: '15:10', text: 'Clienta acude molesta. Indica que vive sola y la lavadora solo se usó para ropa ligera. Argumenta que el fallo fue repentino.' },
          { sender: 'Supervisor de Servicio', time: '15:20', text: 'Favor verificar informe fotográfico cargado en sistema ERP por el centro de servicio autorizado.' }
        ]
      },
      erp: {
        title: 'Informe Técnico en Sistema ERP / Calidad',
        highLevelAuth: 'Nivel Alto (Fotografías y Peritaje)',
        orderId: 'ST-REPORTE-99102',
        status: 'AUDITADO CON OBSERVACIONES',
        logs: [
          'Foto 1: Tambor principal sin deformaciones (Estado Impecable).',
          'Foto 2: Faja de transmisión desprendida por falla de ensamble de fábrica.',
          'Texto Dictamen: "Se observa sobrecarga por uso no doméstico" (Incoherente con Foto 1 y Foto 2).'
        ]
      }
    },
    competencies: {
      objeciones: 30,
      normativa: 20,
      empatia: 25,
      protocolo: 25
    }
  },
  {
    id: 'L1_Q3',
    level: 1,
    caseTitle: 'Caso C: Retraso en extorno de compra anulada en tienda física',
    retailSector: 'Tiendas Físicas / Finanzas y Tesorería',
    questionText: 'Un cliente anuló presencialmente la compra de un juego de comedor de S/ 2,499.00 en tienda física hace 12 días hábiles. Cuenta con la Nota de Crédito, pero el extorno no figura en su tarjeta de crédito. Acude exigiendo devolución en efectivo en caja en ese instante. ¿Qué solución técnica y legal corresponde?',
    options: [
      {
        id: 0,
        text: 'Aceptar la exigencia y entregar S/ 2,499.00 en efectivo desde la caja central para calmar al cliente inmediatamente.',
        isCorrect: false,
        feedback: 'Incorrecto. Está prohibido devolver en efectivo compras realizadas con tarjeta de crédito por normas de bancarización y prevención de lavado de activos (PLAFT).'
      },
      {
        id: 1,
        text: 'Explicar la restricción normativa de devolución en efectivo para pagos con tarjeta, verificar en ERP el estado del envío del lote transaccional, y emitir la constancia de trámite prioritario bancario.',
        isCorrect: true,
        feedback: '¡Respuesta Correcta! Proteges los procedimientos financieros de la empresa mientras gestionas el rastreo del extorno con comprobante formal para el cliente.'
      },
      {
        id: 2,
        text: 'Indicarle que el retraso es 100% responsabilidad de su banco y que en la tienda no se puede hacer ninguna consulta adicional.',
        isCorrect: false,
        feedback: 'Incorrecto. El retail debe confirmar primero si envió correctamente el lote de extorno a la pasarela antes de culpar al banco emisor.'
      },
      {
        id: 3,
        text: 'Ofrecerle una tarjeta de regalo (Gift Card) por el valor total como única opción, obligándolo a gastarlo en la tienda.',
        isCorrect: false,
        feedback: 'Incorrecto. No se puede condicionar la devolución del dinero a la aceptación forzada de vales de compra salvo acuerdo expreso del cliente.'
      }
    ],
    hint: '💡 Pista Normativa SBS / Pasarelas: La legislación peruana de bancarización prohíbe entregar efectivo por anulación de operaciones de crédito. Sin embargo, el retail debe brindar al cliente el código de autorización de extorno (ARN - Acquirer Reference Number).',
    indecopiNorm: 'Resolución INDECOPI N° 1284-2022: El proveedor debe suministrar la constancia de tramitación de extorno bancario en un plazo no mayor a 5 días hábiles de aprobada la anulación.',
    evidences: {
      ticket: {
        title: 'Nota de Crédito y Ticket Original',
        lowLevelAuth: 'Nivel Bajo (Comprobante Físico)',
        code: 'NC-001-99823',
        details: [
          'Boleta Origen: B001-44219 (S/ 2,499.00)',
          'Medio de Pago: Tarjeta de Crédito BCP',
          'Fecha Anulación: Hace 12 días hábiles',
          'Sede: Tienda Jockey Plaza'
        ]
      },
      chat: {
        title: 'Atención en Modulo de Servicio',
        midLevelAuth: 'Nivel Medio (Bitácora de Reclamo)',
        messages: [
          { sender: 'Ejecutivo Módulo', time: '11:00', text: 'Cliente sumamente eufórico en ventanilla de caja. Amenaza con grabar al personal si no se le entrega el efectivo.' }
        ]
      },
      erp: {
        title: 'Auditoría de Lotes Finanzas / Pasarela',
        highLevelAuth: 'Nivel Alto (Trazabilidad de Pasarela)',
        orderId: 'EXTORNO-BCP-8821',
        status: 'LOTE TRANCADO EN REPROCESO CENTRAL',
        logs: [
          'Anulación registrada en POS Tienda: ÉXITO.',
          'Envío de lote a Tesorería Central: RETENIDO POR ERROR DE INTERFAZ (Día 3).',
          'Estado Actual: Lote regularizado y enviado al banco hoy a las 08:00 AM (Pendiente confirmación de red de tarjetas).'
        ]
      }
    },
    competencies: {
      objeciones: 20,
      normativa: 35,
      empatia: 20,
      protocolo: 25
    }
  },

  // --- NIVEL 2: MANEJO DE CRISIS Y CASOS COMPLEJOS (3 Preguntas) ---
  {
    id: 'L2_Q4',
    level: 2,
    caseTitle: 'Caso A (Crisis): Contingencia masiva por fallo de pasarela en CyberWeek',
    retailSector: 'Gestión de Crisis E-Commerce',
    questionText: 'Se ha detectado un fallo en el servidor de la pasarela durante las primeras horas del CyberDay que afectó a 45 clientes con cobros duplicados no extornados automáticamente en 72 horas. Hay amenazas de denuncia colectiva en INDECOPI e hilos virales en redes sociales. ¿Cuál es el protocolo de escalamiento corporativo e impactante para contener la crisis?',
    options: [
      {
        id: 0,
        text: 'Publicar un comunicado desmintiendo las publicaciones en redes sociales y esperar a que cada cliente llame individualmente para revisar su caso.',
        isCorrect: false,
        feedback: 'Incorrecto. La actitud defensiva y pasiva incrementa el impacto mediático y el riesgo de sanciones colectivas graves por parte de INDECOPI.'
      },
      {
        id: 1,
        text: 'Activar el Comité de Crisis Posventa, autorizar extornos directos de contingencia desde la cuenta propia del retail y enviar comunicación proactiva con el número de operación bancario a cada uno de los 45 afectados.',
        isCorrect: true,
        feedback: '¡Respuesta Maestra! Resolviste la contingencia mediante liderazgo proactivo, mitigando el riesgo legal y conteniendo el daño reputacional de la marca.'
      },
      {
        id: 2,
        text: 'Bloquear los comentarios de los usuarios en redes sociales para evitar que el reclamo se propague.',
        isCorrect: false,
        feedback: 'Incorrecto. La censura en redes sociales destruye la confianza de la marca y agrava la percepción de mala fe ante INDECOPI.'
      },
      {
        id: 3,
        text: 'Ofrecer a todos los clientes un cupón de descuento de S/ 20 sin extornar el dinero duplicado hasta que concluya la auditoría mensual.',
        isCorrect: false,
        feedback: 'Incorrecto. Un cupón comercial no reemplaza la obligación legal de restituir fondos cobrados indebidamente.'
      }
    ],
    hint: '💡 Pista de Gestión de Crisis: Ante fallas masivas que afecten la liquidez de los clientes, la regulación sanciona las infracciones colectivas con multas de hasta 450 UIT. La remediación proactiva y la comunicación transparente neutralizan el procedimiento sancionador.',
    indecopiNorm: 'Directiva de Procedimientos Sancionadores INDECOPI: La subsanación voluntaria y proactiva de la conducta infractora antes del inicio de un procedimiento reduce la sanción a amonestación o atenuación máxima.',
    evidences: {
      ticket: {
        title: 'Consolidado de Reclamos Masivos Cyber',
        lowLevelAuth: 'Nivel Bajo (Listado de Incidentes)',
        code: 'INC-CRISIS-CYBER-09',
        details: [
          'Total Clientes Afectados: 45 usuarios',
          'Monto Acumulado Retenido: S/ 58,400.00',
          'Estado: Alerta Roja en Mesa de Ayuda',
          'Canal de Origen: Red Social X / Reclamos Web'
        ]
      },
      chat: {
        title: 'Monitoreo de Tendencias / Redes',
        midLevelAuth: 'Nivel Medio (Social Listening)',
        messages: [
          { sender: 'Comunidad X', time: 'Hace 30 min', text: '@RetailPeru Nos robaron el dinero en el CyberDay! 2 cobros en mi tarjeta y no me dan solución #EstafaCyber' },
          { sender: 'Social Media Lead', time: 'Hace 25 min', text: 'El hilo tiene 250 retweets y etiqueta a la cuenta oficial de INDECOPI.' }
        ]
      },
      erp: {
        title: 'Auditoría Financiera y Switch de Pagos',
        highLevelAuth: 'Nivel Alto (Reporte Core)',
        orderId: 'SWITCH-AUDIT-2026',
        status: 'DESCALCE CONFIRMADO',
        logs: [
          'Diagnóstico: Time-out en el socket de confirmación entre Pasarela Central y Core Bancario.',
          'Recomendación Finanzas: Ejecutar abono preventivo por dispersión masiva BCP/BBVA sin esperar conciliación interbancaria.'
        ]
      }
    },
    competencies: {
      objeciones: 35,
      normativa: 25,
      empatia: 20,
      protocolo: 20
    }
  },
  {
    id: 'L2_Q5',
    level: 2,
    caseTitle: 'Caso B (Crisis): Denuncia ante INDECOPI por producto frágil dañado en despacho',
    retailSector: 'Logística de Distribución y Legal',
    questionText: 'Un cliente interpuso una denuncia directa ante INDECOPI adjuntando un video de "unboxing" donde se observa un televisor OLED de S/ 5,999 con la pantalla trizada al sacarlo de la caja. La contrata logística presentó la Guía de Remisión firmada por el cliente con el texto impreso "Recibí Conforme". ¿Cómo evalúas la fuerza probatoria según el protocolo legal de posventa?',
    options: [
      {
        id: 0,
        text: 'Rechazar la postura del cliente porque la firma en la Guía de Remisión anula automáticamente cualquier reclamo posterior por daños físicos.',
        isCorrect: false,
        feedback: 'Incorrecto. INDECOPI ha sentado precedente indicando que la firma rápida de entrega no convalida fallos o vicios ocultos no comprobables a simple vista sin desembalaje.'
      },
      {
        id: 1,
        text: 'Reconocer la validez probatoria del video de unboxing sin cortes, proceder al cambio inmediato del producto mediante conciliación legal y sancionar internamente a la contrata de transporte.',
        isCorrect: true,
        feedback: '¡Excelente Análisis! El video de unboxing ininterrumpido constituye prueba fehaciente prevalente frente a una firma genérica de recepción en puerta.'
      },
      {
        id: 2,
        text: 'Exigir al cliente que retire la denuncia ante INDECOPI como condición obligatoria previa para entregarle un televisor nuevo.',
        isCorrect: false,
        feedback: 'Incorrecto. Condicionar los derechos de garantía o reposición a la renuncia de acciones legales constituye una práctica abusiva e ilegal.'
      },
      {
        id: 3,
        text: 'Sugerir al cliente que cobre el seguro personal de su tarjeta de crédito aduciendo robo o accidente doméstico.',
        isCorrect: false,
        feedback: 'Incorrecto. Incitar al cliente a realizar un reclamo fraudulento al seguro transgrede la ética corporativa y las normas financieras.'
      }
    ],
    hint: '💡 Pista de Precedente Obligatorio INDECOPI: La Sala de Protección al Consumidor establece que la Guía de Remisión firmada al transportista en la puerta del domicilio solo acredita la recepción del bulto cerrado, no la idoneidad interna del producto frágil sin desembalar.',
    indecopiNorm: 'Resolución SPC-INDECOPI N° 0842-2020: La cláusula "Recibí Conforme" preimpresa en guías no exime al proveedor de responsabilidad si el cliente demuestra el daño con prueba audiovisual contemporánea a la entrega.',
    evidences: {
      ticket: {
        title: 'Notificación de Denuncia INDECOPI',
        lowLevelAuth: 'Nivel Bajo (Cédula de Notificación)',
        code: 'EXP-INDECOPI-2026-9921',
        details: [
          'Reclamante: Carlos Mendoza V.',
          'Petitorio: Devolución de S/ 5,999 + Pago de Costas y Costos + Sanción',
          'Anexo Clave: Enlace a video de Unboxing Grabado en 4K con Metadatos'
        ]
      },
      chat: {
        title: 'Reporte del Chofer de Reparto',
        midLevelAuth: 'Nivel Medio (App de Entregas Last Mile)',
        messages: [
          { sender: 'Transportista Contrata', time: '14:00', text: 'El cliente firmó en la tablet apresurado porque tenía una reunión. La caja no tenía golpes exteriores visibles.' }
        ]
      },
      erp: {
        title: 'Peritaje Digital de la Prueba de Unboxing',
        highLevelAuth: 'Nivel Alto (Auditoría de Imagen)',
        orderId: 'EVIDENCIA-VIDEO-OLED',
        status: 'PRUEBA VALIDA SIN EDICION',
        logs: [
          'Metadatos de Video: Grabado 10 minutos después de la hora de entrega registrada en el GPS del camión.',
          'Continuidad: Tomás continua desde el sello de cinta de seguridad de tienda hasta el encendido del TV con pantalla trizada.',
          'Dictamen Legal: Contingencia alta de pérdida en INDECOPI. Se recomienda Conciliación Inmediata.'
        ]
      }
    },
    competencies: {
      objeciones: 25,
      normativa: 35,
      empatia: 20,
      protocolo: 20
    }
  },
  {
    id: 'L2_Q6',
    level: 2,
    caseTitle: 'Caso C (Crisis): Intento de fraude y suplantación en devolución de alta gama',
    retailSector: 'Prevención de Pérdidas y Auditoría',
    questionText: 'Un usuario se presenta en el módulo de atención solicitando la devolución en efectivo de S/ 6,499.00 por un Smartphone de gama alta. Presenta una boleta impresa a nombre de otra persona y afirma ser un "apoderado verbal". El sistema ERP de Prevención de Fraudes arroja una alerta roja de tarjeta robada en la compra origen. ¿Cuál es el protocolo estricto de seguridad e integridad?',
    options: [
      {
        id: 0,
        text: 'Realizar la devolución en efectivo de inmediato para no hacer esperar al usuario y evitar discusiones en el piso de venta.',
        isCorrect: false,
        feedback: 'Incorrecto. Entregar dinero a un tercero sin poder verificado en una transacción alertada por fraude vulnera los protocolos de Prevención de Pérdidas.'
      },
      {
        id: 1,
        text: 'Pausar la atención de la devolución, exigir DNI físico y carta poder notarial del titular, e informar de inmediato al equipo de Prevención de Pérdidas y Seguridad Interna.',
        isCorrect: true,
        feedback: '¡Excelente Actuación! Priorizaste la seguridad del negocio, previniendo el lavado de activos y la entrega ilícita de fondos a suplantadores.'
      },
      {
        id: 2,
        text: 'Retener la tarjeta de identidad de la persona y encararla públicamente acusándola de delincuente.',
        isCorrect: false,
        feedback: 'Incorrecto. El personal de atención no tiene facultades de retención de documentos personales ni debe generar altercados de violencia.'
      },
      {
        id: 3,
        text: 'Aceptar la devolución pero emitir una tarjeta de regalo a nombre del apoderado verbal.',
        isCorrect: false,
        feedback: 'Incorrecto. Transferir el valor del producto defraudado a un vale al portador consumaría la operación de lavado o apropiación ilícita.'
      }
    ],
    hint: '💡 Pista de Seguridad Corporativa: Ninguna devolución superior a 0.5 UIT o vinculada a compras con tarjetas bancarias puede ejecutarse con terceros sin poder con firma legalizada por notario y validación biométrica/RENIEC.',
    indecopiNorm: 'Normativa Ley PLAFT y Código Civil Peruano (Art. 145): La representación para cobro de valores requiere facultades expresas e indubitables mediante instrumento público o notarial.',
    evidences: {
      ticket: {
        title: 'Comprobante Presentado en Módulo',
        lowLevelAuth: 'Nivel Bajo (Boleta Impresa)',
        code: 'B001-00998214',
        details: [
          'Titular en Boleta: Maria Fernanda Gomez',
          'Producto: Smartphone Pro Max 512GB',
          'Monto: S/ 6,499.00',
          'Presentante: Tercero no registrado (Sin DNI del titular)'
        ]
      },
      chat: {
        title: 'Transcripción de la Conversación en Módulo',
        midLevelAuth: 'Nivel Medio (Bitácora del Ejecutivo)',
        messages: [
          { sender: 'Tercero', time: '17:30', text: 'Mi prima me mandó a devolver este teléfono porque no le gustó el color. Quiero el dinero en efectivo ahorita porque ella viaja de viaje.' },
          { sender: 'Ejecutivo Módulo', time: '17:31', text: 'Solicitando validación en sistema de auditoría...' }
        ]
      },
      erp: {
        title: 'Alerta del Sistema de Prevención de Fraudes (CyberSource)',
        highLevelAuth: 'Nivel Alto (Auditoría Anti-Fraude)',
        orderId: 'ALERT-FRAUD-9912',
        status: 'RED FLAG - TARJETA CLONADA / CONGELADA',
        logs: [
          '[SISTEMA]: Tarjeta de Crédito asociada reportada como ROBADA por el banco emisor 1 hora después de la compra.',
          '[SISTEMA]: Orden marcada para RETENCIÓN E INVESTIGACIÓN POLICIAL.',
          '[INSTRUCCIÓN]: NO EJECUTAR EXTORNO NI ENTREGAR EFECTIVO. ALERTAR A SEGURIDAD INTERNA.'
        ]
      }
    },
    competencies: {
      objeciones: 20,
      normativa: 30,
      empatia: 10,
      protocolo: 40
    }
  }
];

export default function AdaptiveAssessment() {
  // State for assessment progress
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelQuestions, setLevelQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // State for question interaction
  const [selectedOption, setSelectedOption] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [hintUnlocked, setHintUnlocked] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState('ticket'); // 'ticket' | 'chat' | 'erp'
  
  // Assessment scoring & results track
  const [userAnswers, setUserAnswers] = useState({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showLevelCompletionModal, setShowLevelCompletionModal] = useState(false);
  const [level1Passed, setLevel1Passed] = useState(false);
  
  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [copiedReport, setCopiedReport] = useState(false);

  useEffect(() => {
    const filtered = QUESTION_BANK.filter(q => q.level === currentLevel);
    setLevelQuestions(filtered);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAttempts(0);
    setHintUnlocked(false);
    setFeedback(null);
    setActiveTab('ticket');
  }, [currentLevel]);

  useEffect(() => {
    let interval = null;
    if (timerActive && !isQuizFinished) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, isQuizFinished]);

  const currentQuestion = levelQuestions[currentQuestionIndex] || null;

  const handleSelectOption = (index) => {
    if (feedback?.isCorrect || attempts >= 2) return;
    setSelectedOption(index);
  };

  const handleVerifyAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;

    const chosenOption = currentQuestion.options[selectedOption];
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (chosenOption.isCorrect) {
      setFeedback({
        isCorrect: true,
        title: '¡Excelencia Operativa!',
        message: chosenOption.feedback,
        indecopi: currentQuestion.indecopiNorm
      });

      // Save user answer record
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          correct: true,
          attempts: newAttempts,
          hintUsed: hintUnlocked,
          question: currentQuestion
        }
      }));
    } else {
      if (newAttempts === 1) {
        setFeedback({
          isCorrect: false,
          title: 'Respuesta Incorrecta (Intento 1 de 2)',
          message: chosenOption.feedback + ' Puedes revisar la evidencia nuevamente o desbloquear la Pista Formativa sin penalización de puntaje.',
          canUnlockHint: true
        });
      } else {
        // Failed second attempt
        const correctOpt = currentQuestion.options.find(o => o.isCorrect);
        setFeedback({
          isCorrect: false,
          title: 'Respuesta Incorrecta - Solución Guiada',
          message: `${chosenOption.feedback} La respuesta correcta era: "${correctOpt.text}"`,
          indecopi: currentQuestion.indecopiNorm,
          isFinalError: true
        });

        setUserAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: {
            correct: false,
            attempts: newAttempts,
            hintUsed: hintUnlocked,
            question: currentQuestion
          }
        }));
      }
    }
  };

  const handleUnlockHint = () => {
    setHintUnlocked(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setAttempts(0);
    setHintUnlocked(false);
    setFeedback(null);
    setActiveTab('ticket');

    if (currentQuestionIndex + 1 < levelQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Level completed!
      checkLevelCompletion();
    }
  };

  const checkLevelCompletion = () => {
    const currentLevelQuestions = QUESTION_BANK.filter(q => q.level === currentLevel);
    let correctCount = 0;

    currentLevelQuestions.forEach(q => {
      if (userAnswers[q.id]?.correct) {
        correctCount++;
      }
    });

    if (currentLevel === 1) {
      const passed = correctCount >= 2;
      setLevel1Passed(passed);
      setShowLevelCompletionModal(true);
    } else {
      // Level 2 Finished -> Complete entire assessment
      setIsQuizFinished(true);
      setTimerActive(false);
    }
  };

  const handleProceedToLevel2 = () => {
    setShowLevelCompletionModal(false);
    setCurrentLevel(2);
  };

  const handleRestartAssessment = () => {
    setCurrentLevel(1);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAttempts(0);
    setHintUnlocked(false);
    setFeedback(null);
    setUserAnswers({});
    setIsQuizFinished(false);
    setShowLevelCompletionModal(false);
    setLevel1Passed(false);
    setSecondsElapsed(0);
    setTimerActive(true);
  };

  const assessmentSummary = useMemo(() => {
    const totalQuestions = Object.keys(userAnswers).length;
    let correctAnswers = 0;
    let totalAttempts = 0;

    let totalObjeciones = 0;
    let totalNormativa = 0;
    let totalEmpatia = 0;
    let totalProtocolo = 0;

    let maxObjeciones = 0;
    let maxNormativa = 0;
    let maxEmpatia = 0;
    let maxProtocolo = 0;

    Object.values(userAnswers).forEach(ans => {
      totalAttempts += ans.attempts;
      const comp = ans.question.competencies;

      maxObjeciones += comp.objeciones;
      maxNormativa += comp.normativa;
      maxEmpatia += comp.empatia;
      maxProtocolo += comp.protocolo;

      if (ans.correct) {
        correctAnswers++;
        totalObjeciones += comp.objeciones;
        totalNormativa += comp.normativa;
        totalEmpatia += comp.empatia;
        totalProtocolo += comp.protocolo;
      }
    });

    const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    const calcCompPercent = (val, max) => (max > 0 ? Math.round((val / max) * 100) : 0);

    const compObjecionesPct = calcCompPercent(totalObjeciones, maxObjeciones);
    const compNormativaPct = calcCompPercent(totalNormativa, maxNormativa);
    const compEmpatiaPct = calcCompPercent(totalEmpatia, maxEmpatia);
    const compProtocoloPct = calcCompPercent(totalProtocolo, maxProtocolo);

    // Maturity Level Determination
    let maturityTitle = 'Ejecutivo Promesa en Posventa';
    let maturityDescription = 'Demuestras conocimientos operativos básicos pero requieres reforzar el manejo normativo de INDECOPI y la resolución de crisis de alta complejidad.';
    let maturityBadgeColor = 'bg-amber-100 text-amber-800 border-amber-300';

    if (scorePercentage >= 85) {
      maturityTitle = 'Máster Senior en Experiencia del Cliente & Posventa Retail';
      maturityDescription = 'Dominio excepcional en gestión de objeciones, normativa peruana y protocolos de prevención de pérdidas y contingencias Cyber.';
      maturityBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (scorePercentage >= 65) {
      maturityTitle = 'Especialista de Atención y Gestión de Reclamaciones';
      maturityDescription = 'Buen desempeño en resolución de reclamos estándar con capacidad de análisis de evidencia multicanal.';
      maturityBadgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-300';
    }

    return {
      totalQuestions,
      correctAnswers,
      scorePercentage,
      totalAttempts,
      compObjecionesPct,
      compNormativaPct,
      compEmpatiaPct,
      compProtocoloPct,
      maturityTitle,
      maturityDescription,
      maturityBadgeColor
    };
  }, [userAnswers]);

  const handleCopyReport = () => {
    const reportText = `
=== REPORTE DE EVALUACIÓN ADAPTATIVA DE POSVENTA RETAIL ===
Evaluado: Ejecutivo de Atención Posventa
Fecha: ${new Date().toLocaleDateString('es-PE')}
Tiempo Transcurrido: ${Math.floor(secondsElapsed / 60)}m ${secondsElapsed % 60}s

RESULTADOS GENERALES:
- Nivel de Madurez: ${assessmentSummary.maturityTitle}
- Precision Total: ${assessmentSummary.scorePercentage}% (${assessmentSummary.correctAnswers}/${assessmentSummary.totalQuestions} casos resueltos)
- Niveles Completados: ${level1Passed ? 'Nivel 1 (Aprobado)' : 'Nivel 1 (Reprobado)'} ${currentLevel === 2 ? '| Nivel 2 (Completado)' : ''}

DESGLOSE DE COMPETENCIAS:
1. Manejo de Objeciones y Crisis: ${assessmentSummary.compObjecionesPct}%
2. Conocimiento Normativo (INDECOPI/SBS): ${assessmentSummary.compNormativaPct}%
3. Empatía y Comunicación Proactiva: ${assessmentSummary.compEmpatiaPct}%
4. Análisis de Trazabilidad y Protocolo: ${assessmentSummary.compProtocoloPct}%

RECOMENDACIÓN FORMATIVA:
${assessmentSummary.maturityDescription}
===========================================================
    `.trim();

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 3000);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isQuizFinished) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Dashboard Header */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-1">
                  <Award className="w-5 h-5" /> REPORTE DE EVALUACIÓN FINAL
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Resultados del Simulador de Posventa Retail
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Evaluación adaptativa contextualizada en el sector retail peruano
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyReport}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition shadow-lg shadow-indigo-600/20 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  {copiedReport ? '¡Copiado al Portapapeles!' : 'Copiar Reporte'}
                </button>
                <button
                  onClick={handleRestartAssessment}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition text-sm"
                >
                  <RotateCcw className="w-4 h-4" /> Reiniciar Simulador
                </button>
              </div>
            </div>
          </div>

          {/* Maturity Level & Main Score Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Maturity Card */}
            <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Nivel de Madurez Asignado</span>
                <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold ${assessmentSummary.maturityBadgeColor}`}>
                  <ShieldCheck className="w-4 h-4" />
                  {assessmentSummary.maturityTitle}
                </div>
                <p className="text-slate-300 text-sm mt-4 leading-relaxed">
                  {assessmentSummary.maturityDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-400" /> Tiempo total: {formatTime(secondsElapsed)}</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> Casos resueltos: {assessmentSummary.correctAnswers} de {assessmentSummary.totalQuestions}</span>
              </div>
            </div>

            {/* Score Ring / Percentage */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">Precisión General</span>
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="52" stroke="#334155" strokeWidth="10" fill="transparent" />
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke={assessmentSummary.scorePercentage >= 70 ? '#10b981' : '#f59e0b'}
                    strokeWidth="10"
                    strokeDasharray={326.72}
                    strokeDashoffset={326.72 - (326.72 * assessmentSummary.scorePercentage) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-extrabold text-white">{assessmentSummary.scorePercentage}%</span>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Acierto</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                {assessmentSummary.scorePercentage >= 70 ? 'Aprobado satisfactoriamente' : 'Requiere reforzamiento'}
              </p>
            </div>
          </div>

          {/* Competency Breakdown Charts */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-base">
              <TrendingUp className="w-5 h-5" /> Desglose por Competencias Clave en Retail
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Competency 1 */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-200">Manejo de Objeciones y Crisis</span>
                  <span className="text-sm font-bold text-indigo-400">{assessmentSummary.compObjecionesPct}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${assessmentSummary.compObjecionesPct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">Capacidad de desescalar clientes irritados y gestionar fallas sistémicas.</p>
              </div>

              {/* Competency 2 */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-200">Conocimiento Normativo (INDECOPI/SBS)</span>
                  <span className="text-sm font-bold text-emerald-400">{assessmentSummary.compNormativaPct}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${assessmentSummary.compNormativaPct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">Aplicación del Código de Protección al Consumidor y plazos de extorno.</p>
              </div>

              {/* Competency 3 */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-200">Empatía y Comunicación Proactiva</span>
                  <span className="text-sm font-bold text-amber-400">{assessmentSummary.compEmpatiaPct}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${assessmentSummary.compEmpatiaPct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">Trato asertivo y transparencia en plazos de solución.</p>
              </div>

              {/* Competency 4 */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-200">Análisis de Trazabilidad ERP y Protocolos</span>
                  <span className="text-sm font-bold text-cyan-400">{assessmentSummary.compProtocoloPct}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-cyan-500 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${assessmentSummary.compProtocoloPct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">Verificación de pasarelas de pago, vouchers y prevención de fraudes.</p>
              </div>

            </div>
          </div>

          {/* Training Recommendations */}
          <div className="bg-indigo-950/40 border border-indigo-800/60 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-indigo-400" /> Plan Personalizado de Capacitación Sugerido
            </h3>
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              <li>Módulo de Jurisprudencia INDECOPI en entregas e-commerce y vicios ocultos en frágiles.</li>
              <li>Taller intensivo en lectura de logs transaccionales Niubiz/Izipay en ERP SAP/OMS.</li>
              <li>Protocolo de Prevención de Lavado de Activos (PLAFT) en devoluciones presenciales de alto valor.</li>
            </ul>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between p-3 md:p-6">
      
      {/* Modal Level 1 Transition */}
      {showLevelCompletionModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-3">
              {level1Passed ? (
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle className="w-10 h-10" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/30">
                  <AlertTriangle className="w-10 h-10" />
                </div>
              )}

              <h2 className="text-2xl font-bold text-white">
                {level1Passed ? '¡Nivel 1 Superado!' : 'Nivel 1 Finalizado'}
              </h2>
              <p className="text-slate-300 text-sm">
                {level1Passed
                  ? 'Has demostrado solidez en la atención de reclamos operativos estándar. Desbloqueaste el Nivel 2: Manejo de Crisis y Casos Complejos.'
                  : 'No alcanzaste el puntaje mínimo de aprobación (2 respuestas correctas). Puedes reintentar el Nivel 1 o explorar el Nivel 2 en modo entrenamiento.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleProceedToLevel2}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                Continuar al Nivel 2 (Crisis y Casos Complejos) <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleRestartAssessment}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition"
              >
                Reintentar Nivel 1 desde el Inicio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header & Progress */}
      <header className="max-w-7xl w-full mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Title & Level Indicator */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Nivel {currentLevel}: {currentLevel === 1 ? 'Atención Estándar' : 'Manejo de Crisis'}
                </span>
                <span className="text-xs text-slate-400">Retail Peruano</span>
              </div>
              <h1 className="text-base md:text-lg font-bold text-white mt-0.5">
                {currentQuestion?.caseTitle || 'Cargando caso...'}
              </h1>
            </div>
          </div>

          {/* Stats Header */}
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Pregunta {currentQuestionIndex + 1} de {levelQuestions.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${((currentQuestionIndex + 1) / levelQuestions.length) * 100}%`
            }}
          />
        </div>
      </header>

      {/* Main Interactive Split Screen */}
      {currentQuestion && (
        <main className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
          
          {}
          <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between shadow-xl">
            <div>
              {/* Evidence Tab Selectors */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-indigo-400" /> Matriz de Evidencias Real
                </span>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('ticket')}
                  className={`py-2 px-2 text-xs font-medium rounded-xl flex flex-col items-center gap-1 transition ${
                    activeTab === 'ticket'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Ticket / Voucher</span>
                </button>

                <button
                  onClick={() => setActiveTab('chat')}
                  className={`py-2 px-2 text-xs font-medium rounded-xl flex flex-col items-center gap-1 transition ${
                    activeTab === 'chat'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Correo / Chat</span>
                </button>

                <button
                  onClick={() => setActiveTab('erp')}
                  className={`py-2 px-2 text-xs font-medium rounded-xl flex flex-col items-center gap-1 transition ${
                    activeTab === 'erp'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>ERP Auditoría</span>
                </button>
              </div>

              {/* Evidence Content Display */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 min-h-[300px] flex flex-col justify-between">
                
                {/* TICKET TAB */}
                {activeTab === 'ticket' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                        {currentQuestion.evidences.ticket.lowLevelAuth}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {currentQuestion.evidences.ticket.code}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
                      {currentQuestion.evidences.ticket.title}
                    </h4>

                    <ul className="space-y-2 text-xs text-slate-300 font-mono">
                      {currentQuestion.evidences.ticket.details.map((detail, idx) => (
                        <li key={idx} className="bg-slate-900/80 p-2 rounded border border-slate-800/80 flex items-start gap-2">
                          <span className="text-indigo-400 font-bold">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CHAT TAB */}
                {activeTab === 'chat' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                        {currentQuestion.evidences.chat.midLevelAuth}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
                      {currentQuestion.evidences.chat.title}
                    </h4>

                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {currentQuestion.evidences.chat.messages.map((msg, idx) => (
                        <div key={idx} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                            <span>{msg.sender}</span>
                            <span>{msg.time}</span>
                          </div>
                          <p className="text-slate-200 italic">"{msg.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ERP TAB */}
                {activeTab === 'erp' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {currentQuestion.evidences.erp.highLevelAuth}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        {currentQuestion.evidences.erp.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2 flex justify-between">
                      <span>{currentQuestion.evidences.erp.title}</span>
                      <span className="text-xs font-mono text-slate-400">{currentQuestion.evidences.erp.orderId}</span>
                    </h4>

                    <div className="space-y-2 text-xs font-mono">
                      {currentQuestion.evidences.erp.logs.map((log, idx) => (
                        <div key={idx} className="bg-slate-900/90 p-2 rounded border border-slate-800/60 text-slate-300">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 mt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><Info className="w-3.5 h-3.5" /> Alterna entre pestañas para contrastar evidencias</span>
                  <span>Retail Posventa v2.6</span>
                </div>
              </div>
            </div>

            {/* Hint Box (If Unlocked) */}
            {hintUnlocked && (
              <div className="mt-4 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200 space-y-1 animate-in fade-in duration-300">
                <div className="font-bold flex items-center gap-1.5 text-amber-300">
                  <HelpCircle className="w-4 h-4" /> Pista Formativa Desbloqueada:
                </div>
                <p>{currentQuestion.hint}</p>
              </div>
            )}
          </section>

          {}
          <section className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-5">
              
              {/* Question Statement */}
              <div>
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Pregunta del Caso</span>
                <h3 className="text-base md:text-lg font-semibold text-white mt-1 leading-relaxed">
                  {currentQuestion.questionText}
                </h3>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let optionStyle = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:border-slate-500';

                  if (isSelected) {
                    optionStyle = 'bg-indigo-950/80 border-indigo-500 text-white ring-1 ring-indigo-500';
                  }

                  if (feedback?.isCorrect && option.isCorrect) {
                    optionStyle = 'bg-emerald-950/80 border-emerald-500 text-white ring-1 ring-emerald-500';
                  }

                  if (feedback && !feedback.isCorrect && isSelected) {
                    optionStyle = 'bg-rose-950/80 border-rose-500 text-white ring-1 ring-rose-500';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={feedback?.isCorrect || attempts >= 2}
                      className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 text-xs md:text-sm leading-relaxed ${optionStyle}`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-grow">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Block */}
              {feedback && (
                <div className={`p-4 rounded-xl border text-xs md:text-sm space-y-2 animate-in fade-in duration-300 ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
                }`}>
                  <div className="font-bold flex items-center gap-2">
                    {feedback.isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
                    <span>{feedback.title}</span>
                  </div>
                  <p>{feedback.message}</p>

                  {feedback.indecopi && (
                    <div className="pt-2 border-t border-slate-700/50 text-xs italic text-slate-300 font-mono">
                      📌 Normativa INDECOPI / Política: {feedback.indecopi}
                    </div>
                  )}

                  {/* Hint Unlock Option if first error */}
                  {feedback.canUnlockHint && !hintUnlocked && (
                    <div className="pt-2">
                      <button
                        onClick={handleUnlockHint}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs rounded-lg transition flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" /> Desbloquear Pista Formativa (Sin Penalización)
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Action Buttons Footer */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Intentos utilizados: <span className="font-bold text-slate-200">{attempts} de 2</span>
              </div>

              <div>
                {!feedback?.isCorrect && attempts < 2 && (
                  <button
                    onClick={handleVerifyAnswer}
                    disabled={selectedOption === null}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition flex items-center gap-2 ${
                      selectedOption !== null
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Confirmar Respuesta
                  </button>
                )}

                {(feedback?.isCorrect || attempts >= 2) && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs md:text-sm rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    Siguiente Caso <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </section>

        </main>
      )}

      {/* Footer Branding */}
      <footer className="max-w-7xl w-full mx-auto mt-4 text-center text-xs text-slate-500">
        Simulador Adaptativo de Reclamos Posventa • Diseñado para Capacitación Corporativa Retail Peruano
      </footer>

    </div>
  );
}
