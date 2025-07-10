export default function Home() {
    return (
        <div className="flex w-full">
            {/* Pearl Mist Background with Top Glow */}
            <div
                className="absolute inset-0 z-[-1]"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
                }}
            />
            {/* Your Content/Components */}
            <section className="w-[95%] text-center relative overflow-hidden flex flex-col items-center justify-center max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center mt-8">
                    <a
                        href="https://github.com/picozzimichele/statusagi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                    >
                        <span
                            data-slot="badge"
                            className="inline-flex items-center justify-center font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden [a&amp;]:hover:bg-secondary/90 gap-2 py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border bg-black/40 border-white/20 text-white hover:bg-black/50"
                        >
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </div>
                            <span className="font-medium">5+ New Indicators</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-zap h-3 w-3 text-orange-500"
                                aria-hidden="true"
                            >
                                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                            </svg>
                            <span className="hidden sm:inline-flex items-center">Read More</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-arrow-right h-3 w-3"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </span>
                    </a>
                </div>
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-1 sm:mb-3">
                        <span className="font-medium transition-colors duration-300 text-white">
                            Real World Statistics
                        </span>
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r bg-[200%_auto] bg-clip-text leading-tight text-transparent transition-all duration-300 from-neutral-100 via-slate-400 to-neutral-400">
                            At your fingertips
                        </span>
                    </h2>
                </div>
                <p className="text-sm md:text-lg mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed transition-colors duration-300 px-4 sm:px-0 text-gray-200">
                    Professional-Grade Insights & Global Trends - Made Clear.
                    <span className="block">
                        Make Smarter Investment and Research Decisions with Clarity and Confidence.
                    </span>
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-10 sm:mb-14 max-w-4xl mx-auto px-4 sm:px-0">
                    <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 border w-full sm:w-auto bg-black/30 border-white/10 hover:bg-black/40">
                        <div className="p-2 rounded-lg transition-colors duration-300 bg-violet-500/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-copy h-4 sm:h-5 w-4 sm:w-5 transition-colors duration-300 text-violet-300"
                                aria-hidden="true"
                            >
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                            </svg>
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-sm transition-colors duration-300 text-white">
                                One-Click Share
                            </h3>
                            <p className="text-xs transition-colors duration-300 text-gray-300">
                                Ready-to-use data
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300 border w-full sm:w-auto bg-black/30 border-white/10 hover:bg-black/40">
                        <div className="p-2 rounded-lg transition-colors duration-300 bg-pink-500/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-eye h-4 sm:h-5 w-4 sm:w-5 transition-colors duration-300 text-pink-300"
                                aria-hidden="true"
                            >
                                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-sm transition-colors duration-300 text-white">
                                Live Graphs
                            </h3>
                            <p className="text-xs transition-colors duration-300 text-gray-300">
                                See data in action
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                    <button
                        data-slot="button"
                        className="inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 rounded-md has-[&gt;svg]:px-4 cursor-pointer gap-2 px-4 sm:px-8 py-3 text-sm sm:text-base font-medium shadow-lg transition-all duration-300 flex-1 sm:flex-none bg-white text-black hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-github h-4 sm:h-5 w-4 sm:w-5"
                            aria-hidden="true"
                        >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                            <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                        Contribute Here!
                    </button>
                    <button
                        data-slot="button"
                        className="inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 rounded-md has-[&gt;svg]:px-4 cursor-pointer gap-2 px-4 sm:px-8 py-3 text-sm sm:text-base font-medium shadow-lg transition-all duration-300 flex-1 sm:flex-none bg-slate-950 text-white hover:bg-slate-900"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-code-xml h-4 sm:h-5 w-4 sm:w-5"
                            aria-hidden="true"
                        >
                            <path d="m18 16 4-4-4-4"></path>
                            <path d="m6 8-4 4 4 4"></path>
                            <path d="m14.5 4-5 16"></path>
                        </svg>
                        Browse Statistics
                    </button>
                </div>
                <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 mt-12 sm:mt-16 md:mt-18 pt-6 sm:pt-8 border-t transition-all duration-300 border-white/20">
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold transition-colors duration-300 text-white">
                            100+
                        </div>
                        <div className="text-xs sm:text-sm transition-colors duration-300 text-gray-300">
                            Countries
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold transition-colors duration-300 text-white">
                            100%
                        </div>
                        <div className="text-xs sm:text-sm transition-colors duration-300 text-gray-300">
                            Human Curated
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold transition-colors duration-300 text-white">
                            Real
                        </div>
                        <div className="text-xs sm:text-sm transition-colors duration-300 text-gray-300">
                            Data
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
