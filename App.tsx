
import React, { useState, useRef, useEffect } from 'react';
import { THEME, CARDS, GiltIcon, QCharRD, QCharBall, QCharChess, QCharStarve, QCharDragon, QCharRun } from './constants';
import { Particle } from './types';

const App: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [sequenceStage, setSequenceStage] = useState<'idle' | 'chars' | 'settled' | 'finalShow' | 'complete'>('idle');
  const [particles, setParticles] = useState<Particle[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const sequenceInitiated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !sequenceInitiated.current) {
        sequenceInitiated.current = true;
        handleStartSequence();
      }
    }, { threshold: 0.5 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleStartSequence = () => {
    setSequenceStage('chars');
    setTimeout(() => {
      setSequenceStage('settled');
      setTimeout(() => {
        setSequenceStage('finalShow');
        const newParticles: Particle[] = CARDS.map((card, i) => ({
          id: i,
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 100,
          vy: (Math.random() - 0.5) * 100 - 50,
          iconType: card.iconType
        }));
        setParticles(newParticles);
        setTimeout(() => setSequenceStage('complete'), 1500);
      }, 500);
    }, 4000);
  };

  const resetExperience = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setSequenceStage('idle');
      sequenceInitiated.current = false;
    }, 800);
  };

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCard(id === activeCard ? null : id);
  };

  const hideMainUI = sequenceStage === 'finalShow' || sequenceStage === 'complete';

  const charComponents = [
    { Comp: QCharRD, anim: 'rd' },
    { Comp: QCharBall, anim: 'ball' },
    { Comp: QCharChess, anim: 'chess' },
    { Comp: QCharStarve, anim: 'starve' },
    { Comp: QCharDragon, anim: 'dragon' },
    { Comp: QCharRun, anim: 'run' }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-[#D4B96A]/20" onClick={() => setActiveCard(null)}>
      
      {/* Opening & Final Firework Layer */}
      {(sequenceStage === 'finalShow' || sequenceStage === 'idle') && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
          <div className={`${sequenceStage === 'idle' ? 'opacity-20' : 'opacity-100'} transition-opacity duration-1000`}>
             <div className="firework-gilt">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="strand" style={{ 
                    '--rotation': `${i * 22.5}deg`,
                    animation: sequenceStage === 'idle' ? `bloomGilt 3s ${i * 0.1}s infinite` : 'bloomGilt 1.2s forwards'
                  } as React.CSSProperties}></div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <div className={`transition-opacity duration-1000 ${hideMainUI ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Section 1: Opening */}
        <section className="h-screen w-full relative flex flex-col items-center justify-center chess-grid overflow-hidden">
          
          {[...Array(12)].map((_, i) => (
            <div key={i} className="ribbon" style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animation: `drift ${5 + Math.random() * 10}s ${Math.random() * 5}s linear infinite`
            }}></div>
          ))}

          <div className="absolute top-10 left-10 opacity-20 animate-float-slow">
            <GiltIcon type="cake" accentColor={THEME.gilt} size={80} />
          </div>
          <div className="absolute bottom-20 right-10 opacity-15 animate-float-delayed">
             <div className="flex gap-4">
                <div className="w-0.5 h-20 bg-[#D4B96A] relative">
                   <div className="absolute -top-4 -left-2 w-5 h-8 border border-[#D4B96A] rounded-full"></div>
                </div>
                <div className="w-0.5 h-16 bg-[#D4B96A] relative mt-4">
                   <div className="absolute -top-4 -left-2 w-5 h-8 border border-[#D4B96A] rounded-full"></div>
                </div>
             </div>
          </div>

          <div className="z-10 text-center px-4">
            <div className="mb-6 flex justify-center opacity-0 animate-scale-in" style={{ animation: 'scaleIn 1.2s forwards' }}>
              <GiltIcon type="cake" accentColor={THEME.gilt} size={100} />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif-elegant text-[#D4B96A] mb-8 animate-fade-in opacity-0" style={{ animation: 'fadeIn 1.5s 0.3s forwards' }}>
              亲爱的焕哥哥，祝你生日快乐
            </h1>
            <p className="text-[#3A3A3A] text-sm md:text-base max-w-2xl mx-auto leading-relaxed tracking-widest opacity-0" style={{ animation: 'fadeIn 1.5s 0.8s forwards' }}>
              愿棋逢对手，球遇良友，跑赴热爱，饥有粮草，龙藏锋芒，职途坦荡，万事无忧
            </p>
          </div>
          <div className="absolute bottom-12 flex flex-col items-center text-[#3A3A3A] opacity-60">
            <span className="text-xs mb-2 tracking-tighter">快往下看好不好？</span>
            <div className="w-0.5 h-6 bg-[#D4B96A] animate-bounce"></div>
          </div>
        </section>

        {/* Section 2: Cards Area */}
        <section className="min-h-screen py-24 px-4 flex flex-col items-center justify-center">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 w-full max-w-7xl transition-all duration-700 ${activeCard ? 'scale-95 blur-sm opacity-30' : 'opacity-100'}`}>
            {CARDS.map((card) => (
              <div
                key={card.id}
                onClick={(e) => handleCardClick(card.id, e)}
                className="relative group bg-[#F5F5F5] border-2 border-[#D4B96A] rounded-lg p-6 flex flex-col items-center text-center cursor-pointer transition-silky hover:shadow-lg hover:-translate-y-2"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" style={{ background: `radial-gradient(circle, ${card.accentColor} 0%, transparent 70%)` }} />
                <GiltIcon type={card.iconType} accentColor={card.accentColor} className="mb-4 transform group-hover:scale-110 transition-transform" />
                <div className="h-1 w-8 bg-[#D4B96A]/20 mb-4 rounded-full group-hover:w-12 transition-all" style={{ backgroundColor: `${card.accentColor}99` }}></div>
                <p className="text-[10px] text-[#3A3A3A] opacity-40 uppercase tracking-widest">Explore</p>
              </div>
            ))}
          </div>

          {activeCard && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#F5F5F5]/40 backdrop-blur-md" onClick={() => setActiveCard(null)}>
              {CARDS.filter(c => c.id === activeCard).map(card => (
                <div key={card.id} className="bg-[#F5F5F5] border-2 border-[#D4B96A] rounded-lg p-10 max-w-lg w-full shadow-2xl animate-scale-up" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center mb-8">
                    <GiltIcon type={card.iconType} accentColor={card.accentColor} size={120} />
                  </div>
                  <h3 className="text-[#D4B96A] text-xl font-medium mb-4 text-center tracking-[0.3em]">{card.title}</h3>
                  <p className="text-[#3A3A3A] text-center leading-loose text-lg font-light tracking-wide px-4">{card.copy}</p>
                  <button onClick={() => setActiveCard(null)} className="mt-10 mx-auto block text-[10px] text-[#D4B96A] uppercase tracking-[0.2em] border-b border-[#D4B96A]/30 pb-1 hover:border-[#D4B96A] transition-all">Close View</button>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Section 3: Messages & Character Easter Egg Area */}
      <section ref={sectionRef} className="min-h-screen py-24 flex flex-col items-center justify-center relative bg-gradient-to-b from-transparent to-[#e8e8e8]">
        <div className={`max-w-3xl px-8 text-center relative z-10 transition-opacity duration-1000 ${hideMainUI ? 'opacity-0' : 'opacity-100'}`}>
          <GiltIcon type="chess" accentColor={THEME.accents.chess} size={32} className="absolute -top-16 -left-8 opacity-40 rotate-12" />
          <p className="text-[#3A3A3A] text-lg md:text-xl leading-[2] font-light tracking-widest whitespace-pre-wrap">
            {"30 岁，是更从容的开始，亦是人生的新起点。\n愿你在最好的年纪绽放属于自己的光芒！\n 俯仰流年三十春，昂然前路千重锦；胸藏丘壑青云远，步履铿锵日月新"}
          </p>
        </div>

        {/* Character Row */}
        <div className={`mt-16 flex items-center justify-center gap-[15px] px-4 z-20 transition-opacity duration-1000 ${sequenceStage === 'idle' ? 'opacity-0' : 'opacity-100'}`}>
          {charComponents.map((item, idx) => {
            const Character = item.Comp;
            return (
              <div 
                key={idx}
                className={`char-frame relative p-[2px] rounded-sm opacity-0 border-[2px] border-[#D4B96A] w-[40px] h-[40px] flex items-center justify-center transition-all ${sequenceStage === 'finalShow' ? 'scale-0 opacity-0 blur-sm' : ''}`}
                style={{ 
                  animation: sequenceStage === 'idle' ? 'none' : `charEntry_${item.anim} 1s ${idx * 0.5}s forwards`,
                  background: '#F5F5F5' 
                }}
              >
                <Character size={36} />
              </div>
            );
          })}
        </div>

        {/* Final Reveal Overlay */}
        {(sequenceStage === 'finalShow' || sequenceStage === 'complete') && (
          <div className="fixed inset-0 pointer-events-none z-[80] flex items-center justify-center bg-[#F5F5F5]/90 backdrop-blur-sm animate-fade-in-blur overflow-hidden">
            
            {/* Pulsing Gilt Heart Background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-0 animate-heart-reveal">
               <svg viewBox="0 0 100 100" className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] text-[#D4B96A] opacity-10 animate-heart-beat">
                  <path 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="0.5" 
                    d="M50 88 C50 88 10 70 10 40 C10 20 30 15 50 35 C70 15 90 20 90 40 C90 70 50 88 50 88 Z" 
                  />
               </svg>
            </div>

            {sequenceStage === 'finalShow' && particles.map((p) => (
              <div key={p.id} className="absolute" style={{ left: '50%', top: '75%', animation: 'particleScatter 1.5s forwards' }}>
                <div style={{ transform: `translate(${p.vx * 15}px, ${p.vy * 15}px)` }}>
                  <GiltIcon type={p.iconType} accentColor={THEME.gilt} size={40} className="opacity-40" />
                </div>
              </div>
            ))}
            
            <div className={`text-center transition-all duration-1000 px-8 max-w-4xl flex flex-col items-center ${sequenceStage === 'complete' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <h2 
                onClick={resetExperience}
                className="text-3xl md:text-5xl font-serif-elegant text-[#D4B96A] tracking-[0.4em] mb-8 leading-relaxed cursor-pointer pointer-events-auto hover:opacity-80 transition-opacity z-10"
              >
                愿我们心脏同频，始终共鸣
              </h2>
              <div className="h-[2px] w-48 bg-[#D4B96A] mx-auto opacity-30 mb-12"></div>
              
              <div 
                onClick={resetExperience}
                className="pointer-events-auto group cursor-pointer transition-transform hover:scale-125 duration-500 animate-pulse-slow"
              >
                <GiltIcon type="cake" accentColor={THEME.gilt} size={80} />
              </div>
            </div>
          </div>
        )}

        <footer className={`absolute bottom-6 left-0 w-full text-center transition-opacity duration-1000 ${hideMainUI ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-[10px] text-[#3A3A3A] opacity-30 font-light tracking-[0.3em] uppercase">Happy Birthday My Darling</p>
        </footer>
      </section>

      <style>{`
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        @keyframes floatSlow { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -20px); } }
        @keyframes floatDelayed { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-30px, -10px); } }
        .animate-float-slow { animation: floatSlow 10s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 12s ease-in-out infinite; }

        @keyframes charEntry_rd { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes charEntry_ball { from { opacity: 0; transform: rotate(0deg); } to { opacity: 1; transform: rotate(30deg); } }
        @keyframes charEntry_chess { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes charEntry_starve { 
          0% { opacity: 0; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(5px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes charEntry_dragon { from { opacity: 0; transform: translate(15px, 15px); } to { opacity: 1; transform: translate(0, 0); } }
        @keyframes charEntry_run { from { opacity: 0; } to { opacity: 1; } }

        .firework-gilt { position: relative; width: 2px; height: 2px; }
        .firework-gilt .strand { position: absolute; width: 2px; height: 0; background: linear-gradient(to bottom, #D4B96A, transparent); transform-origin: top center; transform: rotate(var(--rotation)); }
        @keyframes bloomGilt { 0% { height: 0; opacity: 1; } 100% { height: 150px; opacity: 0; } }

        @keyframes particleScatter {
          0% { opacity: 0; transform: scale(0.5); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: scale(2) translate(var(--tw-translate-x), var(--tw-translate-y)); }
        }
        @keyframes fadeInBlur { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(8px); } }
        .animate-fade-in-blur { animation: fadeInBlur 1s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-up { animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulseSlow 3s ease-in-out infinite; }

        @keyframes heartReveal {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-heart-reveal { animation: heartReveal 2s ease-out 1s forwards; }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        .animate-heart-beat { animation: heartBeat 4s ease-in-out infinite; }

        .chess-grid {
            background-image: 
                linear-gradient(to right, rgba(58, 58, 58, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(58, 58, 58, 0.03) 1px, transparent 1px);
            background-size: 30px 30px;
        }

        .ribbon {
            position: absolute;
            width: 30px;
            height: 8px;
            border: 1px solid #D4B96A;
            border-radius: 20px;
            opacity: 0;
            pointer-events: none;
        }

        @keyframes drift {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            20% { opacity: 0.3; }
            100% { transform: translate(50px, 100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default App;
