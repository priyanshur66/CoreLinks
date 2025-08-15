"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Zap, Package, Share2, ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Receive Tips",
      description: "Generate shareable links for receiving cryptocurrency tips from your audience.",
      color: "blue",
      delay: "0ms"
    },
    {
      icon: Package,
      title: "Sell Items", 
      description: "Create payment links for selling digital or physical items with secure transactions.",
      color: "green",
      delay: "200ms"
    },
    {
      icon: Share2,
      title: "Share Anywhere",
      description: "Share your blockchain action links on any platform - social media, websites, or messaging apps.",
      color: "purple",  
      delay: "400ms"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Create Link",
      description: "Generate your blockchain action link in seconds with our simple form.",
      color: "blue"
    },
    {
      number: 2, 
      title: "Share",
      description: "Share the link with your audience across any platform or channel.",
      color: "green"
    },
    {
      number: 3,
      title: "Receive", 
      description: "Get paid directly to your wallet with secure blockchain transactions.",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '10%',
            left: '10%'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-600/15 to-red-500/15 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            bottom: '10%',
            right: '10%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-amber-500/10 to-orange-400/10 rounded-full blur-2xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
            top: '50%',
            left: '50%'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         
          
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent mb-6 tracking-tighter drop-shadow-[0_0_30px_rgba(251,146,60,0.9)] animate-pulse" style={{ fontFamily: 'var(--font-pixel)' }}>
            CoreLink
          </h1>
          
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/5 backdrop-blur-3xl rounded-3xl border border-orange-400/10 shadow-2xl" />
            <p className="relative text-xl md:text-2xl text-orange-100 mb-10 max-w-4xl mx-auto leading-relaxed px-8 py-6">
              Transform blockchain actions into shareable links. 
              Receive tips, sell items, and accept payments with ease.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/create-link"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500/80 to-amber-500/80 backdrop-blur-xl border border-orange-400/30 hover:border-orange-300/50 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25 hover:bg-gradient-to-r hover:from-orange-500/90 hover:to-amber-500/90"
            >
              Create Your First Link
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <button className="group inline-flex items-center px-6 py-4 bg-black/30 backdrop-blur-xl border border-orange-400/20 text-orange-200 hover:text-orange-100 hover:border-orange-300/30 transition-all duration-200 rounded-2xl">
              Learn More
              <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-orange-400/20 hover:border-orange-300/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-orange-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ 
                transitionDelay: feature.delay,
                animation: isVisible ? `fadeInUp 0.6s ease-out ${feature.delay} both` : 'none'
              }}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${
                feature.color === 'blue' ? 'from-orange-500/30 to-amber-500/30' :
                feature.color === 'green' ? 'from-amber-500/30 to-yellow-500/30' :
                'from-orange-600/30 to-red-500/30'
              } backdrop-blur-xl border border-orange-400/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                <feature.icon className={`w-7 h-7 ${
                  feature.color === 'blue' ? 'text-orange-300' :
                  feature.color === 'green' ? 'text-amber-300' :
                  'text-orange-400'
                }`} />
              </div>
              
              <h3 className="text-xl font-semibold text-orange-100 mb-4 group-hover:text-orange-200 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-orange-200/70 leading-relaxed group-hover:text-orange-200/90 transition-colors duration-300">
                {feature.description}
              </p>
              
              <div className={`mt-6 h-1 bg-gradient-to-r ${
                feature.color === 'blue' ? 'from-orange-500 to-amber-500' :
                feature.color === 'green' ? 'from-amber-500 to-yellow-500' :
                'from-orange-600 to-red-500'
              } rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-lg`} />
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className={`bg-black/20 backdrop-blur-2xl rounded-3xl p-12 border border-orange-400/20 mb-20 shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-orange-100 mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto shadow-lg" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${
                    step.color === 'blue' ? 'from-orange-500/80 to-amber-500/80' :
                    step.color === 'green' ? 'from-amber-500/80 to-yellow-500/80' :
                    'from-orange-600/80 to-red-500/80'
                  } backdrop-blur-xl border border-orange-400/30 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent transform translate-x-10" />
                  )}
                </div>
                
                <h3 className="text-2xl font-semibold text-orange-100 mb-4 group-hover:text-orange-200 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-orange-200/70 leading-relaxed group-hover:text-orange-200/90 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center bg-black/25 backdrop-blur-2xl rounded-3xl p-12 border border-orange-400/25 shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1000ms' }}>
          <h3 className="text-3xl font-bold text-orange-100 mb-6">
            Ready to start accepting payments?
          </h3>
          
          <p className="text-orange-200/80 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of creators and businesses already using CoreApp to monetize their content and services.
          </p>
          
          <Link
            href="/create-link"
            className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-orange-500/80 via-amber-500/80 to-orange-600/80 backdrop-blur-xl border border-orange-400/40 hover:border-orange-300/60 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">Get Started Now</span>
            <ArrowRight className="relative ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}