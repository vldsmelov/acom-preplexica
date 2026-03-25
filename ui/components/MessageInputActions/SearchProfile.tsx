import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { ChevronDown, Globe, Search } from 'lucide-react';
import { Fragment } from 'react';
import { SearchProfile as SearchProfileType } from '../ChatWindow';

const SearchProfiles = [
  {
    key: 'default',
    title: 'Standard',
    description: 'Uses the engine set from configuration.',
    icon: <Globe size={18} className="text-[#4CAF50]" />,
  },
  {
    key: 'yandexOnly',
    title: 'Yandex only',
    description: 'Limits web search to Yandex only.',
    icon: <Search size={18} className="text-[#E53935]" />,
  },
] as const;

const SearchProfile = ({
  searchProfile,
  setSearchProfile,
}: {
  searchProfile: SearchProfileType;
  setSearchProfile: (profile: SearchProfileType) => void;
}) => {
  return (
    <Popover className="relative shrink-0">
      <PopoverButton
        type="button"
        className="p-2 text-black/50 dark:text-white/50 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary active:scale-95 transition duration-200 hover:text-black dark:hover:text-white"
      >
        <div className="flex flex-row items-center space-x-1">
          {SearchProfiles.find((profile) => profile.key === searchProfile)?.icon}
          <p className="text-xs font-medium hidden sm:block">
            {SearchProfiles.find((profile) => profile.key === searchProfile)?.title}
          </p>
          <ChevronDown size={20} />
        </div>
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute z-10 w-64 md:w-[290px] right-0">
          <div className="flex flex-col gap-2 bg-light-primary dark:bg-dark-primary border rounded-lg border-light-200 dark:border-dark-200 w-full p-4 max-h-[200px] md:max-h-none overflow-y-auto">
            {SearchProfiles.map((profile, i) => (
              <PopoverButton
                onClick={() => setSearchProfile(profile.key)}
                key={i}
                className={cn(
                  'p-2 rounded-lg flex flex-col items-start justify-start text-start space-y-1 duration-200 cursor-pointer transition',
                  searchProfile === profile.key
                    ? 'bg-light-secondary dark:bg-dark-secondary'
                    : 'hover:bg-light-secondary dark:hover:bg-dark-secondary',
                )}
              >
                <div
                  className={cn(
                    'flex flex-row items-center space-x-1',
                    searchProfile === profile.key
                      ? 'text-[#24A0ED]'
                      : 'text-black dark:text-white',
                  )}
                >
                  {profile.icon}
                  <p className="text-sm font-medium">{profile.title}</p>
                </div>
                <p className="text-black/70 dark:text-white/70 text-xs">
                  {profile.description}
                </p>
              </PopoverButton>
            ))}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default SearchProfile;
