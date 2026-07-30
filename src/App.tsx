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

  const isLevelComplete = () => currentLevelQuestions.every(q => answers[q.id] !== undefined);

  const handleNext = () => {
    if (!isLevelComplete()) {
      setErrorMsg('Por favor responde todas las preguntas antes de continuar.');
      return;
    }
    if (currentLevel === 1) {
      setCurrentLevel(2);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentLevel === 2) setCurrentLevel(1);
  };

  const calculateResults = () => {
    const level1 = QUESTIONS.filter(q => q.level === 1).reduce((acc, q) => acc + (answers[q.id] === q.correct ? 2 : 0), 0);
    const level2 = QUESTIONS.filter(q => q.level === 2).reduce((acc, q) => acc + (answers[q.id] === q.correct ? 2 : 0), 0);
    const total = level1 + level2;
    setResults({ level1, level2, total });
    setScreen('report');
  };

  const handleReset = () => {
    setUserData({ name: '', role: '', store: '' });
    setAnswers({});
    setExpertNotes({});
    setResults(null);
    setCurrentLevel(1);
    setScreen('registration');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      {screen === 'registration' && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="flex justify-center mb-6"><ShieldCheck size={48} className="text-blue-600" /></div>
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">Simulador Postventa</h1>
          <p className="text-slate-500 text-center mb-6">Retail Peruano: Capacitación Adaptativa</p>
          <form onSubmit={handleStart} className="space-y-4">
            <div className="relative">
              <User size={18} className="absolute left-3 top-3.5 text-slate-400" />
              <input required placeholder="Nombre Completo" className="w-full p-3 pl-10 border rounded-lg" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
            </div>
            <div className="relative">
              <Award size={18} className="absolute left-3 top-3.5 text-slate-400" />
              <input required placeholder="Cargo" className="w-full p-3 pl-10 border rounded-lg" value={userData.role} onChange={e => setUserData({...userData, role: e.target.value})} />
            </div>
            <div className="relative">
              <Building2 size={18} className="absolute left-3 top-3.5 text-slate-400" />
              <input required placeholder="Sucursal" className="w-full p-3 pl-10 border rounded-lg" value={userData.store} onChange={e => setUserData({...userData, store: e.target.value})} />
            </div>
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-bold">Comenzar Evaluación</button>
          </form>
        </div>
      )}

      {screen === 'assessment' && (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-bold text-blue-600 uppercase">Nivel {currentLevel} de 2</div>
            <div className="flex items-center gap-2"><Timer size={20} /> <span className="font-mono">Sesión Iniciada</span></div>
          </div>

          {currentLevelQuestions.map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-6">
              <h3 className="font-bold mb-4">{q.text}</h3>
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleAnswer(q.id, i)}
                    className={`w-full text-left p-3 rounded-lg border ${answers[q.id] === i ? 'bg-blue-50 border-blue-500' : 'hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={() => toggleExpertNote(q.id)} className="mt-4 text-sm text-blue-600 flex items-center gap-2 underline">
                <HelpCircle size={16} /> {expertNotes[q.id] ? 'Ocultar Nota de Experto' : 'Ver Nota de Experto'}
              </button>
              {expertNotes[q.id] && <p className="mt-2 p-3 bg-amber-50 text-amber-800 rounded-lg text-sm italic">{q.expertNote}</p>}
            </div>
          ))}

          {errorMsg && <p className="text-red-600 text-sm mb-4 text-center font-semibold">{errorMsg}</p>}

          <div className="flex gap-3">
            {currentLevel === 2 && (
              <button 
                onClick={handleBack}
                className="flex-none bg-white border-2 border-slate-300 text-slate-700 p-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <ChevronLeft size={20} /> Volver
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-1 bg-slate-900 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              {currentLevel === 1 ? 'Pasar a Nivel 2 (Negociación)' : 'Finalizar Evaluación'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {screen === 'report' && results && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl print:shadow-none" id="report">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Reporte de Desempeño</h2>
            <p className="text-slate-500">{userData.name} - {userData.role} - {userData.store}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-100 rounded-xl">
              <p className="text-sm">Nivel 1 (Procedimiento)</p>
              <p className="text-2xl font-bold">{results.level1}/10 pts</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <p className="text-sm">Nivel 2 (Negociación)</p>
              <p className="text-2xl font-bold">{results.level2}/10 pts</p>
            </div>
          </div>
          <div className="text-center py-6 border-y mb-8">
            <p className="text-5xl font-black text-blue-600">{results.total}/20</p>
            <p className="font-bold mt-2 text-xl">{results.total >= 14 ? '¡Logrado con Éxito!' : 'En Proceso de Mejora'}</p>
          </div>

          <div className="mb-8 space-y-3">
            <h3 className="font-bold text-lg mb-2">Detalle de Respuestas</h3>
            {QUESTIONS.map(q => {
              const isCorrect = answers[q.id] === q.correct;
              return (
                <div key={q.id} className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 text-sm">
                  {isCorrect ? <CheckCircle2 size={18} className="text-green-600 flex-none mt-0.5" /> : <XCircle size={18} className="text-red-500 flex-none mt-0.5" />}
                  <span>{q.text}</span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 print:hidden">
            <button onClick={() => window.print()} className="flex-1 border-2 p-3 rounded-lg flex items-center justify-center gap-2"><Printer size={20} /> Imprimir</button>
            <button onClick={handleReset} className="flex-1 bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center gap-2"><RefreshCw size={20} /> Reiniciar</button>
          </div>
        </div>
      )}
    </div>
  );
}
