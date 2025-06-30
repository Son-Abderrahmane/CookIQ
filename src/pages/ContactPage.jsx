import GithubIcon from "../assets/icons/github-icon.png";
import LinkedinIcon from "../assets/icons/linkedin-icon.png";
import { useState } from "react";

function ContactPage() {
    const [isEmailHovered, setIsEmailHovered] = useState(false);
    const [isGithubHovered, setIsGithubHovered] = useState(false);
    const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90 -z-10" />
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Contact Us
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-12 text-center max-w-2xl">
                Have a question, suggestion, or just want to say hello? Reach out to us!
            </p>
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center items-center">
                {/* Email */}
                <a
                    href="mailto:abderrahmanmlih9@gmail.com"
                    className={`flex flex-col items-center bg-gray-900 rounded-2xl shadow-lg p-8 w-full md:w-72 transition-transform duration-300 hover:scale-105 border border-gray-800 hover:border-blue-500 group ${isEmailHovered ? 'ring-2 ring-blue-500' : ''}`}
                    onMouseEnter={() => setIsEmailHovered(true)}
                    onMouseLeave={() => setIsEmailHovered(false)}
                >
                    <div className="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v5a2 2 0 002 2h14a2 2 0 002-2v-5m-18 0l2.617-1.745A2 2 0 017.55 9m8.9 0a2 2 0 011.333 1.995L21 12m-3 0a2 2 0 00-2 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 00-2-2z" />
                        </svg>
                    </div>
                    <span className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">Email Us</span>
                    <span className="text-gray-400 text-sm">abderrahmanmlih9@gmail.com</span>
                </a>
                {/* GitHub */}
                <a
                    href="https://github.com/Son-Abderrahmane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center bg-gray-900 rounded-2xl shadow-lg p-8 w-full md:w-72 transition-transform duration-300 hover:scale-105 border border-gray-800 hover:border-blue-500 group ${isGithubHovered ? 'ring-2 ring-blue-500' : ''}`}
                    onMouseEnter={() => setIsGithubHovered(true)}
                    onMouseLeave={() => setIsGithubHovered(false)}
                >
                    <div className="mb-4">
                        <img src={GithubIcon} alt="GitHub" className="h-12 w-12 object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">GitHub</span>
                    <span className="text-gray-400 text-sm">See what I'm building</span>
                </a>
                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/abderrahmane-mlih/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center bg-gray-900 rounded-2xl shadow-lg p-8 w-full md:w-72 transition-transform duration-300 hover:scale-105 border border-gray-800 hover:border-blue-500 group ${isLinkedinHovered ? 'ring-2 ring-blue-500' : ''}`}
                    onMouseEnter={() => setIsLinkedinHovered(true)}
                    onMouseLeave={() => setIsLinkedinHovered(false)}
                >
                    <div className="mb-4">
                        <img src={LinkedinIcon} alt="LinkedIn" className="h-12 w-12 object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">LinkedIn</span>
                    <span className="text-gray-400 text-sm">Connect with me</span>
                </a>
            </div>
        </div>
    );
}

export default ContactPage;