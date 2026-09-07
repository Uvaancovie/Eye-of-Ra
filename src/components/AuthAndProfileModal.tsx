import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Shield, Cloud, Copy, Check, RefreshCw, X, Palette, Globe, Lock, Crown, Upload, Image, Sparkles } from 'lucide-react';
import { PlayerProfile } from '../types';
import { exportCloudBackup, importCloudBackup } from '../utils/storage';
import { MainPharaohAvatar } from './MainPharaohAvatar';

interface AuthAndProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updated: Partial<PlayerProfile>) => void;
  onReloadAllState: () => void;
}

const AVATARS = [
  { id: 'pharaoh_solar_flame', name: 'Solar Flame Pharaoh', symbol: '🔥', desc: 'Blazing Sun Scepter & Scarab' },
  { id: 'pharaoh_sun_guardian', name: 'Pharaoh Sun Guardian', symbol: '☀️', desc: 'Winged Ruby Scepter' },
  { id: 'pharaoh_invoker', name: 'Pharaoh Staff Invoker', symbol: '⚡', desc: 'Solar Flare Summoner' },
  { id: 'pharaoh_ascended_winged', name: 'Ascended Winged Pharaoh', symbol: '🪽', desc: 'Divine Solar Wings' },
  { id: 'pharaoh_sentry', name: 'Pharaoh Temple Sentry', symbol: '🛡️', desc: 'Royal Vanguard' },
  { id: 'ra', name: 'Ra Sun God', symbol: '🦅', desc: 'Solar Sovereign' },
  { id: 'anubis', name: 'Anubis Guardian', symbol: '🐺', desc: 'Tomb Warden' },
  { id: 'pharaoh', name: 'God-Pharaoh Amun', symbol: '👑', desc: 'Golden Ruler' },
  { id: 'centurion', name: 'Centurion', symbol: '⚔️', desc: 'Imperial Commander' },
  { id: 'cleopatra', name: 'Cleopatra', symbol: '👸', desc: 'Nile Queen' },
  { id: 'horus', name: 'Horus Falcon', symbol: '✨', desc: 'Sky God' },
];

const THEMES = [
  { id: 'midnight', name: 'Luxor Midnight (Default)', color: '#07090e' },
  { id: 'royal_gold', name: 'Royal Pharaoh Gold', color: '#2a1a04' },
  { id: 'obsidian', name: 'Obsidian Tomb Dark', color: '#05070a' },
  { id: 'desert_sunset', name: 'Desert Sunset', color: '#1a0d0a' },
];

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية (Arabic)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'de', name: 'Deutsch (German)' },
  { code: 'zu', name: 'isiZulu (South Africa)' },
  { code: 'ja', name: '日本語 (Japanese)' },
];

