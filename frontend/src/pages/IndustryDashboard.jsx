import { Link } from "react-router-dom";

export default function IndustryDashboard() {
  const cards = [
    {
      title: "Post Projects",
      desc: "Create and manage internship & capstone projects",
      link: "/industry/project",
      linkText: "Create →",
      icon: "📝",
      color: "from-blue-500 to-indigo-600",
      accent: "text-blue-400"
    },
    {
      title: "Talent Pool",
      desc: "Search and recruit skilled student candidates",
      link: "/industry/students",
      linkText: "Search →",
      icon: "🔍",
      color: "from-purple-500 to-purple-600",
      accent: "text-purple-400"
    },
    {
      title: "Manage Brand",
      desc: "Update company info and visible profile",
      link: "/industry/profile",
      linkText: "Edit →",
      icon: "🏢",
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400"
    },
    {
      title: "Ecosystem",
      desc: "View other industry partners in the network",
      link: "/industry/companies",
      linkText: "Explore →",
      icon: "🌐",
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
          Industry Dashboard <span className="text-3xl">🏢</span>
        </h1>
        <p className="text-slate-400 font-medium">Control center for recruitment, project management, and corporate identity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="group relative p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm hover:border-slate-700 transition-all duration-500 hover:translate-y-[-4px] shadow-xl overflow-hidden"
          >
            <div className={`absolute -top-px -left-px w-16 h-16 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 rounded-tl-3xl transition-opacity`} />

            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>

              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">{card.desc}</p>

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

      <div className="p-1 gap-6 grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold">Total Applicants</h4>
            <p className="text-3xl font-black mt-1 text-emerald-400">124</p>
          </div>
          <div className="text-4xl opacity-20">📈</div>
        </div>
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold">Active Projects</h4>
            <p className="text-3xl font-black mt-1 text-blue-400">8</p>
          </div>
          <div className="text-4xl opacity-20">📁</div>
        </div>
      </div>
    </div>
  );
}
