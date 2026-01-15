import React, { useState } from 'react';
import { FormData, SubmitterType } from '../types';

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    submitterType: 'Individual',
    name: '',
    idType: '',
    idNumber: '',
    email: '',
    phone: '',
    mailingAddress: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const uniqueId = Math.floor(Math.random() * 100000000);

    // Format phone number
    const digitsOnly = formData.phone.replace(/\D/g, '');
    let formattedPhone = digitsOnly;
    if (digitsOnly.length > 0) {
      if (!digitsOnly.startsWith('60')) {
        if (digitsOnly.startsWith('0')) {
          formattedPhone = '60' + digitsOnly.substring(1);
        } else {
          formattedPhone = '60' + digitsOnly;
        }
      }
    }

    const apiPayload = {
      id: uniqueId,
      timestamp: new Date().toISOString(),
      data: {
        SubmitBy: formData.submitterType,
        Name: formData.name,
        IDType: formData.idType,
        IDNo: formData.idNumber,
        Email: formData.email,
        ContactNo: formattedPhone,
        Address: formData.mailingAddress,
        Description: formData.description
      }
    };

    try {
      /**
       * Note for Developer: 
       * 'Failed to fetch' usually means the server didn't respond with CORS headers or the test webhook is not active.
       * We use 'application/json' to ensure n8n parses the body as a JSON object.
       */
      const response = await fetch('https://lwk888.app.n8n.cloud/webhook/case-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Detailed Submission Error:", error);

      let errorMessage = "Submission failed.";

      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = "Network Error: 'Failed to fetch'.\n\nThis is likely a CORS issue or the n8n webhook is not 'Listening'.\n\nTips:\n1. Open your n8n workflow and click 'Listen for Test Event'.\n2. Ensure your n8n instance has CORS allowed for this domain.\n3. Verify your internet connection.";
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-12 bg-white p-12 rounded-2xl shadow-xl border border-blue-50">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-800">Terima Kasih! / Thank You!</h2>
            <p className="text-slate-600 text-lg">
              Maklum balas anda telah berjaya dihantar. <br />
              Your feedback has been successfully submitted.
            </p>
          </div>
          <div className="w-full h-px bg-slate-100 my-4"></div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-10 py-3 bg-[#1e3a5f] text-white rounded-full font-bold hover:bg-[#152a45] transition-all shadow-lg active:scale-95"
          >
            Hantar Baru / Submit New
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-center text-4xl font-bold text-[#1e3a5f] mb-12">Voice of Customer</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 items-start">
          <div className="pt-2">
            <label className="text-sm font-medium text-slate-600">
              Penghantaran Oleh / <br /> Submission By <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="submitterType"
                checked={formData.submitterType === 'Individual'}
                onChange={() => handleRadioChange('submitterType', 'Individual')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">Individu / Individual</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="submitterType"
                checked={formData.submitterType === 'Organization'}
                onChange={() => handleRadioChange('submitterType', 'Organization')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">Organisasi / Organization</span>
            </label>
          </div>

          <div className="pt-2"><label className="text-sm font-medium text-slate-600">Nama / Name <span className="text-red-500">*</span></label></div>
          <input required name="name" placeholder="Full name as per ID" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />

          <div className="pt-2"><label className="text-sm font-medium text-slate-600">Jenis ID / ID Type <span className="text-red-500">*</span></label></div>
          <select required name="idType" value={formData.idType} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl border border-gray-300 outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")` }}>
            <option value="">Select</option>
            <option value="MyKad">MyKad</option>
            <option value="Passport">Passport</option>
          </select>

          <div className="pt-2"><label className="text-sm font-medium text-slate-600">ID Number <span className="text-red-500">*</span></label></div>
          <input required name="idNumber" value={formData.idNumber} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />

          <div className="pt-2"><label className="text-sm font-medium text-slate-600">Email Address <span className="text-red-500">*</span></label></div>
          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />

          <div className="pt-2"><label className="text-sm font-medium text-slate-600">Contact Number <span className="text-red-500">*</span></label></div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none gap-2">
              <span className="text-sm">🇲🇾 +60</span>
              <div className="w-[1px] h-4 bg-gray-300"></div>
            </div>
            <input required name="phone" value={formData.phone} onChange={handleInputChange} placeholder="123456789" className="w-full pl-20 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>

          <div className="pt-2"><label className="text-sm font-medium text-slate-600">Mailing Address <span className="text-red-500">*</span></label></div>
          <textarea required name="mailingAddress" value={formData.mailingAddress} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" />
        </div>

        <div className="h-px bg-gray-200 my-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 items-start">
          <div className="pt-2"><label className="text-sm font-medium text-slate-600">Description <span className="text-red-500">*</span></label></div>
          <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={8} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-sm" placeholder="Please provide details about your feedback here..." />
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-1 text-red-500 text-sm italic font-medium">
            <p>* Kindly refer to your registered email for our response</p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[220px] bg-[#4285f4] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#3367d6] transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
          >
            {isSubmitting ? 'Menghantar...' : 'Hantar / Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;