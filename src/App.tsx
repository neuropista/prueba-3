import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  Timer, 
  Printer, 
  RefreshCw, 
  ChevronRight 
} from 'lucide-react';

interface Question {
  id: number;
  level: number;
  text: string;
  options: string[];
  correct: number;
  expertNote: string;
}

interface UserData {
  name: string;
  role: string;
  store: string;
}

interface Results {
  level1: number;
  level2: number;
  total: number;
}

const QUESTIONS: Question[] = [
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
  const [screen, setScreen] = useState<'registration' | 'assessment' | 'report'>('registration');
  const [userData, setUserData] = useState<UserData>({ name: '', role: '', store: '' });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [showExpertNotes, setShowExpertNotes] = useState<Record<number, boolean>>({});
  const [results, setResults] = useState<Results null |>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setScreen('assessment');
  };

  const handleAnswer = (qId: number, optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleExpertNote = (qId: number) => {
    setShowExpertNotes(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const calculateResults = () => {
    const level1 = QUESTIONS.filter(q => q.level === 1).reduce((acc, q) => acc + (answers[q.id] === q.correct ? 2 : 0), 0);
    const level2 = QUESTIONS.filter(q => q.level === 2).reduce((acc, q) => acc + (answers[q.id] === q.correct ? 2 : 0), 0);
    const total = level1 + level2;
    setResults({ level1, level2, total });
    setScreen('report');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      {screen === 'registration' && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="flex justify-center mb-6">
            <ShieldCheck className="text-blue-600" size="{48}"/>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">Simulador Postventa</h1>
          <p className="text-slate-500 text-center mb-6">Retail Peruano: Capacitación Adaptativa</p>
          <form onSubmit={handleStart} className="space-y-4">
            <input 
              required 
              placeholder="Nombre Completo" 
              className="w-full p-3 border rounded-lg" 
              onChange={e => setUserData({ ...userData, name: e.target.value })} 
            />
            <input 
              required 
              placeholder="Cargo" 
              className="w-full p-3 border rounded-lg" 
              onChange={e => setUserData({ ...userData, role: e.target.value })} 
            />
            <input 
              required 
              placeholder="Sucursal" 
              className="w-full p-3 border rounded-lg" 
              onChange={e => setUserData({ ...userData, store: e.target.value })} 
            />
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-bold">
              Comenzar Evaluación
            </button>
          </form>
        </div>
      )}

      {screen === 'assessment' && (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-bold text-blue-600 uppercase">Nivel {currentLevel} de 2</div>
            <div className="flex items-
