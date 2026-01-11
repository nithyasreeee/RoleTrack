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
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-8 animate-bounce-subtle">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">New: Advanced Analytics Dashboard</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Modern Employee
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Management System</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Streamline your workforce operations with powerful tools for activity tracking, team management, and performance monitoring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 text-lg"
              >
                Start Free Trial
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-xl border-2 border-gray-200 dark:border-gray-700 transform hover:scale-105 text-lg"
              >
                Watch Demo
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
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade">
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
                className="group p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 animate-slide cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 -translate-y-1/2 opacity-20"></div>

            {steps.map((step, i) => (
              <div
                key={i}
                className="relative text-center animate-slide"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-4xl shadow-2xl animate-pulse relative z-10">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step.number}
                  </div>
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
                className={`relative p-8 rounded-3xl transition-all duration-300 hover:scale-105 animate-slide ${
                  plan.popular
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl shadow-purple-500/50 scale-105'
                    : 'bg-white dark:bg-gray-800 shadow-xl border-2 border-gray-200 dark:border-gray-700'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
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
                className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide border border-gray-200 dark:border-gray-700"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <svg key={idx} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Ready to Transform Your Team?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Start your free 14-day trial today. No credit card required.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-10 py-5 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105 text-lg"
          >
            Start Free Trial Now
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
