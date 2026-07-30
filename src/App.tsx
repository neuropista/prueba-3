import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Building2, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Printer, 
  RefreshCw,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const QUESTIONS = [
  // NIVEL 1: Procedimientos
  { id: 1, level: 1, text: "¿Cuál es el plazo máximo de atención para un reclamo según la normativa vigente en caso de falta de conformidad?", options: ["5 días hábiles", "15 días hábiles", "30 días calendario", "24 horas"], correct: 1, expertNote: "El Código de Protección y Defensa del Consumidor establece un plazo máximo de 15 días hábiles para dar respuesta a un reclamo." },
  { id: 2, level: 1, text: "Ante un reclamo por doble cobro online, ¿cuál es la primera acción validada?", options: ["Solicitar estado de cuenta al banco", "Verificar el estado del pedido en SAP/ERP", "Reembolsar inmediatamente", "Indicar al cliente que espere 48 horas"], correct: 1, expertNote: "Siempre se debe validar el estado transaccional en el sistema interno antes de proceder con cualquier acción bancaria." },
  { id: 3, level: 1, text: "Si un cliente no presenta boleta de venta, pero tiene el voucher del POS, ¿es válido para iniciar el reclamo?", options: ["No, requiere boleta obligatoriamente", "Sí, se puede validar con el número de transacción", "Se requiere una declaración jurada", "Solo si paga en efectivo"], correct: 1, expertNote: "El voucher del POS es una evidencia válida para rastrear la venta en el sistema y recuperar el comprobante original." },
  { id: 4, level: 1, text: "Para un producto electrónico con garantía, ¿cuál es el paso técnico inicial?", options: ["Cambio inmediato", "Envío a servicio técnico autorizado para diagnóstico", "Reembolso", "Llamar al gerente"], correct: 1, expertNote: "El diagnóstico técnico es esencial para descartar mal uso del equipo y aplicar la garantía adecuadamente." },
  { id: 5, level: 1, text: "En caso de retraso en despacho por alta demanda, ¿cuál es la política de comunicación?", options: ["Esperar a que el cliente llame", "Informar proactivamente antes de que venza el plazo", "Enviar correo masivo automático", "No comunicar hasta tener el producto"], correct: 1, expertNote: "La proactividad en la comunicación reduce drásticamente el nivel de frustración del cliente." },
  // NIVEL 2: Negociación
  { id: 6, level: 2, text: "Un cliente exige un cambio de producto usado sin falla de fábrica. ¿Cómo respondes?", options: ["Aceptar para evitar escándalo", "Explicar las condiciones de garantía y ofrecer servicio de mantenimiento", "Bloquear al cliente", "Ignorar el pedido"], correct: 1, expertNote: "La empatía con firmeza permite mantener la fidelidad del cliente sin infringir las políticas de la empresa." },
  { id: 7, level: 2, text: "El cliente está muy molesto por la demora. ¿Qué técnica de contención usas?", options: ["Contradecir al cliente", "Escucha activa y validación de su malestar", "Hablar más fuerte que él", "Desviar el tema"], correct: 1, expertNote: "Validar la emoción del cliente es el primer paso para de-escalar cualquier conflicto en posventa." },
  { id: 8, level: 2, text: "El cliente solicita un beneficio extra por el inconveniente sufrido. ¿Cómo procedes?", options: ["Otorgar cualquier descuento", "Evaluar el margen según políticas de retención", "Negar rotundamente", "Consultar a gerencia cada vez"], correct: 1, expertNote: "Tener autonomía para otorgar beneficios de retención definidos mejora la experiencia del cliente significativamente." },
  { id: 9, level: 2, text: "Ante un cliente que graba la conversación de forma agresiva, ¿qué haces?", options: ["Salir de la tienda", "Mantener la calma, ser profesional y seguir el protocolo", "Grabar al cliente también", "Llamar a seguridad de forma prepotente"], correct: 1, expertNote: "Mantener el profesionalismo es fundamental, ya que el video puede convertirse en evidencia pública." },
  { id: 10, level: 2, text: "En un acuerdo de compensación, ¿qué es lo más importante?", options: ["Que el cliente se vaya rápido", "Que ambas partes entiendan y acepten la solución", "Ganar el argumento", "Ofrecer lo menos posible"], correct: 1, expertNote: "Un acuerdo sostenible requiere el compromiso y satisfacción del cliente para evitar futuros reclamos." }
];

export default function App() {
  const [screen, setScreen] = useState('registration'); // registration, assessment, report
  const [userData, setUserData] = useState({ name: '', role: '', store: '' });
  const [answers, setAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);
  // Corrección: notas de experto ahora se controlan por pregunta (objeto), no con un solo booleano global
  const [expertNotes, setExpertNotes] = useState({});
  const [results, setResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStart = (e) => {
    e.preventDefault();
    setScreen('assessment');
  };

  const handleAnswer = (qId, optionIdx) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setErrorMsg('');
  };

  const toggleExpertNote = (qId) => {
    setExpertNotes(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const currentLevelQuestions = QUESTIONS.filter(q => q.level === currentLevel);

  // Corrección: validar que todas las preguntas del nivel actual estén respondidas
  const isLevelComplete = () 
