import { useGameStore } from '../store/gameStore';
import TitleScreen from './screens/TitleScreen';
import PlayingScreen from './screens/PlayingScreen';
import ArchivesScreen from './screens/ArchivesScreen';
import WorkshopScreen from './screens/WorkshopScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import GameOverScreen from './screens/GameOverScreen';
import { AnimatePresence, motion } from 'framer-motion';

export default function GameContainer() {
  const { screen } = useGameStore();

  return (
    <div className="w-full h-[100dvh] relative bg-[var(--color-horror-bg)] overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {screen === 'TITLE' && (
          <motion.div key="TITLE" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full absolute">
            <TitleScreen />
          </motion.div>
        )}
        {screen === 'PLAYING' && (
          <motion.div key="PLAYING" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full w-full absolute">
            <PlayingScreen />
          </motion.div>
        )}
        {screen === 'ARCHIVES' && (
          <motion.div key="ARCHIVES" initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} className="h-full w-full absolute">
            <ArchivesScreen />
          </motion.div>
        )}
        {screen === 'WORKSHOP' && (
          <motion.div key="WORKSHOP" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="h-full w-full absolute">
            <WorkshopScreen />
          </motion.div>
        )}
        {screen === 'LEADERBOARD' && (
          <motion.div key="LEADERBOARD" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="h-full w-full absolute">
            <LeaderboardScreen />
          </motion.div>
        )}
        {(screen === 'ESCAPED' || screen === 'CONSUMED') && (
           <motion.div key={screen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} className="h-full w-full absolute">
            <GameOverScreen type={screen} />
           </motion.div>
        )}
      </AnimatePresence>
      
      {/* Noise overlay for atmosphere is moved to screens or globally */}
    </div>
  );
}
