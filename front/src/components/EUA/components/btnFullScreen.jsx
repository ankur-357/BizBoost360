import { useState } from 'react';
import { MdFullscreen,MdFullscreenExit } from "react-icons/md";

const FullScreenBtn = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false)
      })
    }
  }

  return (
    <button onClick={toggleFullScreen} title="Pantalla Completa" className='EUA__list--btn-full-Screen'>
                {
                 isFullScreen ? <MdFullscreenExit /> :<MdFullscreen />
                } Full Screen
            </button>
  )
}

export default FullScreenBtn;
