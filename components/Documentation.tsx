
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 prose prose-slate">
        <h1 className="text-3xl font-extrabold text-sdg-5 border-b-2 border-sdg-5 pb-4 mb-8">Capstone Project Documentation</h1>
        
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">1. Problem Statement</h2>
          <p className="text-gray-600 leading-relaxed">
            Despite global efforts, gender bias remains deeply embedded in digital communication, recruitment processes, and online social spaces. Unconscious bias in job descriptions prevents diverse talent from applying, while gender-based harassment creates unsafe digital environments that discourage participation from women and marginalized genders.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">2. SDG Alignment</h2>
          <div className="bg-sdg-5/10 border-l-4 border-sdg-5 p-4 rounded-r-lg">
            <h3 className="text-sdg-5 font-bold m-0">SDG 5: Gender Equality</h3>
            <p className="text-gray-700 mt-2 mb-0 font-medium">
              Target 5.B: Enhance the use of enabling technology, in particular information and communications technology, to promote the empowerment of women.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">3. AI Solution & Architecture</h2>
          <p className="text-gray-600">
            EquiGuard AI utilizes the Google Gemini Large Language Model to power three distinct modules:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li><strong>Gender Bias Checker:</strong> Analyzes text using NLP to identify male/female coded language.</li>
            <li><strong>Harassment Guard:</strong> Evaluates sentiment and intent to flag toxic content.</li>
            <li><strong>Safety Agent:</strong> An agentic chatbot providing 24/7 support and educational resources.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">4. Tools & Technologies</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="font-bold block mb-1">AI Model</span>
              <span className="text-sm text-gray-600">Gemini 3 Flash & Pro</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="font-bold block mb-1">Frontend</span>
              <span className="text-sm text-gray-600">React, TypeScript, Tailwind</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="font-bold block mb-1">Agent Workflow</span>
              <span className="text-sm text-gray-600">Google GenAI SDK</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="font-bold block mb-1">Impact Goal</span>
              <span className="text-sm text-gray-600">UN SDG 5 Awareness</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">5. Expected Outcomes</h2>
          <p className="text-gray-600">
            Reduced implicit bias in recruitment cycles, safer online discourse, and higher awareness of gender rights through interactive AI-led education.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
