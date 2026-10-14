import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  QrCode, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Globe, 
  Layers, 
  Info,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function ExpoQrModal({ isOpen, onClose }) {
  const [urlInput, setUrlInput] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  // Initialize URL on mount / open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Default to current location
      const current = window.location.href;
      setUrlInput(current);
    }
  }, [isOpen]);

  // Generate QR Code dynamically on canvas whenever urlInput changes
  useEffect(() => {
    if (!isOpen || !canvasRef.current || !urlInput.trim()) return;

    QRCode.toCanvas(
      canvasRef.current,
      urlInput.trim(),
      {
        width: 240,
        margin: 2,
        color: {
          dark: '#111111',
          light: '#FFFFFF'
        }
      },
      (error) => {
        if (error) console.error('QR Code render error:', error);
      }
    );
  }, [isOpen, urlInput]);

  if (!isOpen) return null;

  const handleCopyUrl = () => {
    soundManager.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(urlInput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQr = () => {
    soundManager.playClick();
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'deutsch-decode-expo-qr.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-200 relative my-8">
        
        {/* German Flag Tri-Color Top Accent Line */}
        <div className="flex h-2 w-full">
          <div className="w-1/3 bg-deBlack"></div>
          <div className="w-1/3 bg-deRed"></div>
          <div className="w-1/3 bg-deGold"></div>
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-deRed" />
            <h3 className="text-lg font-display font-extrabold text-deBlack">
              Expo QR Code & Live Deployment
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Real Scannable QR Code Canvas Box */}
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-amber-50/50 rounded-2xl border-2 border-gray-200">
            
            <div className="p-3 bg-white rounded-2xl border-2 border-deBlack shadow-pocket mb-3">
              <canvas ref={canvasRef} className="rounded-lg"></canvas>
            </div>

            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-wider text-deRed block">
                DEUTSCH DECODE • Expo Stand QR
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                Scan with any smartphone camera to launch the interactive game!
              </p>
            </div>

            {/* Download QR Button */}
            <button
              onClick={handleDownloadQr}
              className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-deBlack hover:bg-gray-800 text-deGold text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Printable QR Image</span>
            </button>
          </div>

          {/* URL Input Configurator for Expo Presenters */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Live Target Website URL:
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://deutsch-decode.vercel.app or local IP"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-medium border border-gray-300 rounded-xl focus:border-deRed focus:ring-1 focus:ring-deRed"
                />
              </div>

              <button
                onClick={handleCopyUrl}
                className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-gray-300"
                title="Copy URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Typing or pasting your deployed Vercel / Netlify URL will dynamically update the QR code above in real-time!
            </p>
          </div>

          {/* Deployment Guide for the Expo Team */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-deBlack">
              <Info className="w-4 h-4 text-deRed" />
              <span>How to Deploy for the College Expo:</span>
            </div>

            <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Option 1 (Free Vercel Hosting):</strong> Push this folder to GitHub, go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-deRed underline font-bold">vercel.com</a>, import repository, and click <em>Deploy</em>. You get a fast, free HTTPS link like <code>https://deutsch-decode.vercel.app</code>.
              </li>
              <li>
                <strong>Option 2 (Netlify Drag & Drop):</strong> Run <code>npm run build</code>, then drag the generated <code>dist</code> folder into <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-deRed underline font-bold">Netlify Drop</a>.
              </li>
              <li>
                <strong>Option 3 (Expo Local Wi-Fi):</strong> Run <code>npm run dev -- --host</code> on your laptop. Connect visitor phones to the same Wi-Fi / hotspot and point the QR code to your laptop's local IP address (e.g., <code>http://192.168.1.X:3000</code>).
              </li>
            </ol>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-deBlack text-white text-xs font-bold hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
