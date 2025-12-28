
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, MessageCircle, Volume2, Sparkles, Loader2, Phone } from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

// --- Audio Utilities (Manual Implementation per Guidelines) ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState('');
  
  const sessionRef = useRef<any>(null);
  const audioContextsRef = useRef<{ input?: AudioContext; output?: AudioContext }>({});
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const systemInstruction = `
    You are the Autovine Royal Assistant, an elite AI support agent for Autovine Wash, Nairobi's premier automotive detailing center.

    VOICE & ACCENT SPECIFICATIONS:
    - Your primary language is Kenyan English. Speak with the distinct prosody, rhythm, and professional accent common in Nairobi's corporate and luxury service sectors.
    - Infuse your speech with Kenyan English nuances: use "Kindly" frequently, use "Pole" (to express empathy), and "Karibu sana".
    - Your tone should be warm, respectful, and sophisticated.
    
    Location: Autovine Wash, Utawala Road, opposite Komarock Modern Hospital, Nairobi, Kenya.
    Google Maps Link: https://maps.app.goo.gl/M9tskqD97hY4d9yt8
    Contacts: Phone 0700 654068, Email autovinewash@gmail.com.
    Till Number (Lipa na M-PESA): 206524.

    OFFICIAL PRICE LIST (KES):
    - Body Wash: Saloon 250 / SUV & Van 300
    - Vacuum Cleaning: Saloon 200 / SUV & Van 250
    - Engine Wash: Steam 500 / Normal 300
    - Headlight Restoration: 500
    - Rim Restoration: 600
    - Watermark Removal: 500
    - Roof Detailing: 1,000
    - Seats Cleaning: 500
    - Buffing: Saloon 3,000 / SUV & Van 4,000
    
    Loyalty Program (Royal Circle):
    - Earn 1 point for every 100 KES spent.
    - 500 points = Free Premium Wax.
    - Join using your WhatsApp number.
    
    Key Action: If a user wants to book, offer to open WhatsApp. 
    Always close with "Asante sana" or "Karibu Autovine."
  `;

  const openWhatsApp = () => {
    window.open('https://wa.me/254700654068', '_blank');
    return "WhatsApp opened successfully.";
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    audioContextsRef.current.input?.close();
    audioContextsRef.current.output?.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction,
          tools: [{
            functionDeclarations: [{
              name: 'openWhatsApp',
              description: 'Opens the Autovine WhatsApp contact for booking or chat.',
              parameters: { type: 'OBJECT', properties: {} }
            }]
          }],
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const outCtx = audioContextsRef.current.output!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'openWhatsApp') {
                  const result = openWhatsApp();
                  sessionPromise.then(session => {
                    session.sendToolResponse({
                      functionResponses: { id: fc.id, name: fc.name, response: { result } }
                    });
                  });
                }
              }
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + message.serverContent!.outputTranscription!.text);
            }
            if (message.serverContent?.turnComplete) {
              setTimeout(() => setTranscription(''), 3000);
            }
          },
          onerror: (e) => {
            console.error('Voice Assistant Error:', e);
            stopSession();
          },
          onclose: () => {
            stopSession();
          }
        }
      });

      sessionRef.current = sessionPromise;

    } catch (err) {
      console.error('Failed to start voice session:', err);
      setIsConnecting(false);
    }
  };

  const toggleAssistant = () => {
    if (isActive) {
      stopSession();
    } else {
      startSession();
    }
  };

  return (
    <>
      <div className="fixed bottom-8 left-8 z-[60]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all ${isOpen ? 'bg-orange-600' : 'bg-zinc-900 border border-zinc-800'}`}
        >
          {isOpen ? <X className="text-white w-6 h-6" /> : (
            <div className="relative">
              <Sparkles className="text-orange-500 w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-600 rounded-full animate-ping"></div>
            </div>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 left-8 w-80 md:w-96 glass-nav border border-white/10 rounded-[2.5rem] shadow-2xl z-[60] overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-900/20">
                  <MessageCircle className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-tight">Royal Assistant</h4>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest text-orange-400">Kenyan English Optimized</p>
                </div>
              </div>

              <div className="mb-10 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 bg-orange-600/20 rounded-full blur-2xl animate-pulse"
                      />
                    )}
                  </AnimatePresence>
                  
                  <button
                    onClick={toggleAssistant}
                    disabled={isConnecting}
                    className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-orange-600 shadow-[0_0_40px_rgba(249,115,22,0.4)]' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                  >
                    {isConnecting ? (
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    ) : isActive ? (
                      <Mic className="w-8 h-8 text-white" />
                    ) : (
                      <MicOff className="w-8 h-8 text-zinc-500" />
                    )}
                  </button>
                </div>
                
                <h5 className="text-lg font-bold mb-2">
                  {isConnecting ? 'Setting up connection...' : isActive ? 'Listening...' : 'Karibu sana! I am ready.'}
                </h5>
                <p className="text-zinc-500 text-sm">
                  {isActive ? 'Go ahead, ask me about our prices.' : 'Tap to start a conversation with our premium Kenyan voice assistant.'}
                </p>
              </div>

              <div className="min-h-[60px] p-4 rounded-2xl bg-black/40 border border-white/5 mb-8">
                <p className="text-sm text-zinc-400 italic leading-relaxed">
                  {transcription || (isActive ? "Waiting for you to speak..." : "Your conversation details will appear here.")}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  <Volume2 className="w-3 h-3" />
                  Till: 206524
                </div>
                <button 
                  onClick={() => window.open('https://wa.me/254700654068', '_blank')}
                  className="w-full py-4 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600/20 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Book on WhatsApp
                </button>
              </div>
            </div>
            
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant;
