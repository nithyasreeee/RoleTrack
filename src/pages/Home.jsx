import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const features = [
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Track team performance with live dashboards and detailed reports",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "✅",
      title: "Activity Management",
      description: "Efficient approval workflows for managers with instant notifications",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "👥",
      title: "Employee Directory",
      description: "Centralized team information with real-time status updates",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "🔒",
      title: "Secure & Compliant",
      description: "Enterprise-grade security with role-based access control",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "Access from anywhere with our responsive design",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance for seamless user experience",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your account and set up your organization in minutes",
      icon: "🚀"
    },
    {
      number: "02",
      title: "Add Team",
      description: "Invite your team members and assign roles effortlessly",
      icon: "👥"
    },
    {
      number: "03",
      title: "Track Progress",
      description: "Monitor activities, approve requests, and analyze performance",
      icon: "📈"
    }
  ];

  const pricing = [
    {
      name: "Starter",
      price: "29",
      period: "month",
      description: "Perfect for small teams",
      features: ["Up to 10 employees", "Basic analytics", "Email support", "1 admin account"],
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      price: "79",
      period: "month",
      description: "For growing businesses",
      features: ["Up to 50 employees", "Advanced analytics", "Priority support", "5 admin accounts", "Custom workflows"],
      popular: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Enterprise",
      price: "199",
      period: "month",
      description: "For large organizations",
      features: ["Unlimited employees", "Full analytics suite", "24/7 support", "Unlimited admins", "Custom integration", "Dedicated manager"],
      popular: false,
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Manager",
      company: "TechCorp Inc.",
      avatar: "SJ",
      text: "RoleTrack transformed how we manage our team. The analytics are incredible!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      company: "Global Solutions",
      avatar: "MC",
      text: "Best investment we made this year. Our productivity increased by 40%.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "CEO",
      company: "StartupX",
      avatar: "ER",
      text: "Simple, powerful, and exactly what we needed. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-800 dark:from-gray-950 dark:via-indigo-950 dark:to-slate-900">
        {/* Animated Background with Starfield & Astro objects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="astro-stars absolute inset-0 opacity-60"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-indigo-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-sky-400/20 to-cyan-800/10 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-br from-indigo-700/20 to-sky-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
          
          {/* Floating Geometric Shapes (astro colors) */}
          <div className="absolute top-20 left-10 w-20 h-20 border-4 border-cyan-400/20 rounded-lg animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border-4 border-sky-400/20 rotate-45 animate-float animation-delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-br from-cyan-400/10 to-indigo-700/10 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-60 right-1/4 w-24 h-24 border-4 border-cyan-500/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-gradient-to-tr from-indigo-700/10 to-sky-400/10 rotate-12 animate-float animation-delay-3000"></div>
          
          {/* Animated Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-flow"></div>

          {/* Planet images */}
          <img src={planet1} alt="planet" className="astro-planet planet-1 absolute right-8 top-8 w-40 h-40 opacity-90 pointer-events-none animate-orbit animation-delay-2000" />
          <img src={planet2} alt="planet-2" className="astro-planet planet-2 absolute left-8 bottom-24 w-32 h-32 opacity-90 pointer-events-none animate-orbit animation-delay-3500" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade">
            <div className="inline-flex items-center space-x-2 bg-slate-800/40 px-4 py-2 rounded-full mb-8 animate-bounce-subtle backdrop-blur-sm">
              <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-cyan-200">New: Advanced Astro Analytics</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-200 bg-opacity-80">
                Modern Employee
              </span>
              <br />
              <span className="text-cyan-100">Management System</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-cyan-200/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Streamline your workforce operations with powerful tools for activity tracking, team management, and performance monitoring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/")}
                className="group relative px-8 py-4 bg-gradient-to-r from-slate-800 via-sky-600 to-cyan-400 text-white font-bold rounded-2xl transition-all shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-105 text-lg overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <a
                href="#how-it-works"
                className="group px-8 py-4 bg-slate-800/60 text-cyan-100 font-bold rounded-2xl hover:bg-slate-800/70 transition-all shadow-lg border border-slate-700 transform hover:scale-105 text-lg relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Watch Demo
                  <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
                { value: "4.9/5", label: "Rating" }
              ].map((stat, i) => (
                <div key={i} className="text-center animate-slide" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-tr from-pink-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-6 flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h2 className="text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage your team effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 animate-slide-up cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Decorative corner gradient */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`}></div>
                
                <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="relative text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                  {feature.title}
                </h3>
                <p className="relative text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-950 dark:to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade">
            <h2 className="text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Animated Connecting Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -translate-y-1/2 opacity-20">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-shimmer-line"></div>
            </div>
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -translate-y-1/2 opacity-40 animate-pulse"></div>

            {steps.map((step, i) => (
              <div
                key={i}
                className="relative text-center animate-fade-up"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="relative inline-block mb-6 group">
                  {/* Rotating ring */}
                  <div className="absolute inset-0 w-28 h-28 -translate-x-2 -translate-y-2 border-4 border-dashed border-indigo-500/30 rounded-full animate-spin-slow"></div>
                  
                  <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 transition-transform duration-300 z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 rounded-full animate-pulse opacity-50"></div>
                    <span className="relative z-10">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg animate-bounce-subtle z-20">
                    {step.number}
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute -top-4 -left-4 w-3 h-3 bg-indigo-500 rounded-full animate-ping opacity-50"></div>
                  <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-purple-500 rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }}></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade">
            <h2 className="text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, i) => (
              <div
                key={i}
                className={`group relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 animate-fade-up ${
                  plan.popular
                    ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl shadow-purple-500/50 scale-105'
                    : 'bg-white dark:bg-gray-800 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 dark:hover:border-purple-500/50'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
                
                {/* Animated glow */}
                {plan.popular && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-slow"></div>
                )}
                
                <div className="relative z-10">
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-subtle flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className={`text-3xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {plan.name}
                    </h3>
                  <p className={`text-sm ${plan.popular ? 'text-purple-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    {plan.description}
                  </p>
                  <div className="mt-6">
                    <span className={`text-5xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-purple-100' : 'text-gray-600 dark:text-gray-400'}`}>
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <svg className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.popular ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => { setSelectedPlan(plan.name); navigate("/"); }}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    plan.popular
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                  } shadow-lg hover:shadow-2xl`}
                >
                  Get Started
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-950 dark:to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade">
            <h2 className="text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                What Our Clients Say
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-up border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating quote icon */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-12 opacity-10 group-hover:opacity-20 group-hover:rotate-6 transition-all duration-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <svg key={idx} className="w-5 h-5 text-yellow-400 animate-star-twinkle" fill="currentColor" viewBox="0 0 20 20" style={{ animationDelay: `${idx * 100}ms` }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-flow"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-pink-300/10 rounded-full blur-2xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/4 w-36 h-36 bg-purple-300/10 rounded-full blur-2xl animate-float animation-delay-1000"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-300/10 rounded-full blur-2xl animate-float animation-delay-3000"></div>
        </div>
        
        {/* Geometric shapes */}
        <div className="absolute top-10 right-1/4 w-16 h-16 border-2 border-white/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-10 left-1/4 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-up">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-white rounded-full border-2 border-purple-600 flex items-center justify-center text-xs font-bold text-purple-600">
                    {['J','S','M','E'][i-1]}
                  </div>
                ))}
              </div>
              <span className="text-white font-semibold">Join 10,000+ users</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate-text-shimmer bg-clip-text">
            Ready to Transform Your Team?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Start your free 14-day trial today. No credit card required.
          </p>
          <button
            onClick={() => navigate("/")}
            className="group px-10 py-5 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105 text-lg relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            <span className="relative z-10 flex items-center gap-2 justify-center">
              Start Free Trial Now
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">RoleTrack</span>
              </div>
              <p className="text-gray-400 text-sm">
                Modern employee management for modern teams.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap"]
              },
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Press"]
              },
              {
                title: "Support",
                links: ["Help Center", "Documentation", "API", "Contact"]
              }
            ].map((section, i) => (
              <div key={i}>
                <h3 className="font-bold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 RoleTrack. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
