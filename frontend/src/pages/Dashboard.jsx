import { Link } from "react-router-dom";

export default function Dashboard() {
  const cards = [
    {
      title: "Profile Status",
      desc: "Maintenance and identity verification",
      link: "/student/profile",
      linkText: "Edit Profile →",
      icon: "👤",
      color: "from-blue-500 to-indigo-600",
      accent: "text-blue-400"
    },
    {
      title: "Skill Analysis",
      desc: "AI-driven internship matching",
      link: "/student/recommend",
      linkText: "View Matches →",
      icon: "✨",
      color: "from-purple-500 to-fuchsia-600",
      accent: "text-purple-400"
    },
    {
      title: "Explore Hub",
      desc: "Discover live industry projects",
      link: "/projects",
      linkText: "Browse All →",
      icon: "🚀",
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
          Welcome back, Learner <span className="animate-bounce">🎓</span>
        </h1>
        <p className="text-slate-400 font-medium">Your personalized hub for career growth and skill verification.</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:border-slate-700 transition-all duration-500 hover:translate-y-[-8px] shadow-2xl shadow-black/20"
          >
            {/* Background Glow */}
            <div className={`absolute -top-px -left-px w-20 h-20 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 rounded-tl-3xl transition-opacity duration-500`} />

            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-3xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{card.desc}</p>

              <Link
                to={card.link}
                className={`inline-flex items-center font-bold uppercase tracking-widest text-[10px] ${card.accent} hover:brightness-125 transition-all`}
              >
                {card.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Visual Element */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/10 backdrop-blur-sm flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold">Certification Track</h4>
          <p className="text-sm text-slate-500 mt-1">Unlock verified badges by completing project milestones.</p>
        </div>
        <div className="h-2 w-48 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-blue-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
