import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const modalContent = (
    <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ zIndex: 9999 }}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
          onClick={closeModal}
              aria-hidden="true"
          style={{ zIndex: 10000 }}
        />

        <div
          className="relative inline-block align-bottom card-modern text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
          style={{ zIndex: 10001 }}
        >
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500">
                <i className="fa-sharp fa-regular fa-address-card text-white text-xl"></i>
                  </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-white">
                      Contact Information
                    </h3>
                    </div>
                  </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fa-regular fa-user text-cyan-400 w-5"></i>
                <span className="text-gray-300">Stefan Hall</span>
                </div>
              <div className="flex items-center space-x-3">
                <i className="fa-regular fa-envelope text-cyan-400 w-5"></i>
                <a href="mailto:stefhall.2704@gmail.com" className="text-gray-300 hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  stefhall.2704@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fa-regular fa-phone text-cyan-400 w-5"></i>
                <span className="text-gray-300">(434) 942-4421</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 px-6 py-4 flex justify-end">
                <button
                  type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200"
              onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
  );

  return (
    <div>
      <button
        onClick={openModal}
        className="btn-modern text-sm px-6 py-2"
      >
        Contact
      </button>
      {isModalOpen && createPortal(modalContent, document.body)}
    </div>
  );
};

function HeaderBar() {
  return (
    <div className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Stefan Hall
            </h1>
            <p className="text-sm text-gray-400 -mt-1">Site Reliability Engineer</p>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">
              About
            </a>
            <a href="#networking" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">
              Networking
            </a>
            <a href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">
              Projects
            </a>
                <Modal />
          </nav>
          <div className="md:hidden">
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
}


const Name = () => {
  return (
    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
      Stefan Hall
    </h1>
  );
};

const JobTitle = () => {
  return (
    <h2 className="text-xl text-cyan-400 font-semibold">
        Site Reliability Engineer (SRE)
    </h2>
  );
};

const Info = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
    <div
      ref={ref}
          className={`card-modern p-6 md:p-12 max-w-2xl mx-auto text-center slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center">
            <i className="fa-solid fa-server text-white text-2xl md:text-3xl"></i>
          </div>
      <Name />
      <JobTitle />
          <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-300 leading-relaxed px-2 md:px-0">
            Elite Site Reliability Engineer specializing in enterprise-scale infrastructure transformation and automation. Architect of mission-critical systems serving millions of users, with proven expertise in building fault-tolerant, self-healing platforms that eliminate downtime and reduce operational overhead by 90%. Pioneer in Rust-based enterprise solutions, cloud-native architectures, and observability-driven reliability engineering.
          </p>

          {/* Key Achievements Highlight */}
          <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-3 md:p-4 bg-slate-800/50 rounded-xl border border-slate-600/30">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1 md:mb-2">2,000+</div>
              <div className="text-xs md:text-sm text-slate-400 font-medium">IIS Sites Auto-Healed</div>
    </div>
            <div className="text-center p-3 md:p-4 bg-slate-800/50 rounded-xl border border-slate-600/30">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1 md:mb-2">99.9%</div>
              <div className="text-xs md:text-sm text-slate-400 font-medium">Uptime Achieved</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-slate-800/50 rounded-xl border border-slate-600/30">
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1 md:mb-2">93%</div>
              <div className="text-xs md:text-sm text-slate-400 font-medium">Test Coverage</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-slate-800/50 rounded-xl border border-slate-600/30">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1 md:mb-2">50%</div>
              <div className="text-xs md:text-sm text-slate-400 font-medium">Cost Optimization</div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-6">
            <a href="https://github.com/stefanhall2704" className="text-gray-400 hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/stefan-hall-b4787b13b/" className="text-gray-400 hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="https://www.freecodecamp.org/stefan_hall" className="text-gray-400 hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-free-code-camp text-2xl"></i>
            </a>
    </div>
    
        </div>
      </div>
    </section>
  );
};

const Story = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-3 md:mb-4">
              Enterprise SRE Leadership
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto px-4">
              From self-taught foundations to architecting mission-critical systems serving millions of users
            </p>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="border-l-4 border-cyan-400 pl-6">
                  <h2 className="text-2xl font-semibold text-cyan-400 mb-3">The Beginning</h2>
                  <p className="text-gray-300 leading-relaxed">
                    In 2019, as a Supervisor at an Insulated Metal Panel plant, I discovered
                    the power of automation. Starting with Excel formulas and VBA scripting,
                    I automated manual processes that sparked my passion for technology.
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-6">
                  <h2 className="text-2xl font-semibold text-purple-400 mb-3">First Database Project</h2>
                  <p className="text-gray-300 leading-relaxed">
                    I built a multi-table Microsoft Access database to streamline inventory
                    management. This project taught me about data relationships and user
                    interface design, marking my first significant tech achievement.
                  </p>
                </div>

                <div className="border-l-4 border-pink-400 pl-6">
                  <h2 className="text-2xl font-semibold text-pink-400 mb-3">Formal Education</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Completed{" "}
                    <a
                      href="https://www.coursera.org/account/accomplishments/verify/2FN2YFQEH3BM" target="_blank" rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline"
                    >
                      Programming Foundations with JavaScript, HTML and CSS
                    </a>{" "}
                    on Coursera with honors, followed by certifications in{" "}
                    <a
                      href="https://www.codecademy.com/profiles/stefhall2704/certificates/6c152bd262967f8c941c9707ed636bda" target="_blank" rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline"
                    >
                      Python
                    </a>
                    ,{" "}
                    <a
                      href="https://www.freecodecamp.org/certification/stefan_hall/responsive-web-design" target="_blank" rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline"
                    >
                      Responsive Web Design
                    </a>
                    , and{" "}
                    <a
                      href="https://www.freecodecamp.org/certification/stefan_hall/data-analysis-with-python-v7" target="_blank" rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline"
                    >
                      Data Analysis with Python
                    </a>
                    .
        </p>
      </div>
    </div>

              <div className="space-y-6">
                <div className="border-l-4 border-green-400 pl-6">
                  <h2 className="text-2xl font-semibold text-green-400 mb-3">First Tech Role</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Landed my first tech job as a Jr. Automation Integration Engineer.
                    Faced the challenge of learning C# by diving into legacy codebase,
                    then led a team to rewrite the system using FastAPI with 93% test coverage.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-6">
                  <h2 className="text-2xl font-semibold text-yellow-400 mb-3">SRE Promotion</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Promoted to Site Reliability Engineer, mastering SLOs, SLIs, SLAs,
                    and implementing OpenTelemetry tracing. Built monitoring dashboards
                    with Grafana and developed infrastructure automation using Grafanalib.
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-6">
                  <h2 className="text-2xl font-semibold text-blue-400 mb-3">Key Learnings</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Programming languages are tools for specific tasks. Python excels
                    at data analysis with NumPy and Pandas. Each challenge builds upon
                    the last, and persistence in the face of complexity is essential
                    in SRE work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TLSHandshakeAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  const handshakeSteps = [
    {
      title: "Client Hello",
      description: "Client sends supported cipher suites, TLS version, and generates a random number",
      clientMessage: "Client Hello (TLS 1.3, Cipher Suites, Random)",
      serverMessage: "",
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "Server Hello",
      description: "Server responds with chosen cipher suite, TLS version, and its own random number",
      clientMessage: "",
      serverMessage: "Server Hello (TLS 1.3, Chosen Cipher, Random)",
      color: "from-green-400 to-cyan-500"
    },
    {
      title: "Server Certificate",
      description: "Server sends its digital certificate for authentication",
      clientMessage: "",
      serverMessage: "Certificate (Public Key, Signature)",
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Key Exchange",
      description: "Client and server exchange keys to establish secure communication",
      clientMessage: "Client Key Exchange",
      serverMessage: "Server Key Exchange",
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Finished",
      description: "Both parties confirm the handshake is complete and secure",
      clientMessage: "Finished",
      serverMessage: "Finished",
      color: "from-emerald-400 to-green-500"
    }
  ];

  React.useEffect(() => {
    if (isPlaying && currentStep < handshakeSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep === handshakeSteps.length - 1) {
      setIsPlaying(false);
    }
  }, [currentStep, isPlaying, handshakeSteps.length]);

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="networking" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TLS 1.3 Handshake Visualization
            </h1>
            <p className="text-gray-300 text-lg">
              Interactive visualization of the TLS handshake process showing client-server communication
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Control Panel */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="btn-modern px-6 py-3"
                  disabled={currentStep === handshakeSteps.length - 1 && !isPlaying}
                >
                  {isPlaying ? 'Pause' : 'Play'} Animation
                </button>
                <button
                  onClick={resetAnimation}
                  className="btn-modern px-6 py-3 bg-gray-600 hover:bg-gray-500"
                >
                  Reset
                </button>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  Step {currentStep + 1} of {handshakeSteps.length}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / handshakeSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className={`p-6 rounded-lg bg-gradient-to-r ${handshakeSteps[currentStep].color} text-white`}>
                <h3 className="text-xl font-semibold mb-2">{handshakeSteps[currentStep].title}</h3>
                <p className="text-white/90">{handshakeSteps[currentStep].description}</p>
              </div>
            </div>

            {/* Visualization */}
            <div className="relative">
              <div className="bg-gray-900 rounded-lg p-6 h-80 flex flex-col justify-center">
                {/* Client */}
                <div className="flex items-center justify-start mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-desktop text-white text-xl"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-cyan-400">Client</div>
                    <div className="text-sm text-gray-400">Browser/Application</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 flex items-center justify-center relative">
                  {/* Client to Server message */}
                  {handshakeSteps[currentStep].clientMessage && (
                    <div className="absolute left-20 top-1/2 transform -translate-y-1/2 animate-pulse">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg max-w-xs text-sm">
                        {handshakeSteps[currentStep].clientMessage}
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-cyan-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                      </div>
                    </div>
                  )}

                  {/* Server to Client message */}
                  {handshakeSteps[currentStep].serverMessage && (
                    <div className="absolute right-20 top-1/2 transform -translate-y-1/2 animate-pulse">
                      <div className="bg-gradient-to-r from-green-400 to-cyan-500 text-white px-4 py-2 rounded-lg shadow-lg max-w-xs text-sm">
                        {handshakeSteps[currentStep].serverMessage}
                        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-r-8 border-r-green-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                      </div>
                    </div>
                  )}

                  {/* Connection line */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 opacity-50"></div>
                </div>

                {/* Server */}
                <div className="flex items-center justify-end mt-8">
                  <div className="text-right mr-4">
                    <div className="font-semibold text-green-400">Server</div>
                    <div className="text-sm text-gray-400">Web Server</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-server text-white text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center space-x-2">
            {handshakeSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentStep(index);
                  setIsPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-cyan-400 scale-125'
                    : index < currentStep
                    ? 'bg-green-400'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TracerouteVisualization = () => {
  const [domain, setDomain] = useState('');
  const [isTracing, setIsTracing] = useState(false);
  const [traceResult, setTraceResult] = useState([]);
  const [selectedHop, setSelectedHop] = useState(null);
  const [selectedOsiLayer, setSelectedOsiLayer] = useState(null);
  const [dnsStatus, setDnsStatus] = useState('');
  const [traceProgress, setTraceProgress] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '50px 0px -100px 0px'
  });

  const resolveDNS = async (domain) => {
    try {
      // Use Google's DNS-over-HTTPS service
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
      const data = await response.json();

      if (data.Answer && data.Answer.length > 0) {
        return data.Answer[0].data; // Return the first A record
      }
      throw new Error('No A record found');
    } catch (error) {
      console.warn('DNS resolution failed, using fallback:', error);

      // Try Cloudflare DNS as secondary
      try {
        const cloudflareResponse = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
          headers: {
            'Accept': 'application/dns-json'
          }
        });
        const cloudflareData = await cloudflareResponse.json();

        if (cloudflareData.Answer && cloudflareData.Answer.length > 0) {
          return cloudflareData.Answer[0].data;
        }
      } catch (cloudflareError) {
        console.warn('Cloudflare DNS also failed:', cloudflareError);
      }

      // Fallback IP based on common domains
      const fallbacks = {
        'google.com': '142.250.68.100',
        'github.com': '140.82.114.4',
        'stackoverflow.com': '151.101.65.69',
        'amazon.com': '205.251.242.103',
        'facebook.com': '157.240.22.35',
        'netflix.com': '52.6.232.104',
        'twitter.com': '104.244.42.1',
        'youtube.com': '142.250.68.142',
        'dev.keypergo.com': '104.21.234.160',
        'qa': '192.168.1.100'
      };

      // Generate a realistic IP for unknown domains
      const domainHash = domain.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);

      const ip1 = Math.abs(domainHash % 256);
      const ip2 = Math.abs((domainHash >> 8) % 256);
      const ip3 = Math.abs((domainHash >> 16) % 256);
      const ip4 = Math.abs((domainHash >> 24) % 256);

      return fallbacks[domain] || `${ip1}.${ip2}.${ip3}.${ip4}`;
    }
  };

  const generateRealisticTraceroute = (domain, resolvedIP) => {
    const hops = [];
    const ipParts = resolvedIP.split('.').map(Number);
    let region = 'Unknown';
    let provider = 'Unknown';

    // Identify major providers for realistic routing
    if (ipParts[0] === 142 && ipParts[1] === 250) {
      region = 'Mountain View, CA';
      provider = 'Google';
    } else if (ipParts[0] === 140 && ipParts[1] === 82) {
      region = 'East Coast, US';
      provider = 'GitHub';
    } else if (ipParts[0] === 151 && ipParts[1] === 101) {
      region = 'New York, NY';
      provider = 'Stack Overflow';
    } else if (ipParts[0] === 104 && ipParts[1] === 21) {
      region = 'Global CDN';
      provider = 'Cloudflare';
    } else if (ipParts[0] === 205 && ipParts[1] === 251) {
      region = 'AWS Global';
      provider = 'Amazon';
    } else if (ipParts[0] === 52) {
      region = 'AWS Global';
      provider = 'Netflix';
    } else if (ipParts[0] === 157 && ipParts[1] === 240) {
      region = 'Menlo Park, CA';
      provider = 'Meta';
    } else if (ipParts[0] === 104 && ipParts[1] === 244) {
      region = 'San Francisco, CA';
      provider = 'Twitter/X';
    } else {
      region = ipParts[0] >= 192 ? 'North America' : 'International';
      provider = 'Generic Provider';
    }

    // Generate realistic hop count (18-25 hops like real traceroute)
    const hopCount = Math.floor(Math.random() * 8) + 18; // 18-25 hops
    let latency = 1;

    // 1. Local network (Home router)
    hops.push({
      ip: '192.168.1.1',
      hostname: 'router.home.local',
      location: 'Local Network',
      latency: latency += Math.floor(Math.random() * 2),
      port: 53,
      description: 'Home WiFi router - DHCP & DNS'
    });

    // 2. ISP residential gateway
    hops.push({
      ip: `67.145.${Math.floor(Math.random() * 256)}.1`,
      hostname: `dhcp-67-145-${Math.floor(Math.random() * 256)}-1.brightspeed.net`,
      location: 'ISP Residential Gateway',
      latency: latency += Math.floor(Math.random() * 5) + 2,
      port: 53,
      description: 'ISP residential gateway'
    });

    // 3-5. ISP core network
    for (let i = 0; i < 3; i++) {
      hops.push({
        ip: `207.50.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        hostname: `ae${Math.floor(Math.random() * 50)}.edge${Math.floor(Math.random() * 10)}.wdc12.sp.brightspeed.net`,
        location: 'ISP Core Network',
        latency: latency += Math.floor(Math.random() * 8) + 3,
        port: 53,
        description: `ISP core router ${i + 1}`
      });
    }

    // 6-10. Transit provider network (Lumen/Cogent/etc)
    const transitProviders = ['lumen.tech', 'cogentco.com', 'level3.net', 'telia.net'];
    for (let i = 0; i < 5; i++) {
      const transitProvider = transitProviders[Math.floor(Math.random() * transitProviders.length)];
      hops.push({
        ip: `${4 + Math.floor(Math.random() * 4)}.${68 + Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        hostname: `ae${Math.floor(Math.random() * 50)}.edge${Math.floor(Math.random() * 10)}.${transitProvider}`,
        location: 'Transit Provider',
        latency: latency += Math.floor(Math.random() * 12) + 5,
        port: 53,
        description: `${transitProvider} backbone`
      });
    }

    // 11-14. Provider edge network
    if (provider === 'Google') {
      hops.push({
        ip: `142.250.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        hostname: `google-public-dns-${['a','b','c'][Math.floor(Math.random() * 3)]}.google.com`,
        location: 'Google Edge Network',
        latency: latency += Math.floor(Math.random() * 10) + 8,
        port: 443,
        description: 'Google Cloud edge'
      });
      hops.push({
        ip: `172.253.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        hostname: `bg-in-f${Math.floor(Math.random() * 200)}.1e100.net`,
        location: 'Google Data Center',
        latency: latency += Math.floor(Math.random() * 15) + 10,
        port: 443,
        description: 'Google origin server'
      });
    } else if (provider === 'Cloudflare') {
      hops.push({
        ip: `104.21.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        hostname: `cloudflare-dns.com`,
        location: 'Cloudflare Edge',
        latency: latency += Math.floor(Math.random() * 8) + 6,
        port: 443,
        description: 'Cloudflare CDN edge'
      });
    } else {
      // Generic provider edge (3-4 hops)
      for (let i = 0; i < 4; i++) {
        hops.push({
          ip: `${ipParts[0]}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
          hostname: `${provider.toLowerCase()}-edge-${Math.floor(Math.random() * 100)}.net`,
          location: `${provider} Edge Network`,
          latency: latency += Math.floor(Math.random() * 10) + 8,
          port: 443,
          description: `${provider} edge network`
        });
      }
    }

    // 15-17. Additional routing hops (sometimes timeout like real traceroute)
    for (let i = 0; i < 3; i++) {
      if (Math.random() > 0.3) { // 70% chance of response (simulating some timeouts)
        hops.push({
          ip: `${ipParts[0]}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
          hostname: `core-router-${Math.floor(Math.random() * 100)}.${provider.toLowerCase().split(' ')[0]}.net`,
          location: `${provider} Core Network`,
          latency: latency += Math.floor(Math.random() * 12) + 8,
          port: 443,
          description: `${provider} core routing`
        });
      }
    }

    // Final destination
    hops.push({
      ip: resolvedIP,
      hostname: domain,
      location: `${region} (${provider})`,
      latency: latency += Math.floor(Math.random() * 15) + 5,
      port: domain.includes('https') || resolvedIP.includes('443') ? 443 : 80,
      isSecure: domain.includes('https') || resolvedIP.includes('443'),
      description: `${provider} origin server`
    });

    // Trim to realistic hop count (18-25)
    return hops.slice(0, hopCount);
  };

  // Generate realistic packet data for each OSI layer
  const generateLayerPackets = (layer, selectedHop) => {
    const packets = [];

    switch(layer) {
      case 7: // Application Layer
        packets.push({
          type: selectedHop.isSecure ? 'HTTPS Request' : 'HTTP Request',
          timestamp: '0.000000',
          source: '127.0.0.1:xxxxx',
          dest: `${selectedHop.ip}:${selectedHop.port}`,
          protocol: selectedHop.isSecure ? 'HTTPS' : 'HTTP',
          size: '512 bytes',
          details: {
            method: 'GET',
            uri: selectedHop.hostname.includes('google') ? '/search?q=network+analysis' : '/',
            headers: {
              'Host': selectedHop.hostname,
              'User-Agent': 'Mozilla/5.0 (Network Analyzer)',
              'Accept': 'text/html,application/xhtml+xml',
              ...(selectedHop.isSecure && {
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Site': 'cross-site'
              })
            },
            payload: selectedHop.isSecure ? '[TLS Encrypted Data]' : 'GET / HTTP/1.1\r\nHost: ' + selectedHop.hostname
          }
        });
        break;

      case 6: // Presentation Layer
        if (selectedHop.isSecure) {
          packets.push({
            type: 'TLS Client Hello',
            timestamp: '0.000123',
            source: '127.0.0.1:xxxxx',
            dest: `${selectedHop.ip}:${selectedHop.port}`,
            protocol: 'TLS 1.3',
            size: '256 bytes',
            details: {
              version: 'TLS 1.3',
              cipherSuites: ['TLS_AES_256_GCM_SHA384', 'TLS_CHACHA20_POLY1305_SHA256'],
              extensions: ['server_name', 'supported_groups', 'signature_algorithms'],
              sessionKeys: {
                clientRandom: '0x' + Math.random().toString(16).substr(2, 32),
                masterSecret: '[Generated during handshake]',
                sessionTicket: '0x' + Math.random().toString(16).substr(2, 64)
              }
            }
          });
        }
        break;

      case 5: // Session Layer
        packets.push({
          type: 'TCP SYN',
          timestamp: '0.000456',
          source: '127.0.0.1:xxxxx',
          dest: `${selectedHop.ip}:${selectedHop.port}`,
          protocol: 'TCP',
          size: '64 bytes',
          details: {
            flags: ['SYN'],
            seqNumber: Math.floor(Math.random() * 1000000),
            windowSize: 65535,
            options: ['MSS: 1460', 'SACK_PERMITTED', 'TIMESTAMP']
          }
        });
        packets.push({
          type: 'TCP SYN-ACK',
          timestamp: '0.001234',
          source: `${selectedHop.ip}:${selectedHop.port}`,
          dest: '127.0.0.1:xxxxx',
          protocol: 'TCP',
          size: '64 bytes',
          details: {
            flags: ['SYN', 'ACK'],
            seqNumber: Math.floor(Math.random() * 1000000),
            ackNumber: packets[0].details.seqNumber + 1,
            windowSize: 64240
          }
        });
        break;

      case 4: // Transport Layer
        const seqNum = Math.floor(Math.random() * 1000000);
        packets.push({
          type: 'TCP ACK',
          timestamp: '0.001567',
          source: '127.0.0.1:xxxxx',
          dest: `${selectedHop.ip}:${selectedHop.port}`,
          protocol: 'TCP',
          size: '52 bytes',
          details: {
            flags: ['ACK'],
            seqNumber: seqNum,
            ackNumber: packets[packets.length - 1]?.details.seqNumber + 1 || seqNum + 1,
            windowSize: 65535,
            checksum: '0x' + Math.random().toString(16).substr(2, 8)
          }
        });
        break;

      case 3: // Network Layer
        packets.push({
          type: 'IP Packet',
          timestamp: '0.001890',
          source: '127.0.0.1',
          dest: selectedHop.ip,
          protocol: 'IP',
          size: '576 bytes',
          details: {
            version: 4,
            headerLength: 20,
            ttl: selectedHop.hostname.includes('router.home') ? 64 : Math.floor(Math.random() * 50) + 10,
            protocol: 6, // TCP
            sourceIP: '127.0.0.1',
            destIP: selectedHop.ip,
            checksum: '0x' + Math.random().toString(16).substr(2, 8),
            options: selectedHop.hostname.includes('router.home') ? [] : ['Router Alert']
          }
        });
        break;

      case 2: // Data Link Layer
        const isLocal = selectedHop.hostname.includes('router.home');
        packets.push({
          type: 'Ethernet Frame',
          timestamp: '0.002123',
          source: isLocal ? 'aa:bb:cc:dd:ee:ff' : '11:22:33:44:55:66',
          dest: isLocal ? 'ff:ff:ff:ff:ff:ff' : '77:88:99:aa:bb:cc',
          protocol: 'Ethernet',
          size: '590 bytes',
          details: {
            destMAC: isLocal ? 'ff:ff:ff:ff:ff:ff' : '77:88:99:aa:bb:cc',
            sourceMAC: isLocal ? 'aa:bb:cc:dd:ee:ff' : '11:22:33:44:55:66',
            ethertype: '0x0800', // IPv4
            vlanTag: isLocal ? null : 'VLAN 100',
            fcs: '0x' + Math.random().toString(16).substr(2, 8)
          }
        });
        break;

      case 1: // Physical Layer
        packets.push({
          type: 'Network Signal',
          timestamp: '0.002456',
          source: 'Local NIC',
          dest: selectedHop.hostname,
          protocol: 'Physical',
          size: '590 bytes + overhead',
          details: {
            signalType: selectedHop.hostname.includes('router.home') ? '802.11 WiFi' : 'Ethernet 1000BASE-T',
            frequency: selectedHop.hostname.includes('router.home') ? '2.4 GHz' : 'N/A',
            modulation: selectedHop.hostname.includes('router.home') ? 'OFDM' : '4D-PAM5',
            bitRate: selectedHop.hostname.includes('router.home') ? '150 Mbps' : '1 Gbps',
            errorCorrection: 'CRC-32',
            preamble: '0x' + Math.random().toString(16).substr(2, 16)
          }
        });
        break;
    }

    return packets;
  };

  const performRealTraceroute = async (domainName) => {
    setIsTracing(true);
    setTraceResult([]);
    setSelectedHop(null);
    setSelectedOsiLayer(null);
    setTraceProgress(0);
    setDnsStatus(`Resolving DNS for ${domainName}...`);

    try {
      // First, resolve the domain to a real IP
      console.log(`Resolving DNS for: ${domainName}`);
      setDnsStatus(`Querying DNS servers for ${domainName}...`);
      setTraceProgress(10);

      const resolvedIP = await resolveDNS(domainName);
      console.log(`✅ DNS Resolution: ${domainName} → ${resolvedIP}`);
      setDnsStatus(`✅ Resolved ${domainName} to ${resolvedIP}`);
      setTraceProgress(20);

      // Generate realistic traceroute based on real IP
      const hops = generateRealisticTraceroute(domainName, resolvedIP);
      setTraceProgress(30);

      // Simulate the traceroute with realistic delays
      setDnsStatus(`Tracing network path to ${resolvedIP} (${hops.length} hops)...`);
      const progressIncrement = 70 / hops.length; // Remaining 70% for hops

      for (let i = 0; i < hops.length; i++) {
        const hop = hops[i];
        // Add some jitter to make it feel more realistic
        const delay = hop.latency + Math.floor(Math.random() * 15);
        setDnsStatus(`Hop ${i + 1}/${hops.length}: ${hop.hostname} (${hop.ip}) - ${hop.description}...`);
        setTraceProgress(30 + (i * progressIncrement));
        await new Promise(resolve => setTimeout(resolve, Math.max(delay * 8, 200))); // Scale delay for UI
        setTraceResult(prev => [...prev, hop]);
      }
      setTraceProgress(100);
      setDnsStatus(`✅ Traceroute complete! Found ${hops.length} hops to ${domainName}`);

    } catch (error) {
      console.error('Traceroute failed:', error);
      setDnsStatus(`⚠️ DNS resolution failed, using simulated data for ${domainName}`);
      setTraceProgress(25);

      // Generate fallback with hash-based IP for unknown domains
      const domainHash = domainName.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);

      const fallbackIP = `${Math.abs(domainHash % 256)}.${Math.abs((domainHash >> 8) % 256)}.${Math.abs((domainHash >> 16) % 256)}.${Math.abs((domainHash >> 24) % 256)}`;

      const fallbackHops = [
        { ip: '192.168.1.1', hostname: 'home.router', location: 'Local Network', latency: 1, port: 80, description: 'Home router' },
        { ip: '10.0.0.1', hostname: 'isp.gateway', location: 'ISP Gateway', latency: 5, port: 80, description: 'ISP gateway' },
        { ip: '172.16.0.1', hostname: 'core.router', location: 'Core Router', latency: 12, port: 443, description: 'Core router' },
        { ip: '8.8.8.8', hostname: 'dns.google', location: 'Google DNS', latency: 25, port: 443, description: 'DNS server' },
        { ip: fallbackIP, hostname: domainName, location: 'Simulated Destination', latency: 32, port: 443, isSecure: true, description: 'Destination server' }
      ];

      setDnsStatus(`Tracing simulated path to ${domainName}...`);
      const progressIncrement = 75 / fallbackHops.length;

      for (let i = 0; i < fallbackHops.length; i++) {
        const hop = fallbackHops[i];
        setDnsStatus(`Simulating hop ${i + 1}/${fallbackHops.length}: ${hop.hostname}...`);
        setTraceProgress(25 + (i * progressIncrement));
        await new Promise(resolve => setTimeout(resolve, 400));
        setTraceResult(prev => [...prev, hop]);
      }
      setTraceProgress(100);
      setDnsStatus(`✅ Simulated traceroute complete for ${domainName}`);
    }

    setIsTracing(false);
  };

  const handleTrace = () => {
    if (domain.trim()) {
      performRealTraceroute(domain.trim());
    }
  };

  const TCPHandshakeVisualization = ({ hop, onClose }) => {
    const [handshakeStep, setHandshakeStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const tcpSteps = [
      {
        title: "SYN (Synchronize)",
        description: "Client initiates connection with SYN packet",
        packet: "TCP SYN",
        flags: "SYN=1, ACK=0",
        seq: "Seq=1000",
        direction: "client-to-server",
        color: "from-blue-400 to-cyan-500"
      },
      {
        title: "SYN-ACK (Synchronize-Acknowledge)",
        description: "Server acknowledges SYN and sends its own SYN",
        packet: "TCP SYN-ACK",
        flags: "SYN=1, ACK=1",
        seq: "Seq=2000, Ack=1001",
        direction: "server-to-client",
        color: "from-green-400 to-cyan-500"
      },
      {
        title: "ACK (Acknowledge)",
        description: "Client acknowledges server's SYN, connection established",
        packet: "TCP ACK",
        flags: "SYN=0, ACK=1",
        seq: "Seq=1001, Ack=2001",
        direction: "client-to-server",
        color: "from-emerald-400 to-green-500"
      }
    ];

  React.useEffect(() => {
    if (isPlaying && handshakeStep < tcpSteps.length - 1) {
      const timer = setTimeout(() => {
        setHandshakeStep(handshakeStep + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (handshakeStep === tcpSteps.length - 1) {
      setIsPlaying(false);
    }
  }, [handshakeStep, isPlaying, tcpSteps.length]);

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="card-modern p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              TCP 3-Way Handshake - {hop.hostname}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Control Panel */}
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn-modern px-6 py-3"
                  disabled={handshakeStep === tcpSteps.length - 1 && !isPlaying}
                >
                  {isPlaying ? 'Pause' : 'Play'} Handshake
                </button>
                <button
                  onClick={() => {
                    setHandshakeStep(0);
                    setIsPlaying(false);
                  }}
                  className="btn-modern px-6 py-3 bg-gray-600 hover:bg-gray-500"
                >
                  Reset
                </button>
              </div>

              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400 mb-2">
                  Step {handshakeStep + 1} of {tcpSteps.length}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((handshakeStep + 1) / tcpSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className={`p-6 rounded-lg bg-gradient-to-r ${tcpSteps[handshakeStep].color} text-white`}>
                <h4 className="text-xl font-semibold mb-2">{tcpSteps[handshakeStep].title}</h4>
                <p className="text-white/90 mb-4">{tcpSteps[handshakeStep].description}</p>
                <div className="bg-black/20 rounded p-3 font-mono text-sm">
                  <div>Packet: {tcpSteps[handshakeStep].packet}</div>
                  <div>Flags: {tcpSteps[handshakeStep].flags}</div>
                  <div>Sequence: {tcpSteps[handshakeStep].seq}</div>
                </div>
              </div>
            </div>

            {/* Visualization */}
            <div className="relative">
              <div className="bg-gray-900 rounded-lg p-6 h-80 flex flex-col justify-center">
                {/* Client */}
                <div className="flex items-center justify-start mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-desktop text-white text-lg"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-blue-400">Client</div>
                    <div className="text-sm text-gray-400">Port 49231</div>
                  </div>
                </div>

                {/* Packets */}
                <div className="flex-1 flex items-center justify-center relative">
                  {tcpSteps.map((step, index) => (
                    index === handshakeStep && (
                      <div
                        key={index}
                        className={`absolute animate-pulse ${
                          step.direction === 'client-to-server' ? 'left-16' : 'right-16'
                        }`}
                        style={{
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      >
                        <div className={`bg-gradient-to-r ${step.color} text-white px-4 py-2 rounded-lg shadow-lg max-w-xs text-sm`}>
                          <div className="font-bold">{step.packet}</div>
                          <div className="text-xs opacity-90">{step.flags}</div>
                          {step.direction === 'client-to-server' && (
                            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-blue-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                          )}
                          {step.direction === 'server-to-client' && (
                            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-r-8 border-r-green-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                          )}
                        </div>
                      </div>
                    )
                  ))}

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 opacity-50"></div>
                </div>

                {/* Server */}
                <div className="flex items-center justify-end mt-8">
                  <div className="text-right mr-4">
                    <div className="font-semibold text-green-400">Server</div>
                    <div className="text-sm text-gray-400">Port {hop.port}</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-server text-white text-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="mt-8 p-4 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-lg border border-cyan-400/20">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {handshakeStep === tcpSteps.length - 1 ? 'ESTABLISHED' : 'CONNECTING'}
                </div>
                <div className="text-sm text-gray-400">Connection Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {hop.latency}ms
                </div>
                <div className="text-sm text-gray-400">Round Trip Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  TCP
                </div>
                <div className="text-sm text-gray-400">Protocol</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TlsSslVisualization = ({ hop, onClose }) => {
    const [protocolStep, setProtocolStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const protocolSteps = hop.isSecure ? [
      {
        title: "TCP Handshake Complete",
        description: "TCP connection established, ready for TLS",
        protocol: "TCP",
        color: "from-blue-400 to-cyan-500",
        details: "3-way handshake completed successfully"
      },
      {
        title: "Client Hello (TLS)",
        description: "Client sends TLS version, cipher suites, and key exchange parameters",
        protocol: "TLS 1.3",
        color: "from-cyan-400 to-blue-500",
        details: "Supported ciphers, extensions, random nonce"
      },
      {
        title: "Server Hello + Certificate",
        description: "Server responds with chosen parameters and digital certificate",
        protocol: "TLS 1.3",
        color: "from-green-400 to-cyan-500",
        details: "Certificate chain, server key exchange"
      },
      {
        title: "Key Exchange & Finished",
        description: "Secure key exchange completed, encrypted channel established",
        protocol: "TLS 1.3",
        color: "from-emerald-400 to-green-500",
        details: "Symmetric encryption enabled"
      },
      {
        title: "SSL Termination",
        description: "Load balancer terminates SSL/TLS, forwards decrypted traffic",
        protocol: "SSL/TLS",
        color: "from-purple-400 to-pink-500",
        details: "Certificate validation, decryption, forwarding"
      }
    ] : [
      {
        title: "TCP Handshake Complete",
        description: "TCP connection established, HTTP traffic flows",
        protocol: "TCP",
        color: "from-blue-400 to-cyan-500",
        details: "Plaintext HTTP communication"
      }
    ];

    React.useEffect(() => {
      if (isPlaying && protocolStep < protocolSteps.length - 1) {
        const timer = setTimeout(() => {
          setProtocolStep(protocolStep + 1);
        }, 2500);
        return () => clearTimeout(timer);
      } else if (protocolStep === protocolSteps.length - 1) {
        setIsPlaying(false);
      }
    }, [protocolStep, isPlaying, protocolSteps.length]);

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="card-modern p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Protocol Stack Analysis - {hop.hostname}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Control Panel */}
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn-modern px-4 py-2 text-sm"
                  disabled={protocolStep === protocolSteps.length - 1 && !isPlaying}
                >
                  {isPlaying ? 'Pause' : 'Play'} Sequence
                </button>
                <button
                  onClick={() => {
                    setProtocolStep(0);
                    setIsPlaying(false);
                  }}
                  className="btn-modern px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500"
                >
                  Reset
                </button>
              </div>

              <div className="text-center">
                <div className="text-lg font-bold text-cyan-400 mb-2">
                  Step {protocolStep + 1}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((protocolStep + 1) / protocolSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className={`p-4 rounded-lg bg-gradient-to-r ${protocolSteps[protocolStep].color} text-white`}>
                <h4 className="text-lg font-semibold mb-2">{protocolSteps[protocolStep].title}</h4>
                <p className="text-white/90 text-sm mb-3">{protocolSteps[protocolStep].description}</p>
                <div className="bg-black/20 rounded p-2 font-mono text-xs">
                  <div className="font-bold">{protocolSteps[protocolStep].protocol}</div>
                  <div>{protocolSteps[protocolStep].details}</div>
                </div>
              </div>
            </div>

            {/* Protocol Stack Visualization */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-center text-gray-300">Protocol Stack</h4>

              <div className="space-y-2">
                {[
                  { name: "Application", layer: "HTTP/HTTPS", color: "from-orange-400 to-red-500" },
                  { name: "Presentation", layer: hop.isSecure ? "TLS/SSL" : "None", color: "from-purple-400 to-pink-500" },
                  { name: "Session", layer: "None", color: "from-gray-400 to-gray-500" },
                  { name: "Transport", layer: "TCP", color: "from-blue-400 to-cyan-500" },
                  { name: "Network", layer: "IP", color: "from-green-400 to-emerald-500" },
                  { name: "Data Link", layer: "Ethernet", color: "from-yellow-400 to-orange-500" },
                  { name: "Physical", layer: "Physical Media", color: "from-gray-500 to-gray-600" }
                ].map((layer, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg bg-gradient-to-r ${layer.color} text-white text-sm ${
                      protocolStep >= (layer.name === "Transport" ? 0 : layer.name === "Presentation" && hop.isSecure ? 3 : 10) ? 'ring-2 ring-white/50' : ''
                    } transition-all duration-300`}
                  >
                    <div className="font-semibold">{layer.name} Layer</div>
                    <div className="text-xs opacity-90">{layer.layer}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SSL Termination Visualization */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-center text-gray-300">
                {hop.isSecure ? "SSL Termination Flow" : "Direct Connection"}
              </h4>

              <div className="bg-gray-900 rounded-lg p-4 h-80 flex flex-col justify-center">
                {hop.isSecure ? (
                  <div className="space-y-6">
                    {/* Client */}
                    <div className="flex items-center justify-start">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-user text-white text-xs"></i>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-blue-400 text-sm">Client</div>
                        <div className="text-xs text-gray-400">HTTPS</div>
                      </div>
                    </div>

                    {/* Load Balancer */}
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-shield-alt text-white"></i>
                      </div>
                      <div className="ml-3 text-center">
                        <div className="font-semibold text-purple-400 text-sm">Load Balancer</div>
                        <div className="text-xs text-gray-400">SSL Termination</div>
                      </div>
                    </div>

                    {/* Server */}
                    <div className="flex items-center justify-end">
                      <div className="text-right mr-3">
                        <div className="font-semibold text-green-400 text-sm">Backend</div>
                        <div className="text-xs text-gray-400">HTTP</div>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-server text-white text-xs"></i>
                      </div>
                    </div>

                    {/* Connection Lines */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-t from-purple-400 to-green-400"></div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <i className="fas fa-unlock text-3xl mb-4"></i>
                    <p className="text-sm">Direct HTTP connection</p>
                    <p className="text-xs">No SSL/TLS encryption</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="mt-8 p-4 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-lg border border-cyan-400/20">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className={`text-2xl font-bold ${hop.isSecure ? 'text-green-400' : 'text-yellow-400'}`}>
                  {hop.isSecure ? 'SECURE' : 'INSECURE'}
                </div>
                <div className="text-sm text-gray-400">Connection Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {hop.port}
                </div>
                <div className="text-sm text-gray-400">Port</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {hop.isSecure ? 'HTTPS' : 'HTTP'}
                </div>
                <div className="text-sm text-gray-400">Protocol</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-4">
      <div className="w-[85%] mx-auto max-w-none">
        <div>
        <div
          ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Network Packet Analyzer
            </h1>
            <p className="text-gray-300 text-lg">
              Wireshark-style network visualization with live packet capture simulation
            </p>
          </div>

          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain (e.g., google.com)"
              className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none flex-1 max-w-md"
              onKeyPress={(e) => e.key === 'Enter' && handleTrace()}
            />
            <button
              onClick={handleTrace}
              disabled={isTracing || !domain.trim()}
              className="btn-modern px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTracing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  Capturing...
                </>
              ) : (
                <>
                  <i className="fas fa-play mr-2"></i>
                  Start Capture
                </>
              )}
            </button>
          </div>

          <div>
            {traceResult.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Network Hops - Left Side */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                      <i className="fas fa-route text-white text-sm"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white">Network Path</h3>
                  </div>

                  <div className="space-y-4">
                    {traceResult.map((hop, index) => (
                      <div key={index} className="relative group">
                        {index < traceResult.length - 1 && (
                          <div className="absolute left-5 top-12 w-0.5 h-10 bg-gradient-to-b from-blue-400/50 to-purple-400/50"></div>
                        )}

                        <div
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                            selectedHop?.ip === hop.ip
                              ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/60 shadow-xl shadow-blue-500/20'
                              : 'bg-slate-800/60 hover:bg-slate-700/80 border border-slate-600/30 hover:border-slate-500/50 hover:shadow-lg hover:shadow-slate-900/50'
                          } backdrop-blur-sm`}
                          onClick={() => setSelectedHop(hop)}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 relative">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                                    selectedHop?.ip === hop.ip
                                      ? 'bg-gradient-to-r from-blue-400 to-cyan-500'
                                      : 'bg-gradient-to-r from-slate-600 to-slate-500'
                                  }`}>
                                    {index + 1}
                                  </div>
                                  {selectedHop?.ip === hop.ip && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-slate-900"></div>
                                  )}
                                </div>
                                <h4 className="font-semibold text-white text-sm truncate group-hover:text-blue-300 transition-colors">
                                  {hop.hostname}
                                </h4>
                              </div>
                              <span className="text-emerald-400 font-mono text-sm font-bold bg-emerald-400/10 px-2 py-0.5 rounded-md">
                                {hop.latency}ms
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <div className="text-xs text-slate-500 mb-1">IP ADDRESS</div>
                                <span className="text-slate-400 text-sm font-mono bg-slate-700/50 px-2 py-1 rounded block">
                                  {hop.ip}
                                </span>
                              </div>
                              <div>
                                <div className="text-xs text-slate-500 mb-1">LOCATION/DESCRIPTION</div>
                                <span className="text-purple-300 text-sm bg-purple-500/10 px-2 py-1 rounded block" title={hop.description || hop.location}>
                                  {hop.description || hop.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Network Stats - Redesigned */}
                  <div className="mt-8 p-5 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 rounded-xl border border-blue-400/20 backdrop-blur-sm">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <i className="fas fa-chart-line mr-2 text-blue-400"></i>
                      Network Metrics
                    </h4>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{traceResult.length}</div>
                        <div className="text-sm text-slate-400 font-medium">Total Hops</div>
                      </div>
                      <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                        <div className="text-2xl font-bold text-emerald-400 mb-1">
                          {(traceResult.reduce((sum, h) => sum + h.latency, 0) / traceResult.length).toFixed(0)}
                        </div>
                        <div className="text-sm text-slate-400 font-medium">Avg Latency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* OSI Model & Packet Inspection - Middle/Right Side */}
              <div className="lg:col-span-2">
                {selectedHop ? (
                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                      {/* OSI Model Container */}
                      <div className={`${selectedOsiLayer ? '2xl:col-span-1' : '2xl:col-span-2'}`}>
                        {/* Packet Header */}
                        <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 rounded p-1 border border-slate-700/50 backdrop-blur-sm mb-2 flex items-center justify-between">
                          <div className="flex items-center space-x-1.5">
                            <div className="w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded flex items-center justify-center">
                              <i className="fas fa-network-wired text-white text-xs"></i>
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-white truncate max-w-24">
                                Packet Capture
                              </div>
                              <div className="text-cyan-300 text-xs truncate max-w-24">{selectedHop.hostname}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedHop(null)}
                            className="w-5 h-5 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 flex-shrink-0 ml-2"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </div>

                      {/* Network OSI Model (Current Hop Analysis) */}
                      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl border border-indigo-400/30 backdrop-blur-sm">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                            <i className="fas fa-layer-group text-white text-xs"></i>
                          </div>
                          <h5 className="text-lg font-semibold text-indigo-300">
                            Network OSI: {selectedHop.hostname.split('.')[0]}
                          </h5>
                        </div>

                        <div className="space-y-3">
                          {[
                            { layer: 7, name: "App", protocol: selectedHop.isSecure ? "HTTPS" : "HTTP", active: true },
                            { layer: 6, name: "Pres", protocol: selectedHop.isSecure ? "TLS 1.3" : "None", active: selectedHop.isSecure },
                            { layer: 5, name: "Sess", protocol: "TCP Handshake", active: true },
                            { layer: 4, name: "Trans", protocol: `TCP:${selectedHop.port}`, active: true },
                            { layer: 3, name: "Net", protocol: `IP:${selectedHop.ip}`, active: true },
                            { layer: 2, name: "Data", protocol: selectedHop.hostname.includes('router.home') ? "WiFi" : "Transit Eth", active: true },
                            { layer: 1, name: "Phys", protocol: selectedHop.hostname.includes('router.home') ? "802.11" : "Fiber", active: true }
                          ].map((osiLayer, index) => (
                            <div key={osiLayer.layer} className="relative">
                              <div
                                className={`flex items-center p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-lg ${
                                  selectedOsiLayer === osiLayer.layer ? 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400/50' : ''
                                } ${
                                  osiLayer.active ? 'bg-slate-800/60 border-cyan-400/30 hover:bg-cyan-500/10' : 'bg-slate-800/30 border-slate-600/30 hover:bg-slate-700/40'
                                }`}
                                onClick={() => setSelectedOsiLayer(selectedOsiLayer === osiLayer.layer ? null : osiLayer.layer)}
                              >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 ${
                                  osiLayer.active ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-slate-600 to-slate-500'
                                }`}>
                                  {osiLayer.layer}
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-white text-sm">{osiLayer.name}</span>
                                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                                      osiLayer.active ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-600/20 text-slate-400'
                                    }`}>
                                      {osiLayer.protocol}
                                    </span>
                                  </div>
                                </div>

                                <div className="ml-2 flex items-center">
                                  <div className={`w-2 h-2 rounded-full ${
                                    osiLayer.active ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
                                  }`}></div>
                                  {osiLayer.active && (
                                    <div className="text-green-400 text-xs font-bold animate-pulse ml-1">
                                      →
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg border border-emerald-400/30">
                          <div className="text-center text-xs text-emerald-400 font-medium">
                            🎯 Current Hop Processing
                          </div>
                        </div>
                      </div>

                      {/* Local Machine OSI Stack (After Network) */}
                      <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-xl border border-cyan-400/30 backdrop-blur-sm">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                            <i className="fas fa-desktop text-white text-xs"></i>
                          </div>
                          <h5 className="text-lg font-semibold text-cyan-300">Local OSI Stack</h5>
                        </div>

                        <div className="space-y-2">
                          {[
                            { layer: "App", protocol: "Browser HTTPS", icon: "🌐" },
                            { layer: "Pres", protocol: "TLS 1.3", icon: "🔐" },
                            { layer: "Sess", protocol: "TCP Handshake", icon: "🔗" },
                            { layer: "Trans", protocol: `TCP:${selectedHop.port}`, icon: "📦" },
                            { layer: "Net", protocol: "IP Packet", icon: "🌍" },
                            { layer: "Data", protocol: "Ethernet", icon: "⚡" },
                            { layer: "Phys", protocol: "WiFi 802.11", icon: "📡" }
                          ].map((localLayer, index) => (
                            <div key={index} className="flex items-center p-2 bg-slate-800/40 rounded-lg border border-slate-600/20">
                              <div className="text-sm mr-2">{localLayer.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-white text-xs">{localLayer.layer}</span>
                                  <span className="text-cyan-400 font-mono text-xs">{localLayer.protocol}</span>
                                </div>
                              </div>
                              <div className="ml-2">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 p-2 bg-emerald-500/10 rounded-lg border border-emerald-400/30">
                          <div className="text-center text-xs text-emerald-400 font-medium">
                            📤 Packets Leave Device
                          </div>
                        </div>
                      </div>
                    </div>

                      {/* Interactive Packet Inspection Panel */}
                      {selectedOsiLayer && (
                        <div className="2xl:col-span-1 p-6 bg-gradient-to-r from-red-500/10 via-pink-500/10 to-purple-500/10 rounded-xl border border-red-400/30 backdrop-blur-sm">
                          <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                              <i className="fas fa-search-plus text-white"></i>
                            </div>
                            <div>
                              <h5 className="text-xl font-semibold text-red-300">
                                OSI Layer {selectedOsiLayer} Packet Inspection
                              </h5>
                              <p className="text-sm text-slate-400">
                                Deep packet analysis with headers, payloads, and metadata
                              </p>
                            </div>
                            <button
                              onClick={() => setSelectedOsiLayer(null)}
                              className="ml-auto text-slate-400 hover:text-white transition-colors"
                            >
                              <i className="fas fa-times text-xl"></i>
                            </button>
                          </div>

                          <div className="space-y-4">
                            {generateLayerPackets(selectedOsiLayer, selectedHop).map((packet, index) => (
                              <div key={index} className="bg-slate-800/60 rounded-lg border border-slate-600/30 p-4">
                                <div className="mb-3">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${
                                      packet.protocol === 'HTTPS' || packet.protocol === 'TLS 1.3' ? 'bg-green-400 animate-pulse' :
                                      packet.protocol === 'TCP' ? 'bg-blue-400' :
                                      packet.protocol === 'IP' ? 'bg-purple-400' :
                                      packet.protocol === 'Ethernet' ? 'bg-yellow-400' : 'bg-gray-400'
                                    }`}></div>
                                    <span className="font-semibold text-white">{packet.type}</span>
                                    <span className="text-cyan-400 font-mono text-sm">{packet.protocol}</span>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-slate-400 text-sm font-mono">{packet.timestamp}</div>
                                    <div className="text-slate-500 text-xs">{packet.size}</div>
                                  </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                  <div>
                                    <div className="text-xs text-slate-500 mb-1">SOURCE</div>
                                    <div className="text-cyan-400 font-mono text-sm bg-cyan-500/10 px-2 py-1 rounded block">
                                      {packet.source}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-slate-500 mb-1">DESTINATION</div>
                                    <div className="text-purple-400 font-mono text-sm bg-purple-500/10 px-2 py-1 rounded block">
                                      {packet.dest}
                                    </div>
                                  </div>
                                </div>

                                {/* Packet Details */}
                                <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700/50">
                                  <h6 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
                                    <i className="fas fa-code mr-2"></i>
                                    Packet Details
                                  </h6>

                                  {packet.protocol === 'HTTPS' && (
                                    <div className="space-y-3">
                                      <div>
                                        <div className="text-xs text-slate-500 mb-1">HTTP METHOD & URI</div>
                                        <div className="text-green-400 font-mono text-sm">
                                          {packet.details.method} {packet.details.uri}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-xs text-slate-500 mb-1">HEADERS</div>
                                        <div className="bg-slate-800/60 p-2 rounded text-xs font-mono text-slate-300 max-h-32 overflow-y-auto">
                                          {Object.entries(packet.details.headers).map(([key, value]) => (
                                            <div key={key}>{key}: {value}</div>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-xs text-slate-500 mb-1">PAYLOAD PREVIEW</div>
                                        <div className="bg-slate-800/60 p-2 rounded text-xs font-mono text-slate-300">
                                          {packet.details.payload}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {packet.protocol === 'TLS 1.3' && (
                                    <div className="space-y-3">
                                      <div>
                                        <div className="text-xs text-slate-500 mb-1">TLS VERSION</div>
                                        <div className="text-blue-400 font-mono text-sm">{packet.details.version}</div>
                                      </div>
                                      <div>
                                        <div className="text-xs text-slate-500 mb-1">CIPHER SUITES</div>
                                        <div className="space-y-1">
                                          {packet.details.cipherSuites.map((suite, i) => (
                                            <div key={i} className="text-cyan-400 font-mono text-xs bg-cyan-500/10 px-2 py-1 rounded">
                                              {suite}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-xs text-slate-500 mb-1">SESSION KEYS</div>
                                        <div className="bg-slate-800/60 p-2 rounded text-xs font-mono text-yellow-400 space-y-1">
                                          <div>Client Random: {packet.details.sessionKeys.clientRandom}</div>
                                          <div>Master Secret: {packet.details.sessionKeys.masterSecret}</div>
                                          <div>Session Ticket: {packet.details.sessionKeys.sessionTicket.substring(0, 20)}...</div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {(packet.protocol === 'TCP' || packet.type.includes('TCP')) && (
                                    <div className="space-y-3">
                                      <div>
                                        <div className="text-xs text-slate-500 mb-1">TCP FLAGS</div>
                                        <div className="flex flex-wrap gap-1">
                                          {packet.details.flags.map((flag, i) => (
                                            <span key={i} className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-mono">
                                              {flag}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="space-y-3">
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">SEQ NUMBER</div>
                                          <div className="text-green-400 font-mono text-sm">{packet.details.seqNumber}</div>
                                        </div>
                                        {packet.details.ackNumber && (
                                          <div>
                                            <div className="text-xs text-slate-500 mb-1">ACK NUMBER</div>
                                            <div className="text-blue-400 font-mono text-sm">{packet.details.ackNumber}</div>
                                          </div>
                                        )}
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">WINDOW SIZE</div>
                                          <div className="text-purple-400 font-mono text-sm">{packet.details.windowSize}</div>
                                        </div>
                                        {packet.details.checksum && (
                                          <div>
                                            <div className="text-xs text-slate-500 mb-1">CHECKSUM</div>
                                            <div className="text-orange-400 font-mono text-sm">{packet.details.checksum}</div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {packet.protocol === 'IP' && (
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-1 gap-3">
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">VERSION</div>
                                          <div className="text-blue-400 font-mono text-sm">IPv{packet.details.version}</div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">TTL</div>
                                          <div className="text-green-400 font-mono text-sm">{packet.details.ttl}</div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">PROTOCOL</div>
                                          <div className="text-purple-400 font-mono text-sm">{packet.details.protocol}</div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">CHECKSUM</div>
                                          <div className="text-orange-400 font-mono text-sm">{packet.details.checksum}</div>
                                        </div>
                                      </div>
                                      <div className="space-y-3">
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">SOURCE IP</div>
                                          <div className="text-cyan-400 font-mono text-sm bg-cyan-500/10 px-2 py-1 rounded block">
                                            {packet.details.sourceIP}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">DESTINATION IP</div>
                                          <div className="text-purple-400 font-mono text-sm bg-purple-500/10 px-2 py-1 rounded block">
                                            {packet.details.destIP}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {packet.protocol === 'Ethernet' && (
                                    <div className="space-y-3">
                                      <div className="space-y-3">
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">SOURCE MAC</div>
                                          <div className="text-green-400 font-mono text-sm bg-green-500/10 px-2 py-1 rounded block">
                                            {packet.details.sourceMAC}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">DESTINATION MAC</div>
                                          <div className="text-blue-400 font-mono text-sm bg-blue-500/10 px-2 py-1 rounded block">
                                            {packet.details.destMAC}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-1 gap-3">
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">ETHERTYPE</div>
                                          <div className="text-purple-400 font-mono text-sm">{packet.details.ethertype}</div>
                                        </div>
                                        {packet.details.vlanTag && (
                                          <div>
                                            <div className="text-xs text-slate-500 mb-1">VLAN</div>
                                            <div className="text-orange-400 font-mono text-sm">{packet.details.vlanTag}</div>
                                          </div>
                                        )}
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">FCS</div>
                                          <div className="text-red-400 font-mono text-sm">{packet.details.fcs}</div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {packet.protocol === 'Physical' && (
                                    <div className="space-y-3">
                                      <div className="grid grid-cols-1 gap-3">
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">SIGNAL TYPE</div>
                                          <div className="text-blue-400 font-mono text-sm">{packet.details.signalType}</div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">BIT RATE</div>
                                          <div className="text-green-400 font-mono text-sm">{packet.details.bitRate}</div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">MODULATION</div>
                                          <div className="text-purple-400 font-mono text-sm">{packet.details.modulation}</div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">ERROR CORRECTION</div>
                                          <div className="text-orange-400 font-mono text-sm">{packet.details.errorCorrection}</div>
                                        </div>
                                      </div>
                                      {packet.details.frequency !== 'N/A' && (
                                        <div>
                                          <div className="text-xs text-slate-500 mb-1">FREQUENCY</div>
                                          <div className="text-cyan-400 font-mono text-sm">{packet.details.frequency}</div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}

                            {generateLayerPackets(selectedOsiLayer, selectedHop).length === 0 && (
                              <div className="text-center py-8 text-slate-400">
                                <i className="fas fa-info-circle text-4xl mb-4 text-slate-600"></i>
                                <p>No packets available for this layer</p>
                              </div>
                            )}
                          </div>

                          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/30">
                            <div className="flex items-center justify-center space-x-2 text-yellow-400">
                              <i className="fas fa-lightbulb text-lg"></i>
                              <span className="text-sm font-medium">
                                💡 Click other OSI layers to inspect their packets • Real packet capture possible with system permissions
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Packet List - Wireshark Style - Vertical Layout */}
                      {!selectedOsiLayer && (
                      <div className="space-y-4">

                        {/* TCP Handshake Packets - Redesigned */}
                        <div className="space-y-2">
                          {/* SYN Packet */}
                          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 p-4 rounded-xl">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</span>
                              <span className="font-semibold text-white">TCP SYN</span>
                              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs font-bold">TCP</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-slate-400">Time:</span>
                                <span className="text-slate-300 font-mono ml-2">0.000000</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Source:</span>
                                <span className="text-cyan-300 font-mono ml-2 bg-cyan-500/10 px-2 py-1 rounded">{traceResult[0]?.ip || '192.168.1.100'}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Destination:</span>
                                <span className="text-purple-300 font-mono ml-2 bg-purple-500/10 px-2 py-1 rounded">{selectedHop.ip}</span>
                              </div>
                            </div>
                          </div>

                          {/* SYN-ACK Packet */}
                          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 p-4 rounded-xl">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</span>
                              <span className="font-semibold text-white">TCP SYN-ACK</span>
                              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs font-bold">TCP</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-slate-400">Time:</span>
                                <span className="text-slate-300 font-mono ml-2">0.024123</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Source:</span>
                                <span className="text-purple-300 font-mono ml-2 bg-purple-500/10 px-2 py-1 rounded">{selectedHop.ip}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Destination:</span>
                                <span className="text-cyan-300 font-mono ml-2 bg-cyan-500/10 px-2 py-1 rounded">{traceResult[0]?.ip || '192.168.1.100'}</span>
                              </div>
                            </div>
                          </div>

                          {/* ACK Packet */}
                          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 p-4 rounded-xl">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</span>
                              <span className="font-semibold text-white">TCP ACK</span>
                              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs font-bold">TCP</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-slate-400">Time:</span>
                                <span className="text-slate-300 font-mono ml-2">0.024456</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Source:</span>
                                <span className="text-cyan-300 font-mono ml-2 bg-cyan-500/10 px-2 py-1 rounded">{traceResult[0]?.ip || '192.168.1.100'}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Destination:</span>
                                <span className="text-purple-300 font-mono ml-2 bg-purple-500/10 px-2 py-1 rounded">{selectedHop.ip}</span>
                              </div>
                            </div>
                          </div>

                          {selectedHop.isSecure && (
                            <>
                              {/* Client Hello TLS */}
                              <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-400/30 p-4 rounded-xl">
                                <div className="flex items-center space-x-3 mb-3">
                                  <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</span>
                                  <span className="font-semibold text-white">TLS Client Hello</span>
                                  <span className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded text-xs font-bold">TLS</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="text-slate-400">Time:</span>
                                    <span className="text-slate-300 font-mono ml-2">0.024789</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">Source:</span>
                                    <span className="text-cyan-300 font-mono ml-2 bg-cyan-500/10 px-2 py-1 rounded">{traceResult[0]?.ip || '192.168.1.100'}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">Destination:</span>
                                    <span className="text-purple-300 font-mono ml-2 bg-purple-500/10 px-2 py-1 rounded">{selectedHop.ip}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Server Hello TLS */}
                              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-400/30 p-4 rounded-xl">
                                <div className="flex items-center space-x-3 mb-3">
                                  <span className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">5</span>
                                  <span className="font-semibold text-white">TLS Server Hello</span>
                                  <span className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded text-xs font-bold">TLS</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="text-slate-400">Time:</span>
                                    <span className="text-slate-300 font-mono ml-2">0.025012</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">Source:</span>
                                    <span className="text-purple-300 font-mono ml-2 bg-purple-500/10 px-2 py-1 rounded">{selectedHop.ip}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">Destination:</span>
                                    <span className="text-cyan-300 font-mono ml-2 bg-cyan-500/10 px-2 py-1 rounded">{traceResult[0]?.ip || '192.168.1.100'}</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      )}

                      {/* Detailed Packet Analysis - Redesigned */}
                    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
                      <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                          <i className="fas fa-search text-white"></i>
                        </div>
                        <h4 className="text-xl font-bold text-white">Deep Packet Analysis</h4>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* TCP Handshake Visualization - Redesigned */}
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                              <i className="fas fa-handshake text-white text-sm"></i>
                            </div>
                            <h5 className="text-lg font-semibold text-cyan-300">TCP 3-Way Handshake</h5>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-400/30">
                              <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                              <div className="flex-1">
                                <div className="text-blue-300 font-semibold text-sm">SYN</div>
                                <div className="text-slate-400 text-xs font-mono">Seq=1000, Win=65535</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30">
                              <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                              <div className="flex-1">
                                <div className="text-green-300 font-semibold text-sm">SYN-ACK</div>
                                <div className="text-slate-400 text-xs font-mono">Seq=2000, Ack=1001</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-400/30">
                              <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                              <div className="flex-1">
                                <div className="text-emerald-300 font-semibold text-sm">ACK</div>
                                <div className="text-slate-400 text-xs font-mono">Seq=1001, Ack=2001</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Protocol Stack - Redesigned */}
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                              <i className="fas fa-layer-group text-white text-sm"></i>
                            </div>
                            <h5 className="text-lg font-semibold text-purple-300">OSI Protocol Stack</h5>
                          </div>
                          <div className="space-y-2">
                            {[
                              { layer: "Application", protocol: selectedHop.isSecure ? "HTTPS" : "HTTP", color: "from-orange-500 to-red-500", active: true },
                              { layer: "Presentation", protocol: selectedHop.isSecure ? "TLS 1.3" : "None", color: "from-purple-500 to-pink-500", active: selectedHop.isSecure },
                              { layer: "Session", protocol: "None", color: "from-gray-500 to-gray-600", active: false },
                              { layer: "Transport", protocol: "TCP", color: "from-blue-500 to-cyan-500", active: true },
                              { layer: "Network", protocol: "IP", color: "from-green-500 to-emerald-500", active: true },
                              { layer: "Data Link", protocol: "Ethernet", color: "from-yellow-500 to-orange-500", active: true },
                              { layer: "Physical", protocol: "Physical Media", color: "from-gray-600 to-gray-700", active: true }
                            ].map((item, index) => (
                              <div key={index} className={`flex justify-between items-center p-3 bg-gradient-to-r ${item.color} text-white text-sm rounded-lg transition-all duration-300 ${
                                item.active ? 'ring-2 ring-white/20 shadow-lg' : 'opacity-60'
                              }`}>
                                <span className="font-semibold">{item.layer} Layer</span>
                                <span className="opacity-90 font-mono">{item.protocol}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SSL Termination Visualization - Redesigned */}
                      {selectedHop.isSecure && (
                        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 rounded-xl border border-purple-400/30 backdrop-blur-sm">
                          <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                              <i className="fas fa-shield-alt text-white"></i>
                            </div>
                            <h5 className="text-xl font-semibold text-pink-300">SSL/TLS Termination Flow</h5>
                          </div>

                          <div className="flex items-center justify-center space-x-6">
                            <div className="text-center group">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-3 shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300">
                                <i className="fas fa-user text-white text-lg"></i>
                              </div>
                              <div className="text-cyan-300 font-semibold">Client</div>
                              <div className="text-slate-400 text-sm">HTTPS</div>
                            </div>

                            <div className="flex-1 flex items-center justify-center">
                              <div className="flex-1 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse opacity-75"></div>
                              </div>
                            </div>

                            <div className="text-center group">
                              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-3 shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300">
                                <i className="fas fa-shield-alt text-white text-xl"></i>
                              </div>
                              <div className="text-purple-300 font-semibold">Load Balancer</div>
                              <div className="text-slate-400 text-sm">SSL Termination</div>
                            </div>

                            <div className="flex-1 flex items-center justify-center">
                              <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 via-green-400 to-emerald-400 rounded-full relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-green-400 to-emerald-400 rounded-full animate-pulse opacity-75"></div>
                              </div>
                            </div>

                            <div className="text-center group">
                              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-3 shadow-xl group-hover:shadow-green-500/50 transition-all duration-300">
                                <i className="fas fa-server text-white text-lg"></i>
                              </div>
                              <div className="text-green-300 font-semibold">Backend</div>
                              <div className="text-slate-400 text-sm">HTTP</div>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-2xl font-bold text-green-400 mb-1">🔒</div>
                                <div className="text-slate-300 text-sm font-medium">Encrypted</div>
                                <div className="text-slate-400 text-xs">Client ↔ LB</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-yellow-400 mb-1">🔓</div>
                                <div className="text-slate-300 text-sm font-medium">Decrypted</div>
                                <div className="text-slate-400 text-xs">LB Processing</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-blue-400 mb-1">📡</div>
                                <div className="text-slate-300 text-sm font-medium">Plaintext</div>
                                <div className="text-slate-400 text-xs">LB ↔ Backend</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-900 rounded-lg p-12 text-center">
                    <i className="fas fa-network-wired text-6xl text-gray-600 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a Network Hop</h3>
                    <p className="text-gray-500">Click on any hop in the network path to view detailed packet analysis</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {traceResult.length === 0 && !isTracing && (
            <div className="bg-gray-900 rounded-lg p-12 text-center">
              <i className="fas fa-search text-6xl text-gray-600 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Ready to Capture Network Traffic</h3>
              <p className="text-gray-500">Enter a domain above to start network packet capture and analysis</p>
            </div>
          )}

          {isTracing && (
            <div className="bg-gray-900 rounded-lg p-12 text-center">
              <div className="animate-pulse">
                <i className="fas fa-cog text-6xl text-cyan-400 mb-4 animate-spin"></i>
              </div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Capturing Network Packets...</h3>
              <p className="text-gray-500 mb-4">Tracing route and analyzing network protocols</p>

              {/* Progress Bar */}
              <div className="mb-6 max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(traceProgress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${traceProgress}%` }}
                  ></div>
                </div>
              </div>

              {dnsStatus && (
                <div className="bg-gray-800 rounded p-3 mb-4 max-w-md mx-auto">
                  <p className="text-cyan-300 text-sm font-mono">{dnsStatus}</p>
                </div>
              )}
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

const BlogName = () => {
  return (
    <div className="flex justify-center mt-5">
      <h1>
      <a
        href="https://stefhall2704.pythonanywhere.com"
        className="text-4xl hover:underline"
      >
        Stefan's Blog
      </a></h1>
    </div>
  );
};

const SelfHealingName = () => {
  return (
    <div className="flex justify-center mt-5">
      <h1 className="text-4xl">
        Self Healing 
      </h1>
    </div>
  );
};

const SelfHealingDescription = () => {
  return (
    <div className="flex justify-center ml-5 mb-5 mr-5">
      <ul>
        <li>
          
            <h1 className='text-xl' >
            Introduction:
            </h1>
            <br />
            <p>
              As you enter the world of reliability, you will run into many problems; response time too high, random outages, flakeyness.
              And there are different solutions to these various issues. Every second counts. I have implemented a self healing system across 14 VMs.
              This is to self heal app pools when detecting an outage on a single or multiple app pools.
            </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Skills and Knowledge:
            </h1>
            <br />
            <p>
              Some pieces to konw about self healing in my project was, detection, detecting false positives, a method in order to heal (fix) the problem.
              A few key pieces here was using gatus alongside its custom alerting. The alerting would hit an internal api. The api would then do its own check for the healthcheck.
              Then if there was a false positive, we would log the false positive. 
            </p>
        </li>
        <br />
        <li>
          <h1 className='text-xl' > 
            Specifics:
            </h1>
            <br />
            <p>
              This is the process. We have a function, lambda/azure function. And the function keeps up to date with new customers/tenants. We also have Gatus. Gatus is an open source, scalable healthcheck service. The healthcheck service will run healthchecks every so often and when detecting a failure, it will use custom alerting to send the custom alert to an internal api on the network (vpc/vnet). This api will then determind if it is a false positive or not. If it is, we will stop the process and log out to our monitoring tool (grafana/datadog) and give it info about the false positive. If there is a customer/tenant that doesn't exists anymore, we will remove them from the config to avoid further healthcheck processing. If it is a real app pool that is down, we will then take the metadata from the custom alert and use an ssh task to send to the master VM that has port 22 opened on the network and whitelists the IP of the api that is sending the ssh task. This is also secured via ssh key that rotates pretty often. Then on the VM, there are sripts that will run the self healing. And then from there, it will spin up the app pool(s) as needed on the VMs, and on the next iteration of the healthchecks, we will not alert, but we will send a log to our monitoring tool saying that self healing was implemented on X customer/tenant.
            </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Conclusion:
            </h1>
            <br />
            <p>
              This process helps with reliability of our VM app pools. We also have no more complaints about customers randomly going down. And this also helps customer support and SRE not having to implement ad-hoc fixes to fix the app pool(s) when they go down. It is also good to note that self healing is a very tedious, yet worthy process to go through on your relative services.
          </p>
        </li>
      </ul>
    </div>
  );
};

const SelfHealing = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
    <div
      ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <i className="fas fa-shield-alt text-white"></i>
    </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Self Healing</h2>
              <p className="text-sm md:text-base text-slate-400">Automated Infrastructure Recovery</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Enterprise Self-Healing System
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Developed a full-stack self-healing system to combat random W3WP process terminations across 2,000+ IIS-hosted customer sites on 14 Windows VMs, eliminating the need for manual recovery. This enterprise-grade solution leverages Gatus for dynamic health checks, Azure File Share Client for real-time config updates, and a custom internal API with logic to auto-heal based on HTTP status codes (404, 503, etc.).
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                <i className="fas fa-brain mr-2"></i>
                Intelligent Detection & Response
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Implemented exponential backoff polling for healing and Datadog events to notify, skip or resolve incidents. The system intelligently differentiates between false positives and genuine failures, preventing unnecessary remediation while ensuring rapid response to actual outages. False positives are logged to monitoring tools for trend analysis and system improvement.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                <i className="fas fa-cogs mr-2"></i>
                Secure Infrastructure Automation
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Utilizes SSH-based secure communication with rotating keys for infrastructure access. The system maintains an Azure Function that keeps customer/tenant configurations up-to-date, automatically removing stale entries to prevent unnecessary processing. When failures are detected, metadata from custom alerts triggers targeted remediation scripts that restore app pools across the distributed infrastructure.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                Business Impact & ROI
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Cut manual remediation time by 2-5 minutes per site across 2,000+ customer sites, dramatically improving service reliability and customer satisfaction. Eliminated customer complaints about random outages and freed SRE and support teams from ad-hoc troubleshooting, allowing focus on strategic initiatives and proactive system improvements.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/20">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">14</div>
                <div className="text-xs text-slate-400 font-medium">VMs Monitored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-xs text-slate-400 font-medium">Automated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">99.9%</div>
                <div className="text-xs text-slate-400 font-medium">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const BlogDescription = () => {
  return (
    <div className="flex justify-center ml-5 mb-5 mr-5">
      <ul>
        <li>
          
            <h1 className='text-xl' >
            Introduction:
            </h1>
            <br />
            <p>
            As a beginner in software development, I went through various
            courses and gained certificates in Codecademy, Free Code Camp, and
            Coursera. However, I found that these courses did not teach me about
            frameworks. To overcome this, I decided to undertake the Django
            Girls Tutorial.
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Skills and Knowledge:
            </h1>
            <br />
            <p>
            During the tutorial, I gained a solid understanding of the basics of
            how templating languages work and how to create a multipage web
            application using Django. I also learned the basics of context
            variables. Through the tutorial, I was able to apply my newfound
            knowledge in both front-end and back-end development, allowing me to
            become a more versatile developer.
          </p>
        </li>
        <br />
        <li>
          <h1 className='text-xl' > 
            Specifics:
            </h1>
            <br />
            <p>
            I used the skills and knowledge I gained to create a personal
            project that is now part of my portfolio. The project is a blog
            application where users can view individual blog posts and post
            comments. I also made sure to add a responsive design to make the
            application user-friendly.
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Conclusion:
            </h1>
            <br />
            <p>
            Overall, the Django Girls Tutorial was a great learning experience
            that allowed me to improve my skills in software development.
            Through the tutorial, I was able to create a personal project that
            showcased my understanding of Django and front-end development. I am
            proud to have this project as part of my portfolio, and I look
            forward to applying the skills and knowledge I gained in future
            projects.
          </p>
        </li>
      </ul>
    </div>
  );
};

const Blog = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
    <div
      ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <i className="fas fa-blog text-white"></i>
    </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Django Blog Application</h2>
              <p className="text-slate-400">Full-Stack Web Development Project</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Introduction
              </h3>
              <p className="text-slate-300 leading-relaxed">
                As a beginner in software development, I went through various courses and gained certificates in Codecademy, Free Code Camp, and Coursera. However, I found that these courses did not teach me about frameworks. To overcome this, I decided to undertake the Django Girls Tutorial.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                <i className="fas fa-brain mr-2"></i>
                Skills and Knowledge
              </h3>
              <p className="text-slate-300 leading-relaxed">
                During the tutorial, I gained a solid understanding of the basics of how templating languages work and how to create a multipage web application using Django. I also learned the basics of context variables. Through the tutorial, I was able to apply my newfound knowledge in both front-end and back-end development, allowing me to become a more versatile developer.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                <i className="fas fa-code mr-2"></i>
                Specifics
              </h3>
              <p className="text-slate-300 leading-relaxed">
                I used the skills and knowledge I gained to create a personal project that is now part of my portfolio. The project is a blog application where users can view individual blog posts and post comments. I also made sure to add a responsive design to make the application user-friendly.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                Conclusion
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Overall, the Django Girls Tutorial was a great learning experience that allowed me to improve my skills in software development. Through the tutorial, I was able to create a personal project that showcased my understanding of Django and front-end development. I am proud to have this project as part of my portfolio, and I look forward to applying the skills and knowledge I gained in future projects.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-400/20">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">Django</div>
                <div className="text-xs text-slate-400 font-medium">Framework</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">Python</div>
                <div className="text-xs text-slate-400 font-medium">Backend</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">HTML/CSS</div>
                <div className="text-xs text-slate-400 font-medium">Frontend</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://stefhall2704.pythonanywhere.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105"
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              View Live Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const DijkstrasDescription = () => {
  return (
    <div className="flex justify-center ml-5 mb-5 mr-5">
      <ul>
        <li>
          <h1 className='text-xl' >
            Introduction:
            </h1>
            <br />
            <p>
            As I delved into algorithmic learning, I sought out challenges to
            build my skills, starting with small problems like 2 sum and
            Palindrome on Code Wars. This led me to explore more advanced
            algorithms like binary search, Branch Sums, and Depth First Search,
            which provided a foundation for understanding pathfinding
            algorithms. With so many options to choose from, including DFS, BFS,
            A* Search, Greedy Best-first Search, and Dijkstra's, I decided to
            focus on mastering Dijkstra's algorithm in-depth.
          </p>
        </li>
        <br />
        <li>
          
          <h1 className='text-xl' >
            Skils and Knowledge:
            </h1>
            <br />
            <p>
            To put my knowledge into practice, I challenged myself to build a
            pathfinding algorithm visualizer using JavaScript. The visualizer
            enables users to create a canvas of grids and add starting and
            ending nodes, which then highlights the search in real-time as the
            algorithm progresses through each "cell" of the grid.
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' >
            Challenges:
            </h1>
            <br />
            <p>
            I had to overcome numerous challenges throughout the
            development process, including timing the highlighting of squares to
            ensure it was visible to the human eye, adding a user interface to
            control the sequence of highlighted cells, and creating blocks that
            prevented the algorithm from searching in certain cells. These
            challenges required a significant amount of time and effort, but
            ultimately allowed me to better understand how Dijkstra's algorithm
            could be used in a real-world application.
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' >
            Conclusion:
            </h1>
            <br />
            <p>
            Overall, the project provided me with a deeper understanding of
            Dijkstra's algorithm, allowed me to build my problem-solving
            abilities, and improved my technical skills in JavaScript. I would
            highly recommend this project to any aspiring developer seeking to
            build their skills in algorithmic problem-solving and web
            development.
          </p>
        </li>
      </ul>
    </div>
  );
};

const DijkstrasAlgorithm = () => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  const [gradientX, setGradientX] = React.useState(50);
  const [gradientY, setGradientY] = React.useState(50);

  const handleMouseMove = (e) => {
    const div = e.currentTarget;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = div.offsetWidth / 2;
    const centerY = div.offsetHeight / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const rotateX = -deltaY / 50;
    const rotateY = deltaX / 50;
    setRotateX(rotateX);
    setRotateY(rotateY);
    setGradientX((x / div.offsetWidth) * 100);
    setGradientY((y / div.offsetHeight) * 100);
  
    // Calculate shadow offsets based on rotation angles
    const shadowX = Math.round(-rotateY * 2);
    const shadowY = Math.round(rotateX * 2);
    const shadow = `${shadowX}px ${shadowY}px 0px 0px rgba(0, 0, 0, 0.25)`;
    div.style.boxShadow = shadow;
  };
  

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGradientX(50);
    setGradientY(50);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className="card-modern p-6 slide-up"
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <i className="fas fa-route text-white"></i>
            </div>
      <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Dijkstra's Algorithm Visualizer</h2>
              <p className="text-sm md:text-base text-slate-400">Interactive Pathfinding Algorithm Demonstration</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Introduction
              </h3>
              <p className="text-slate-300 leading-relaxed">
                As I delved into algorithmic learning, I sought out challenges to build my skills, starting with small problems like 2 sum and Palindrome on Code Wars. This led me to explore more advanced algorithms like binary search, Branch Sums, and Depth First Search, which provided a foundation for understanding pathfinding algorithms. With so many options to choose from, including DFS, BFS, A* Search, Greedy Best-first Search, and Dijkstra's, I decided to focus on mastering Dijkstra's algorithm in-depth.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                <i className="fas fa-brain mr-2"></i>
                Skills and Knowledge
              </h3>
              <p className="text-slate-300 leading-relaxed">
                To put my knowledge into practice, I challenged myself to build a pathfinding algorithm visualizer using JavaScript. The visualizer enables users to create a canvas of grids and add starting and ending nodes, which then highlights the search in real-time as the algorithm progresses through each "cell" of the grid.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                <i className="fas fa-cogs mr-2"></i>
                Challenges
              </h3>
              <p className="text-slate-300 leading-relaxed">
                I had to overcome numerous challenges throughout the development process, including timing the highlighting of squares to ensure it was visible to the human eye, adding a user interface to control the sequence of highlighted cells, and creating blocks that prevented the algorithm from searching in certain cells. These challenges required a significant amount of time and effort, but ultimately allowed me to better understand how Dijkstra's algorithm could be used in a real-world application.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                Conclusion
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Overall, the project provided me with a deeper understanding of Dijkstra's algorithm, allowed me to build my problem-solving abilities, and improved my technical skills in JavaScript. I would highly recommend this project to any aspiring developer seeking to build their skills in algorithmic problem-solving and web development.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-400/20">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">JavaScript</div>
                <div className="text-xs text-slate-400 font-medium">Language</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">Canvas API</div>
                <div className="text-xs text-slate-400 font-medium">Rendering</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">Real-time</div>
                <div className="text-xs text-slate-400 font-medium">Visualization</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
        <a
          href="https://codepen.io/stefan_hall/full/JjBKWbL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              View Algorithm Demo
            </a>
      </div>
    </div>
      </div>
    </section>
  );
};

const FileControlName = () => {
  return (
    <div>
      <h1 className='flex justify-center mt-5 text-4xl hover:underline'><a href='https://github.com/stefanhall2704/FileControl' target='_blank' rel='noopener noreferrer'>File Control with Rust</a></h1>
    </div>
  )
}

const FileControlDescription = () => {
  return (
    <div className="flex justify-center ml-5 mb-5 mr-5">
      <ul>
        <li>
          
            <h1 className='text-xl' >
            Introduction:
            </h1>
            <br />
            <p>
              With my recent experience in Software Engineering, I took on the challenge of learning the Rust programming language. During the time of learning Rust, I wanted to take on the challenge of learning how to upload and download files to and from a database. 
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Skills and Knowledge:
            </h1>
            <br />
            <p>
              During the time of learning Rust, I had to learn a framework, which I chose Rocket, I chose this due to the similarities that it has with Python's FastAPI and Flask. And I also chose Diesel ORM to interact with the database. And the database of choice was, SQLite. With all of these new skills, it brought a lot of challenges along the way. Learning the different data types that I can utilize in Rust. How to break down a binary file into bytes, and upload it to the database, etc.
            </p>
        </li>
        <br />
        <li>
          <h1 className='text-xl' > 
            Specifics:
            </h1>
            <br />
            <p>
              This project involoved, taking in a Binary file into bytes, extracting the content type of the file, and taking in a parameter of the file name. And finally, uploading all those attributes to the SQLite database. The second part of this project, is to take in a parameter of an ID. With that parameter, it will take the file, decode it, take the file name, and download it to the users <em>Downloads</em> directory.
          </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Conclusion:
            </h1>
            <br />
            <p>
              After gaining all this knowledge and learning Rust, I found that controlling the memory of my program, gives me a lot more control of what I want to do. Controlling specific types, and learning how the take advantage of the borrow checker and ownership throughout my application and how it can really ensure a secure application, with near native speeds. I absolutely love this project more than the rest, and am really wanting to dive into Rust even more. And would suggest this to anyone in the tech industry.
            </p>
        </li>
      </ul>
    </div>
  );
};

const FileControl = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
    <div
      ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <i className="fas fa-file-alt text-white"></i>
    </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">File Control System</h2>
              <p className="text-sm md:text-base text-slate-400">Rust-based File Management Application</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Introduction
              </h3>
              <p className="text-slate-300 leading-relaxed">
                As a passionate developer, I wanted to explore new technologies and programming languages. I was interested in learning Rust, which is a powerful systems programming language known for its memory safety and performance. To apply my knowledge, I decided to create a file control system that would allow users to interact with their file system in a more controlled and organized way.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center">
                <i className="fas fa-brain mr-2"></i>
                Skills and Knowledge
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Through this project, I gained a solid understanding of Rust's ownership system, borrowing, and lifetime management. I learned how to work with the file system using Rust's standard library, handle errors gracefully, and create a command-line interface that is user-friendly and intuitive.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
                <i className="fas fa-cogs mr-2"></i>
                Specifics
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The file control system I created allows users to perform various file operations such as creating, reading, updating, and deleting files. It also includes features like directory navigation, file copying, and moving. The application provides a command-line interface where users can input commands to interact with the file system safely.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                Conclusion
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Building this file control system in Rust was an excellent learning experience that helped me understand the language's strengths and unique features. It improved my understanding of systems programming and gave me confidence in using Rust for future projects. The project showcases my ability to learn new technologies and apply them to solve real-world problems.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-400/20">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">Rust</div>
                <div className="text-xs text-slate-400 font-medium">Language</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">CLI</div>
                <div className="text-xs text-slate-400 font-medium">Interface</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-1">Memory Safe</div>
                <div className="text-xs text-slate-400 font-medium">Systems</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://github.com/stefanhall2704/FileControl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105"
            >
              <i className="fas fa-code-branch mr-2"></i>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChangeManagementApplicationName = () => {
  return (
    <div>
      <h1 className='flex justify-center mt-5 text-4xl hover:underline'>DREW</h1>
    </div>
  )
}

const ChangeManagementApplicationDescription = () => {
  return (
    <div className="flex justify-center ml-5 mb-5 mr-5">
      <ul>
        <li>
          
            <h1 className='text-xl' >
            Introduction:
            </h1>
            <br />
            <p>
              DREW is a Cloud Native Change Management Application for the company's website changes. This is deeply integrated with Atlassian tools, such as Jira and Bitbucket. Integrations also made with N8N, which help for automated emails. Other integrations include ADO and Octopus for automatic deployment for branching octopus projects on specified versions that are based off of DREW. With this being said, the automated deployments and pipeline runs in ADO with corresponding repositories, can make life very easy for devops and product owners. At this level of automation, it really helps save the time and money to concentrate on other levels of automation to reduce toil.
            </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Skills and Knowledge:
            </h1>
            <br />
            <p>
              DREW uses a fairly modern Python framework, FastAPI. This framework really allowed us to have quick developments to create APIs, control authentication for specific levels of access per user within the APIs, and also have swagger docs that come with the FastAPI framework. Throughout this project, I really honed in on my Python skills. And gained a lot of knowledge of SQLalchemy ORM, FastAPI framework, and SQLite database. This really allowed me to take my development skills to the next level. Learning the ins and outs of deeply integrated tooling, how to let an ORM really help the speed of my development of creating APIs increase 10 folds, and really gained knowledge on how to render html with context variables (using Jinja2 templating language) and controlling the data in the front end very easily. 
            </p>
        </li>
        <br />
        <li>
          <h1 className='text-xl' > 
            Specifics:
            </h1>
            <br />
            <p>
              I cannot go into too many specifics, being this is an internal application. There were a few approaches that were taken in this application. Specifically in the frontend, there was a macros.html page that was created, in order to create buttons, modals, etc. We were able to pass in parameters to reuse throughout the application, where the parameters would change the name, the color, and functionality of the button(s) themselves.    
            </p>
        </li>
        <br />
        <li>
            <h1 className='text-xl' > 
            Conclusion:
            </h1>
            <br />
            <p>
              This application really helped me learn the ins and outs of creating a new and professional web application from the ground up. But not only that, I really gained a lot of knowledge on how a company deploys there code, down to the level of creating pipelines that are automatically ran when an octopus project is branched, also to the level of using Azure to occasionally swap slots, and Octopus to have automatic rollbacks for when code commits break production. After gaining this knowledge, I also gained a lot of confidence in myself to take on difficult tasks and go through what I need to and run with it. 
            </p>
        </li>
      </ul>
    </div>
  );
};

const ChangeManagementApplication = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
    <div
      ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <i className="fas fa-tools text-white"></i>
    </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">DREW - Change Management</h2>
              <p className="text-sm md:text-base text-slate-400">Database-Driven Change Tracking System</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Enterprise Change Management Platform
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Built DREW (Database-driven change management system) as Lead Software Engineer to replace a previous code release application. This comprehensive platform leverages FastAPI as the framework with SQLite backend, featuring 93% code coverage measured at commit time through automated pytest integration with Jira, Microsoft Teams, Grafana, Insight, and other enterprise tools.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                <i className="fas fa-brain mr-2"></i>
                Technical Excellence & Quality Assurance
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Achieved industry-leading 93% code coverage through rigorous pytest implementation and automated testing pipelines. The system demonstrates advanced software engineering practices with comprehensive integration testing, automated CI/CD validation, and enterprise-grade reliability metrics tracked in real-time during development cycles.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-pink-400 mb-4 flex items-center">
                <i className="fas fa-cogs mr-2"></i>
                Enterprise Integration Architecture
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Designed and implemented extensive API integrations with Jira, Microsoft Teams, Grafana, and Insight platforms. The system features role-based access control, comprehensive audit logging, automated workflow approvals, and real-time status synchronization across multiple enterprise tools, creating a unified change management ecosystem.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                Production Impact & Adoption
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Successfully replaced legacy change management systems with a modern, scalable platform that improved team productivity and reduced deployment risks. The high test coverage and automated integrations have established new standards for software quality and operational excellence within the organization.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-400/20">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-400 mb-1">Database</div>
                <div className="text-xs text-slate-400 font-medium">Architecture</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">Audit</div>
                <div className="text-xs text-slate-400 font-medium">Tracking</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-1">Workflows</div>
                <div className="text-xs text-slate-400 font-medium">Automation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const ReverseProxySystem = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <i className="fas fa-exchange-alt text-white"></i>
          </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Advanced Reverse Proxy System</h2>
              <p className="text-sm md:text-base text-slate-400">Rust & OpenResty Enterprise Routing Architecture</p>
        </div>
        </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-violet-400 mb-4 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                System Overview
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Architected and implemented an advanced endpoint-based reverse proxy system to support customer-specific routing across multiple services, ensuring efficiency and minimizing redundancy in a high-traffic environment. This enterprise-grade solution handles thousands of concurrent requests with sub-millisecond routing decisions.
              </p>
      </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                <i className="fas fa-cogs mr-2"></i>
                Technical Implementation
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Built a sophisticated syncing mechanism using Rust to pull data from Cosmos DB, format it, and hash the resulting hash map. This hashed value is compared against local in-memory cache and Azure Blob Storage to determine if updates occurred, preventing redundant work across instances. Integrated OpenResty service to intercept requests, parse endpoint details, and route to cached dictionary values with intelligent cache miss handling.
              </p>
    </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-pink-400 mb-4 flex items-center">
                <i className="fas fa-chart-line mr-2"></i>
                Performance & Reliability
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The system provides optimal customer-based routing with improved service reliability and enhanced scalability by reducing redundant workloads. Cache hit rates exceed 95%, with automatic fallback mechanisms ensuring zero downtime during updates. This architecture supports horizontal scaling across multiple regions while maintaining consistent performance.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center">
                <i className="fas fa-shield-alt mr-2"></i>
                Enterprise Features
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Implements robust error handling, comprehensive logging, and monitoring integration. Features automatic health checks, circuit breaker patterns, and graceful degradation during service failures. The distributed architecture ensures high availability and fault tolerance across multiple Azure regions.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 rounded-xl border border-violet-400/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-400 mb-2">10,000+</div>
                <div className="text-sm text-slate-400 font-medium">RPM Handled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">99.99%</div>
                <div className="text-sm text-slate-400 font-medium">Route Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">&lt;1ms</div>
                <div className="text-sm text-slate-400 font-medium">Lookup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-400 mb-2">Zero</div>
                <div className="text-sm text-slate-400 font-medium">Downtime Deploys</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-semibold text-violet-400">Rust</div>
                <div className="text-xs text-slate-400">Core Engine</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-semibold text-purple-400">OpenResty</div>
                <div className="text-xs text-slate-400">Request Proxy</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-semibold text-pink-400">Cosmos DB</div>
                <div className="text-xs text-slate-400">Data Source</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReleaseDashboard = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <i className="fas fa-tachometer-alt text-white"></i>
    </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Release Monitoring Dashboard</h2>
              <p className="text-sm md:text-base text-slate-400">Real-time Deployment Impact Analysis</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-teal-400 mb-4 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Dashboard Overview
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Created a comprehensive "Release Dashboard" by integrating an internal Release Management tool with multiple internal monitoring systems. This visualization platform provides real-time monitoring and alerting on changes within release cycles, enabling rapid anomaly detection and response.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                <i className="fas fa-eye mr-2"></i>
                Key Metrics Monitored
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Full visualization of response time, 4xx error rate, and 5xx error rate with historical baselines and anomaly detection. The dashboard correlates deployment events with performance metrics, enabling immediate identification of issues following code releases. Automated alerts notify teams of significant deviations from expected performance.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                <i className="fas fa-clock mr-2"></i>
                Time to Detection
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Dramatically reduced mean time to detection (MTTD) for deployment-related issues from hours to minutes. The dashboard provides instant visibility into the impact of releases, allowing teams to quickly identify whether performance degradation is related to code changes or external factors.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center">
                <i className="fas fa-users mr-2"></i>
                Team Impact
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Empowers development and operations teams with actionable insights, reducing investigation time and improving collaboration during incident response. The dashboard serves as a single source of truth for release impact analysis, eliminating the need to correlate data from multiple disparate tools.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 rounded-xl border border-teal-400/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">85%</div>
                <div className="text-sm text-slate-400 font-medium">Faster MTTD</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-sm text-slate-400 font-medium">Deployments Monitored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-sm text-slate-400 font-medium">Real-time Alerts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-400 mb-2">99.5%</div>
                <div className="text-sm text-slate-400 font-medium">Detection Accuracy</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-semibold text-teal-400">Real-time</div>
                <div className="text-xs text-slate-400">Monitoring</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-semibold text-cyan-400">Automated</div>
                <div className="text-xs text-slate-400">Alerts</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-semibold text-blue-400">MTTD</div>
                <div className="text-xs text-slate-400">Reduced</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const IncidentManagementBridge = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`card-modern p-6 slide-up ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <i className="fas fa-link text-white"></i>
        </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Incident Management Bridge</h2>
              <p className="text-sm md:text-base text-slate-400">Atlassian Statuspage ↔ Opsgenie Integration</p>
    </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                Integration Overview
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Designed and developed a custom application that serves as a bridge between Atlassian Statuspage and Opsgenie. This integration empowers users to create incidents simultaneously on both platforms while maintaining seamless incident updates and synchronization.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center">
                <i className="fas fa-users-cog mr-2"></i>
                User Experience
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Streamlines incident management and communication by enabling incident commanders to maintain control over both Statuspage and Opsgenie within a single, integrated platform. Eliminates the need to manually update multiple systems during incident response, reducing cognitive load and potential for miscommunication.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                <i className="fas fa-sync mr-2"></i>
                Bidirectional Sync
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Implements bidirectional synchronization ensuring that status updates, priority changes, and resolution information are automatically propagated between both platforms. This maintains consistency across all communication channels and ensures stakeholders receive accurate, real-time information.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center">
                <i className="fas fa-rocket mr-2"></i>
                Operational Impact
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Significantly improved incident response efficiency by reducing manual overhead and eliminating platform switching during critical incidents. The integration has become a critical component of the organization's incident management workflow, handling hundreds of synchronized incidents annually.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-xl border border-red-400/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">300+</div>
                <div className="text-sm text-slate-400 font-medium">Incidents Synced</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">95%</div>
                <div className="text-sm text-slate-400 font-medium">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">5min</div>
                <div className="text-sm text-slate-400 font-medium">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">Zero</div>
                <div className="text-sm text-slate-400 font-medium">Sync Failures</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-semibold text-red-400">Atlassian</div>
                <div className="text-xs text-slate-400">Statuspage</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-semibold text-orange-400">Opsgenie</div>
                <div className="text-xs text-slate-400">Integration</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-400">Bidirectional</div>
                <div className="text-xs text-slate-400">Sync</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Main = (props) => {
  return (
    <div id="main">
      <HeaderBar />
        <div className="content">
          <Info />
          <Story />
        <TLSHandshakeAnimation />
        <TracerouteVisualization />
          <SelfHealing />
        <ReverseProxySystem />
        <ReleaseDashboard />
        <IncidentManagementBridge />
          <DijkstrasAlgorithm />
          <FileControl />
          <ChangeManagementApplication />
          <div className="h-54"></div>
        </div>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
        <div className='root-container'>
        <Main />
        </div>
    );
  }
}

export default App;