export const AuthAndProfileModal: React.FC<AuthAndProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onReloadAllState,
}) => {
  const [username, setUsername] = useState(profile.username);
  const [pin, setPin] = useState(profile.pin);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string | undefined>(profile.customAvatarUrl);
  const [selectedTheme, setSelectedTheme] = useState(profile.theme);
  const [selectedLanguage, setSelectedLanguage] = useState(profile.language);
  const [syncInputCode, setSyncInputCode] = useState('');
  const [copiedSync, setCopiedSync] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setStatusMsg({ text: 'Image file too large. Please select an image under 2MB.', isError: true });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomAvatarUrl(result);
        setSelectedAvatar('custom');
        setStatusMsg({ text: 'Custom avatar image loaded successfully!' });
        setTimeout(() => setStatusMsg(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      username: username.trim() || 'Golden Pharaoh',
      pin: pin.trim() || '1234',
      avatar: selectedAvatar,
      customAvatarUrl: customAvatarUrl,
      theme: selectedTheme as any,
      language: selectedLanguage as any,
    });
    setStatusMsg({ text: 'Profile & Security settings successfully updated!' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleCopySyncKey = () => {
    const backupStr = exportCloudBackup();
    navigator.clipboard.writeText(backupStr);
    setCopiedSync(true);
    setStatusMsg({ text: 'Cloud backup payload copied to clipboard!' });
    setTimeout(() => {
      setCopiedSync(false);
      setStatusMsg(null);
    }, 3000);
  };

  const handleRestoreFromBackup = () => {
    if (!syncInputCode.trim()) {
      setStatusMsg({ text: 'Please enter a valid backup string.', isError: true });
      return;
    }
    const success = importCloudBackup(syncInputCode);
    if (success) {
      onReloadAllState();
      setStatusMsg({ text: 'Cloud data restored successfully! Welcome back.' });
      setTimeout(() => {
        setStatusMsg(null);
        onClose();
      }, 1500);
    } else {
      setStatusMsg({ text: 'Invalid backup string. Please check and retry.', isError: true });
    }
  };

  return (
    <AnimatePresence>
      <div
        id="profile-auth-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#181206] via-[#0e0a04] to-[#060402] border-2 border-yellow-500/80 rounded-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(234,179,8,0.4)] text-amber-100 max-h-[90vh] flex flex-col"
        >
          <button
            id="close-profile-btn"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-amber-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-black font-cinzel gold-text-gradient">
              PLAYER PROFILE & CLOUD SYNC
            </h2>
            <Crown className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-xs text-center text-amber-300/70 mb-4">
            Manage your credentials, VIP Pharaoh tier, themes, and cross-device sync
          </p>

          {statusMsg && (
            <div
              className={`p-2.5 rounded-lg text-xs font-bold mb-3 text-center ${
                statusMsg.isError
                  ? 'bg-red-950/80 border border-red-500 text-red-200'
                  : 'bg-emerald-950/80 border border-emerald-500 text-emerald-200'
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* Account & Security Section */}
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-cinzel">
                  Authentication & Avatar
                </span>
              </div>

              {/* Featured Main Pharaoh Avatar Showcase & Uploader */}
              <div className="mb-4 p-3 bg-gradient-to-r from-[#201306] via-[#120a03] to-[#181105] border border-amber-500/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-full border-2 border-amber-400 bg-gradient-to-b from-[#1e1b4b] to-[#020617] p-1 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                    <MainPharaohAvatar size="full" customUrl={selectedAvatar === 'custom' ? customAvatarUrl : undefined} />
                    <span className="absolute -bottom-1 bg-amber-500 text-[8px] font-black text-slate-950 px-1 rounded shadow uppercase">
                      ACTIVE
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-black text-amber-300 font-cinzel">
                        {selectedAvatar === 'custom' ? 'Custom Uploaded Avatar' : 'Supreme God-Pharaoh (Main)'}
                      </span>
                    </div>
                    <p className="text-[10px] text-amber-200/70">
                      Winged Ruby Scepter · Glowing Turquoise Chest Scarab · Uraeus Crest
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-[11px] text-amber-200 font-bold flex items-center gap-1.5 transition-all shadow"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    Upload Image
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAvatar('pharaoh_solar_flame');
                      setCustomAvatarUrl(undefined);
                    }}
                    className="cursor-pointer px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-[11px] flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    Main Pharaoh
                  </button>
                </div>
              </div>

              {/* Avatar Picker */}
              <div className="mb-3">
                <label className="block text-[11px] text-amber-300/80 font-bold mb-1.5">
                  Or Choose from Royal Pantheon:
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatar(av.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                        selectedAvatar === av.id
                          ? 'bg-amber-950 border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)] ring-1 ring-yellow-400'
                          : 'bg-black/50 border-amber-500/30 hover:border-amber-400/60'
                      }`}
                    >
                      <span className="text-xl mb-0.5">{av.symbol}</span>
                      <span className="text-[9px] text-amber-200 font-bold">{av.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-amber-300/80 font-bold mb-1">
                    Pharaoh Username
                  </label>
                  <input
                    id="profile-username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#120d06] border border-amber-500/40 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-amber-300/80 font-bold mb-1">
                    Security PIN Code
                  </label>
                  <input
                    id="profile-pin-input"
                    type="password"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full bg-[#120d06] border border-amber-500/40 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>
            </div>

            {/* Visual Theme & Language */}
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <label className="text-[11px] text-amber-300/80 font-bold">
                      Dark / Pharaoh Theme
                    </label>
                  </div>
                  <select
                    id="theme-select-dropdown"
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value as any)}
                    className="w-full bg-[#120d06] border border-amber-500/40 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    {THEMES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <label className="text-[11px] text-amber-300/80 font-bold">
                      Global Localization
                    </label>
                  </div>
                  <select
                    id="language-select-dropdown"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as any)}
                    className="w-full bg-[#120d06] border border-amber-500/40 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  id="save-profile-settings-btn"
                  onClick={handleSaveProfile}
                  className="cursor-pointer px-5 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs uppercase font-cinzel shadow-md transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>

            {/* Cross-Device Cloud Sync */}
            <div className="bg-black/40 border border-amber-500/30 rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-cinzel">
                  Cross-Device Cloud Sync & Backup
                </span>
              </div>
              <p className="text-[11px] text-amber-300/70 mb-3">
                Seamlessly transfer your balance, VIP points, and streak between your phone, tablet, and PC.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <button
                  id="export-cloud-backup-btn"
                  onClick={handleCopySyncKey}
                  className="cursor-pointer flex-1 py-2 px-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-200 text-xs font-bold flex items-center justify-center gap-2 transition-all font-cinzel"
                >
                  {copiedSync ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>Export Cloud Backup</span>
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  id="import-cloud-backup-input"
                  type="text"
                  placeholder="Paste cloud backup string here to restore..."
                  value={syncInputCode}
                  onChange={(e) => setSyncInputCode(e.target.value)}
                  className="flex-1 bg-[#120d06] border border-amber-500/40 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
                <button
                  id="restore-cloud-backup-btn"
                  onClick={handleRestoreFromBackup}
                  className="cursor-pointer px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-yellow-400 text-slate-950 text-xs font-bold font-cinzel transition-all"
                >
                  Restore
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
