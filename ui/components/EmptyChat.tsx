import { Settings } from 'lucide-react';
import EmptyChatMessageInput from './EmptyChatMessageInput';
import SettingsDialog from './SettingsDialog';
import { useState } from 'react';
import { File, SearchProfile } from './ChatWindow';

const EmptyChat = ({
  sendMessage,
  focusMode,
  setFocusMode,
  searchProfile,
  setSearchProfile,
  optimizationMode,
  setOptimizationMode,
  showAttach,
  showFocus,
  fileIds,
  setFileIds,
  files,
  setFiles,
}: {
  sendMessage: (message: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
  searchProfile: SearchProfile;
  setSearchProfile: (profile: SearchProfile) => void;
  optimizationMode: string;
  setOptimizationMode: (mode: string) => void;
  showAttach: boolean;
  showFocus: boolean;
  fileIds: string[];
  setFileIds: (fileIds: string[]) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="relative">
      <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
      <div className="absolute w-full flex flex-row items-center justify-end mr-5 mt-5">
        <Settings
          className="cursor-pointer lg:hidden"
          onClick={() => setIsSettingsOpen(true)}
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto p-2 space-y-8">
        <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8">
          A-plexity. Безопасно и локально.
        </h2>
        <EmptyChatMessageInput
          sendMessage={sendMessage}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          searchProfile={searchProfile}
          setSearchProfile={setSearchProfile}
          optimizationMode={optimizationMode}
          setOptimizationMode={setOptimizationMode}
          showAttach={showAttach}
          showFocus={showFocus}
          fileIds={fileIds}
          setFileIds={setFileIds}
          files={files}
          setFiles={setFiles}
        />
      </div>
    </div>
  );
};

export default EmptyChat;
